import { LightningElement,api,track } from 'lwc';
import accRecords from '@salesforce/apex/accRecordWithTwoParams.accRecords';

export default class AccRecordsWithTwoParams extends LightningElement {
 @api recordId;
 @api recordLimit;
 @track AccountRecords=[];
 get gettingAccountRecords(){
     if(this.recordId){
        accRecords({NoOfAccRecords:parseInt(this.recordLimit),accid:this.recordId}).then(
            response =>{
                this.AccountRecords=response;
                console.log('result is :',response);
                return true;

            }
        ).catch(
            err =>{
                console.err('error result',err);
                return false;
            }
        );
     }
 }
}