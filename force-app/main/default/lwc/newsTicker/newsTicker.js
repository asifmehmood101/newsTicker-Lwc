import {
   api,
   LightningElement,
   track
} from 'lwc';
//import CloseICon from "@salesforce/resourceUrl/Close"

export default class NewsTicker extends LightningElement {
   //NewsTickerIcon = `${CloseICon}`;

   @api customBackgroundColor;
   @api newsTickerBarTimeout = 6000;
   @track showNewsTickerBar = true;


   renderedCallback() {
      
      if (this.template.querySelector(".rtl-sticky")) {
         this.template.querySelector(".rtl-sticky").style.backgroundColor = this.customBackgroundColor;
      }
      
      //remove newsTicker bar after some timeout  
      setTimeout(() => {
         if (this.showNewsTickerBar) {
            this.showNewsTickerBar = false;
         }
      }, this.newsTickerBarTimeout);
   }

   handleNewsTickerBar() {
       this.showNewsTickerBar = false
   }

   

}
