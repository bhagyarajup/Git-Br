import { LightningElement,track,api,wire } from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
//account1;
export default class WireAdoptorTest extends LightningElement {
 @track account1;
  @api recordId;
  
  @wire (getRecord, {recordId: '$recordId', fields:[ACCOUNT_NAME_FIELD]})
  account1(result) {
    this.account1 = result;
    if(result.data){
     console.log('inside if ');
    // console.log('account1 :'+account1);
   //  console.log('recordId :'+recordId);
     console.log('result :'+result);
    }
    else if(result.error){
        console.log('inside else');
    }

  }
}