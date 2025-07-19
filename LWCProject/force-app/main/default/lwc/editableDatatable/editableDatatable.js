import { LightningElement, track } from 'lwc';
import updateAccounts from '@salesforce/apex/AccountController.updateAccounts';
import fetchAccounts from '@salesforce/apex/AccountController.fetchAccounts';
const PAGE_SIZE = 20;

export default class EditableDatatable extends LightningElement {
    @track accounts = [];
    @track draftValues = [];
    offset = 0;
    columns = [
        { label: 'Name', fieldName: 'Name', type: 'text', editable: true },
        { label: 'Email', fieldName: 'Email__c', type: 'email', editable: true },
        { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency', editable: true }
    ];

    connectedCallback() {
        this.loadData();
    }

    async handleSave(event) {
        const updatedFields = event.detail.draftValues;

        // Custom validation
        const invalidRows = updatedFields.filter(row => {
            return row.Email__c && !this.validateEmail(row.Email__c);
        });

        if (invalidRows.length > 0) {
            this.showToast('Validation Error', 'Invalid email format in some rows.', 'error');
            return;
        }

        try {
            await updateAccounts({ data: updatedFields });
            this.showToast('Success', 'Records updated', 'success');

            // Refresh data
            this.draftValues = [];
            // re-fetch data here
        } catch (error) {
            this.showToast('Error', 'Failed to update records', 'error');
            console.error(error);
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }

     async loadData() {
             try {
                const result = await fetchAccounts({ offset: this.offset, limitSize: PAGE_SIZE });
                if (result.length > 0) {
                    this.accounts = [...this.accounts, ...result];
                    this.offset += result.length;
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.isLoading = false;
            }
        }
}
