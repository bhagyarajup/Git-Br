import { LightningElement,api,track } from 'lwc';
import contactList from '@salesforce/apex/pageNationCls1.getContacts';
export default class LwcToFLowsPagenationsEx1 extends LightningElement {
 @track cntLst=[];
 @track RecordLimit;
 @track AccountId;
 getAccountId(event){
  this.AccountId=event.target.value;
 }
 getRecordLimit(event){
 this.RecordLimit=event.target.value;
 }
 gettingContactRecords(event){
    contactList({AccId:this.AccountId}).then(result =>{
        this.cntLst=result; 
        console.log('acc id inside apex method call '+this.AccountId);
        console.log('return result is  '+result);
        return true;
 }).catch(err=>{
     console.log('error is ',err);
 });
}
 get getcontactlist(){
    console.log('acc id is out side if '+this.AccountId);
 if(this.AccountId){
    console.log('acc id is '+this.AccountId);
    contactList({AccId:this.AccountId}).then(result =>{
       this.cntLst=result; 
       console.log('acc id inside apex method call '+this.AccountId);
       console.log('return result is  '+result);
       return true;
       
    }).catch(
        err =>{
            console.error('error  is '+err);
        }
    );
 }
}
}