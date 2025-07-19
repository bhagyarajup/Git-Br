import { LightningElement, api } from 'lwc';
import STATUS_FIELD from '@salesforce/schema/Case.Status';
import ORIGIN_FIELD from '@salesforce/schema/Case.Origin';
import CASENUMBER_FIELD from '@salesforce/schema/Case.CaseNumber';
import ACCOUNTID_FIELD from '@salesforce/schema/Case.AccountId';


export default class RecordViewFormLWC extends LightningElement {
    // Expose a field to make it available in the template
    fields = [STATUS_FIELD,ORIGIN_FIELD,CASENUMBER_FIELD,ACCOUNTID_FIELD];

    // Flexipage provides recordId and objectApiName
    @api recordId;
    @api objectApiName;

    recordId='5005j00000dBWBDAA4';
    objectApiName='Case';
}