import { LightningElement,track,api } from 'lwc';
import accRecords from '@salesforce/apex/AccRecordsWithParam.accRecords';
export default class GettingAccRecordsfromApexEx2 extends LightningElement {
  @track Accounts;
  @api recordLimit;
   NumofAccRecords;
    get getAccRecrods(){
        if(this.Accounts){
            return true;
        }
        else{
            return false;
        }
    }
    NumberOfrecords(event){
        this.NumofAccRecords=event.target.value;
    }
    gettingAcc(event){
        accRecords({NoOfAccRecords:parseInt(this.recordLimit)}).then(response =>{
            this.Accounts=response;
            console.log('response is',response);
        }).catch(err =>{
            console.error("error :",err);
        });
    }

}