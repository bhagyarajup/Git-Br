import { LightningElement, track, wire } from 'lwc';
import findAccounts from '@salesforce/apex/ContactRelationController.findAccounts';
import { publish, MessageContext } from 'lightning/messageService';
import recordSelectedId from '@salesforce/messageChannel/Counting_Update__c';
//Messaging channel file name 

const columns = [
    {label: 'Account Name', fieldName: 'Name', type: ‘text },
    { label: 'Id', fieldName: 'Id', type: 'text' },
    { label: 'Phone', fieldName: 'Phone', type: 'Phone' },
   
    },
];


export default class NewAccConFatch extends extends LightningElement {
    @track searchKey;
    @track accounts = [];
    error;
    columns = columns;

    @wire(MessageContext)
    messageContext;

    handleChange(event) {
        this.searchKey = event.target.value;
    }

    @wire(findAccounts, { searchKey: '$searchKey' })
    wiredAccounts({ data, error }) {
        if (data) {
            this.accounts = data;
        } else if (error) {
            this.error = error;
        }
    }

    handleRowAction(event) {
        const row = event.detail.row;
       const payload = {recordId: row.Id};

        publish(this.messageContext, recordSelectedId, payload);

    }
}