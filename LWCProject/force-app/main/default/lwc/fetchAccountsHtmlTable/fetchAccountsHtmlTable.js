import { LightningElement, track } from 'lwc';
import fetchAccounts from '@salesforce/apex/AccountController.fetchAccounts';

const PAGE_SIZE = 20;
export default class FetchAccountsHtmlTable extends LightningElement {
    @track accounts = [];
    offset = 0;
    isLoading = false;
    allLoaded = false;

    connectedCallback() {
        this.loadAccounts();
    }

    async loadAccounts() {
        if (this.isLoading || this.allLoaded) return;

        this.isLoading = true;
        try {
            const result = await fetchAccounts({ offset: this.offset, limitSize: PAGE_SIZE });
            if (result.length < PAGE_SIZE) {
                this.allLoaded = true;
            }
            this.accounts = [...this.accounts, ...result];
            this.offset += result.length;
        } catch (error) {
            console.error('Error fetching accounts', error);
        } finally {
            this.isLoading = false;
        }
    }

    handleScroll(event) {
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            this.loadAccounts();
        }
    }
}
