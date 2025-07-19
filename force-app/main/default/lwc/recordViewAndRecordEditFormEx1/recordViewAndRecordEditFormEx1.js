import { LightningElement,track } from 'lwc';

export default class RecordViewAndRecordEditFormEx1 extends LightningElement {
    @track recordId;
    successHandler(event){
        this.recordId=event.detail.id;
    }
}