import { LightningElement,track } from 'lwc';

export default class LdsRecordFormEx2 extends LightningElement {
    @track recordId;
    @track fields = ['Name','Phone'];
    getRecordId(event){
        this.recordId = event.detail.Id;
    }
}