import { LightningElement, track } from 'lwc';
import fetchAccounts from '@salesforce/apex/AccountController.fetchAccounts';

const PAGE_SIZE = 20;

export default class InfiniteScrollTable extends LightningElement {
    @track accounts = [];
    @track isLoading = false;
    offset = 0;
    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Industry', fieldName: 'Industry' }
    ];

    connectedCallback() {
        this.loadData();
    }

    async handleLoadMore() {
        this.loadData();
    }

    async loadData() {
        if (this.isLoading) return;
        this.isLoading = true;
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
