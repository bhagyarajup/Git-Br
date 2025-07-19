import { LightningElement, track, wire } from 'lwc';
import fetchRecords from '@salesforce/apex/RecordController.getPaginatedRecords';

export default class InfiniteScrollList extends LightningElement {
    @track records = [];
    @track isLoading = false;
    pageNumber = 1;
    pageSize = 10;
    allDataLoaded = false;

    connectedCallback() {
        this.loadRecords();
    }

    async loadRecords() {
        if (this.isLoading || this.allDataLoaded) return;

        this.isLoading = true;
        try {
            const result = await fetchRecords({ pageNumber: this.pageNumber, pageSize: this.pageSize });

            if (result.length < this.pageSize) {
                this.allDataLoaded = true; // No more records to fetch
            }

            this.records = [...this.records, ...result];
            this.pageNumber++;
        } catch (error) {
            console.error('Error loading records', error);
        } finally {
            this.isLoading = false;
        }
    }

    renderedCallback() {
        if (!this.allDataLoaded) {
            this.observeLastRecord();
        }
    }

    observeLastRecord() {
        const list = this.template.querySelector('.record-list');
        const lastItem = list?.lastElementChild;

        if (!lastItem) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                observer.disconnect();
                this.loadRecords();
            }
        });

        observer.observe(lastItem);
    }
}