import { api, LightningElement, track } from "lwc";

import listSObjects from "@salesforce/apex/SObjectCRUDController.listSObjects";
import isguest from "@salesforce/user/isGuest";
import userId from "@salesforce/user/Id";

export default class NewsTicker extends LightningElement {
  @api customBackgroundColor;
  @api fontColor;
  @api animationDuration;
  @api animationDelay;
  @api newsTickerBarTimeout = 6000;
  @track showNewsTickerBar = false;
  @track allmessages;
  // temp mock data
  newsItems = [
    {
      id: 0,
      message:
        "0 Your browser is outdated. Your Salesforce experience may be degraded.Your browser is outdated. ",
      link: "www.google.com"
    },

    {
      id: 1,
      message:
        "1 Your browser is outdated. Your Salesforce experience may be degraded.Your browser is outdated. ",
      link: "www.google.com"
    },
    {
      id: 2,
      message:
        "2 Your browser is outdated. Your Salesforce experience may be degraded.Your browser is outdated.",
      link: "www.google.com"
    },
    {
      id: 3,
      message:
        "3 Your browser is outdated. Your Salesforce experience may be degraded.Your browser is outdated.",
      link: "www.google.com"
    },
    {
      id: 4,
      message:
        "4 Your browser is outdated. Your Salesforce experience may be degraded.Your browser is outdated.",
      link: "www.google.com"
    },
    {
      id: 5,
      message:
        "5 Your browser is outdated. Your Salesforce experience may be degraded.Your browser is outdated.Your Salesforce experience may be degraded.Your browser is outdated.",
      link: "www.google.com"
    }
  ];

  renderedCallback() {
    if (this.template.querySelector(".rtl-sticky")) {
      // background props for experience builder
      this.template.querySelector(".rtl-sticky").style.backgroundColor =
        this.customBackgroundColor;

      // text props for experience builder
      this.template.querySelector(".news-titles").style.color = this.fontColor;

      //Animation props for experience builder
      this.template.querySelector(
        ".news-titles"
      ).style.animationDuration = `${this.animationDuration}s`;

      this.template.querySelector(
        ".news-titles"
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
        "AvailableForAnonymousUsers__c"
      ],
      filters: `ORDER BY StartDate__c ASC LIMIT 5`
    });
    this.allmessages = newsMessages.filter((message) => {
      if (message.AvailableForAnonymousUsers__c && isguest) {
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
        message.AvailableForAnonymousUsers__c &&
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
