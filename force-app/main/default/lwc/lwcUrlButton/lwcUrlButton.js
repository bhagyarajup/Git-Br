import { LightningElement,api } from 'lwc';


export default class LwcUrlButton extends LightningElement {
  @api recordId;
  connectedCallback() {
      window.open( '/apex/accVFButton?recId=' + this.recordId, "_blank" );
    //this.siteURL = '/apex/accVFButton?recId=' + this.recordId;      
} 

}