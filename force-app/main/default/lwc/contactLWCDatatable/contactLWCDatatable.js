import { LightningElement, track,wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';


export default class ContactLWCDatatable extends LightningElement {
    @track  columns = [
        { label: 'Name', fieldName: 'Name',type:'text' },
        { label: 'Title', fieldName: 'Title', type: 'text' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' },
        { label: 'Email', fieldName: 'Email', type: 'Email' }
    ];
    data=[];
    @wire(getContactList) getcontacts({data,error}){
        if(data){
            console.log('we have data');
           // console.log('data is :'+data);
            //console.log('data is :'+data.Name);
            this.data=data;
        }
        else if(error){
            console.log('we have error');
        }
    };
}