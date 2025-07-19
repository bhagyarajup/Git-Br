import { LightningElement,api,track } from 'lwc';
import accRecords from '@salesforce/apex/AccRecordsWithParam.accRecords';
export default class PassingRecordLimitToApexThroughFlow extends LightningElement {
@api RecordsLimit;
@track limitCheck;
@track accounts; 
/*if(RecordsLimit){
    console.log("record limit is ",RecordsLimit);
    accRecords({NoOfAccRecords:parseInt(RecordsLimit)}).then(
        response => {
            this.accounts=response;
            this.limitCheck=true;
        }
    ).catch(err => {
        console.error('error :',err);
    });
}
else{
    console.log("record limit entered is ",RecordsLimit);
} */
}