import { LightningElement,track,api } from 'lwc';
import contactData from '@salesforce/apex/dataTableValidation.getContactData';
export default class DataTableValidation extends LightningElement {
contactFullData=[];
@track contactData=[];
@track contactDataGreen=[];
@track contactDataNonGreen=[];
@track columns=[{label:'First Name',fieldName:'FirstName',type:'text',sortable:true},
          {label:'Last Name',fieldName:'LastName',type:'text',sortable:true},
    {label:'Rag Status',fieldName:'RAG_status__c',type:'text',sortable:true},];
@api recordId;
@track isGreenScores;
@track toggleSelection=false;

connectedCallback(){
contactData({
    accId:this.recordId
}).then(result=>{
this.contactFullData=result.map(record => ({
            ...record,            
            radioDisabled: false,
            isSelected: false

        }));;
//this.contactData=this.contactFullData.filter(record => record.RAG_status__c!='Green');
this.contactDataNonGreen=this.contactFullData.filter(record => record.RAG_status__c!='Green');
//console.log(this.contactFullData);
console.log('contactData : ',this.contactData);
});


}

handleGreenShowScores(event){
  this.isGreenScores=event.target.checked;
  this.toggleSelection=true;
if(event.target.checked){
  //this.contactData=this.contactFullData.filter(record=>record.RAG_status__c==='Green');  
  this.contactDataGreen=this.contactFullData.filter(record => record.RAG_status__c==='Green');
}
else{
 //this.contactData=this.contactFullData.filter(record => record.RAG_status__c!='Green');   
 this.contactDataNonGreen=this.contactFullData.filter(record => record.RAG_status__c!='Green');
}
}
}