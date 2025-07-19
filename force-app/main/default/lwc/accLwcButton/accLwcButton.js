import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { CloseAction } from 'lightning/navigation';



export default class AccLwcButton extends LightningElement {
    siteURL;
    @api recordId;

    @wire(CurrentPageReference)
 getStateParameters(currentPageReference) {
     if (currentPageReference) {
         this.recordId = currentPageReference.state.recordId;
     }
 }

    connectedCallback() {
        window.open( '/apex/accVFButton?recId=' + this.recordId, "_blank" );
        //this.siteURL = '/apex/accVFButton?recId=' + this.recordId;
     // setTimeout(function() { window.close(); }, 5000);
              
    }   
    handleClose() {
        // Use the CloseAction to close the current component
        const closeAction = CloseAction();
        this.dispatchEvent(closeAction);
    }
}