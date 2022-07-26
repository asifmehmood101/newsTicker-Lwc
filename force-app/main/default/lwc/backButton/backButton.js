import { LightningElement } from "lwc";

export default class BackButton extends LightningElement {
  renderedCallback() {
    if (this.template.querySelector(".rtl-backbutton")) {
      this.template
        .querySelector(".rtl-backbutton")
        .setAttribute("href", document.referrer);
      this.template.querySelector(".rtl-backbutton").onclick = function () {
        // eslint-disable-next-line no-restricted-globals
        history.back();
        return false;
      };
    }
  }
}
