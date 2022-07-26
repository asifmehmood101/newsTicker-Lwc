import { api, LightningElement, track } from "lwc";

import listSObjects from "@salesforce/apex/SObjectCRUDController.listSObjects";
import isGuest from "@salesforce/user/isGuest";
import userId from "@salesforce/user/Id";

export default class NewsTicker extends LightningElement {
  @api customBackgroundColor;
  @api fontColor;
  @api animationDuration;
  @api animationDelay;
  @api newsTickerBarTimeout = 99999999;
  @track showNewsTickerBar = false;
  @track allmessages;

  renderedCallback() {
    if (this.template.querySelector(".ticker-wrapper")) {
      // background props for experience builder
      this.template.querySelector(".ticker-wrapper").style.backgroundColor =
        this.customBackgroundColor;

      // text props for experience builder
      this.template.querySelector(".marquee__items").style.color =
        this.fontColor;

      //Animation props for experience builder
      this.template.querySelector(
        ".marquee__items"
      ).style.animationDuration = `${this.animationDuration}s`;

      this.template.querySelector(
        ".marquee__items"
      ).style.animationDelay = `${this.animationDelay}s`;
    }

    //REMOVE NEWS TICKER BAR AFTER TIMEOUT
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    setTimeout(() => {
      if (this.showNewsTickerBar) {
        this.showNewsTickerBar = false;
      }
    }, this.newsTickerBarTimeout);
  }

  async connectedCallback() {
    await this.loadNewsMessage();
  }

  async loadNewsMessage() {
    const newsMessages = await listSObjects({
      objectName: "News_Message__c",
      fields: [
        "Message__c",
        "StartDate__c",
        "EndDate__c",
        "RecommendationAudiences__c",
        "AvailableforanonymousUsers__c"
      ],
      filters: `ORDER BY StartDate__c ASC LIMIT 5`
    });

    this.allmessages = newsMessages.filter((message) => {
      if (message.AvailableforanonymousUsers__c && isGuest) {
        // Show messages to all guest users
        return message;
      }
      if (
        (!message.RecommendationAudiences__c ||
          message.RecommendationAudiences__c === "All") &&
        userId
      ) {
        // Show messages to real community users only
        return message;
      }
      if (
        message.AvailableforanonymousUsers__c &&
        (!message.RecommendationAudiences__c ||
          message.RecommendationAudiences__c === "All")
      ) {
        // Show messages to all users
        return message;
      }
      // If no above condition fulfills, then return no message.
      return undefined;
    });
    if (this.allmessages.length > 0) {
      this.showNewsTickerBar = true;
    }
  }

  handleNewsTickerBar() {
    this.showNewsTickerBar = false;
  }
}
