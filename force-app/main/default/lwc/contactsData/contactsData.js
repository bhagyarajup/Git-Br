import { LightningElement,track } from 'lwc';
import getContacts from '@salesforce/apex/myContacts.getContacts';
export default class ContactsData extends LightningElement {
    @track contacts;
    @track error;
    @track contactName;
   connectedCallback(){
    console.log('inside call back');
     getContacts().then((result)=>{
        this.contacts=result;
        console.log('inside result'+result);
        this.contactsResult(result);
        this.error=undefined;
    }).catch((error)=>{
        this.error=error;
        this.contacts=undefined;
    });
   }
   
   contactsResult(contactsList){
    console.log('inside contact result');
    contactsList.forEach((cnt)=>{
        console.log('contact name '+cnt.LastName);
        this.contactName=cnt.LastName;
    });
   }

}