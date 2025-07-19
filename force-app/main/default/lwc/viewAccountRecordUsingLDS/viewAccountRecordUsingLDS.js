import { LightningElement,track,wire } from 'lwc';
import { createRecord,getRecord } from 'lightning/uiRecordApi';
const fieldArray =['Account.Name','Account.Phone'];
export default class ViewAccountRecordUsingLDS extends LightningElement {
    @track accName;
    @track accPhone;
    @track recordId;
    @track recordCreated;
    @wire(getRecord,{recordId:'$recordId',fields:fieldArray})
    accountRecord; // above get record data will be stored here
    
    getAccountName(event){
     this.accName=event.target.value;
    }
    getAccountPhone(event){
     this.accPhone=event.target.value;
    }
    saverecord(event){
        const fields = {'Name':this.accName,'Phone':this.accPhone};
        const createData = {apiName:'Account',fields};
        createRecord(createData).then(result =>{
            console.log('created record is ',result.id);
            this.recordCreated=true;
            this.recordId=result.id;
        }).catch(
            err =>{
                console.error('error is ',err.body.message);
            }
        );
    }
    get retriveAccName(){
        console.log('account record is',this.accountRecord);
        if(this.accountRecord.data){
            return this.accountRecord.data.fields.Name.value;
        }
        else{
            return undefined;
        }

    }
    get retriveAccPhone(){
        if(this.accountRecord.data){
            return this.accountRecord.data.fields.Phone.value;
        }
        else{
            return undefined;
        }
    }

}