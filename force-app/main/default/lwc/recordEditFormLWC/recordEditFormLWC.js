import { LightningElement, api } from 'lwc';
import STATUS_FIELD from '@salesforce/schema/Case.Status';

export default class RecordEditFormLWC extends LightningElement {
    // Expose a field to make it available in the template
    statusField = STATUS_FIELD;

    // Flexipage provides recordId and objectApiName
    @api recordId='5005j00000dBWBDAA4';
    @api objectApiName="Case";
}