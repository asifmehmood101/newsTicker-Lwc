import { api, LightningElement, track } from "lwc";
//import CloseICon from "@salesforce/resourceUrl/Close"

export default class NewsTicker extends LightningElement {
  //NewsTickerIcon = `${CloseICon}`;

  @api customBackgroundColor;
  @api fontColor;
  @api newsTickerBarTimeout = 6000;
  @track showNewsTickerBar = true;

  newsItems = [
    {
      id: 0,
      message: "hello",
      link: "www.google.com"
    },

    {
      id: 1,
      message: "hello123",
      link: "www.google.com"
    },
    {
      id: 2,
      message: "hello1234",
      link: "www.google.com"
    },
    {
      id: 3,
      message: "hello12345",
      link: "www.google.com"
    }
  ];

  renderedCallback() {
    // CHANGE NEWS TICKER BACKGROUND COLOR
    if (this.template.querySelector(".rtl-sticky")) {
      this.template.querySelector(".rtl-sticky").style.backgroundColor =
        this.customBackgroundColor;
    }

    // CHANGE TEXT COLOR
    if (this.template.querySelector(".news-titles")) {
      this.template.querySelector(".news-titles").style.color = this.fontColor;
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
