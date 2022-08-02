import { LightningElement } from "lwc";

export default class BackButton extends LightningElement {
  renderedCallback() {
    if (this.template.querySelector(".rtl-backbutton")) {
      this.template
        .querySelector(".rtl-backbutton")
        .setAttribute("href", document.referrer);
    }
  }

  callPreviousPage() {
    // eslint-disable-next-line no-restricted-globals
    window.history.back();
  }
}
