import { LightningElement,wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
const FIELDS = [ACCOUNT_NAME_FIELD,ACCOUNT_PHONE_FIELD];
export default class GetRecordLDScomponent extends LightningElement {
check=true;
account;
@wire(getRecord,{ recordId : '0015j00000Ur2twAAB',fields : FIELDS})
  /*  account(result){
        this.account=result;
        console.log('inside account1');
        console.log('result is :'+result);
      //  console.log('result data is :'+JSON.stringify(result));
    } */

      account;
       



get accountName(){
    //console.log('account stringfy : '+JSON.stringfy(this.account));
    return this.account.data? this.account.data.fields.Name.value:'N/A';
}
get accountPhone(){
    return this.account.data? this.account.data.fields.Phone.value:'N/A';
}

get hasError(){
    return this.account.error ? true:false;
}
get errorMessage(){
    this.account.error ? this.account.error.body.message:'';
}

}