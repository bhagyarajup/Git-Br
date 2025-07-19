import { LightningElement,track } from 'lwc';

export default class LdsRecordFormEx1 extends LightningElement {
@track recordId;
@track fields=["Name","Phone","Email"];
handleSubmit(event){
    this.recordId=event.detail.Id;
}
}