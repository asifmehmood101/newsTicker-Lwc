import { api, LightningElement, track } from "lwc";

export default class NewsTicker extends LightningElement {
  @api customBackgroundColor;
  @api fontColor;
  @api animationDuration;
  @api animationDelay;
  @api newsTickerBarTimeout = 600000;
  @track showNewsTickerBar = true;

  // temp mock data
  newsItems = [
    {
      id: 0,
      message:
        "Your browser is outdated. Your Salesforce experience may be degraded.Your browser is outdated. ",
      link: "www.google.com"
    },

    {
      id: 1,
      message:
        "Your browser is outdated. Your Salesforce experience may be degraded.Your browser is outdated. ",
      link: "www.google.com"
    },
    {
      id: 2,
      message:
        "Your browser is outdated. Your Salesforce experience may be degraded.Your browser is outdated. Your Salesforce experience may be degraded.Your browser is outdated. Your Salesforce experience may be degraded.",
      link: "www.google.com"
    },
    {
      id: 3,
      message:
        "Your browser is outdated. Your Salesforce experience may be degraded.Your browser is outdated. Your Salesforce experience may be degraded.Your browser is outdated. Your Salesforce experience may be degraded.",
      link: "www.google.com"
    }
  ];

  renderedCallback() {
    // background props for experience builder
    if (this.template.querySelector(".rtl-sticky")) {
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

  handleNewsTickerBar() {
    this.showNewsTickerBar = false;
  }
}
