import { LightningElement,track } from 'lwc';
 import { createRecord } from 'lightning/uiRecordApi';

export default class CreateAccountRecordUsingLDS extends LightningElement {
 @track AccountName ;
 @track Phone;
 @track isPartner;
 accountName(event){
    this.AccountName = event.target.value;
 }
 PhoneNumber(event){
     this.Phone=event.target.value;
 }
 isPartnerField(event){
     if(event.target.ischecked){
     this.isPartner=true;
     }
     else{
         this.isPartner=false;
     }
 }
 createrecord(event){
   const fields={'Name':this.AccountName,'Phone':this.Phone,'IsPartner':this.isPartner};
   const recordInput ={apiName :'Account', fields};
   createRecord(recordInput).then(response => {
       console.log('record id is :',response.id);
   }).catch(error => {
       console.error('we have error while creating record :', error.body.message);
    });
 }
}