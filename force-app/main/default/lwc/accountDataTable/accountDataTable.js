import { LightningElement,track,wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts'
export default class AccountDataTable extends LightningElement {
    @track data;
    @track columns = [{label :  'Account Name', fieldName : 'Name' , type :'text' },
    {label :  'Phone', fieldName : 'Phone' , type :'phone' },
    {label :  'Industry', fieldName : 'Industry' , type :'text' }

];
@wire(getAccounts) accountdata;
if(accountdata){
    console.log(accountdata);    
}else(){
    console.log('inside else ');
}

@wire (getAccounts) accountRecords({error,data}){
     console.log('data is '+data);
     //console.log('account data is '+accountdata);
     if(data){

        this.data=data;
     }
     else if(error){
        this.data=undefined;
     }
}
}