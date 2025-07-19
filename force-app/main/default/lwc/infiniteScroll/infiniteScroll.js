import { LightningElement, track } from 'lwc';
import fetchAccounts from '@salesforce/apex/AccountController.fetchAccounts';

export default class InfiniteScroll extends LightningElement {
    @track accounts = [];
    @track pageNumber=1;
    offset = 0;
    limitSize = 10;
    isLoading = false;
    scrollTopOrBottom=0;

    connectedCallback() {
        this.loadMoreRecords();
    }

    loadMoreRecords() {
        if (this.isLoading) return;  // Prevent multiple calls
        this.isLoading = true;

        fetchAccounts({ offset: this.offset, limitSize: this.limitSize })
            .then((result) => {
                if (result.length > 0) {
                    this.accounts = [...this.accounts, ...result];
                    this.offset += this.limitSize;
                }
                this.pageNumber=this.offset/this.limitSize;
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    handleScroll(event) {
        const { scrollTop, clientHeight, scrollHeight } = event.target;
        // alert('scrollTop '+scrollTop);
      //  alert('clientHeight '+clientHeight);
        //alert('scrollHeight '+scrollHeight);
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            this.loadMoreRecords();
           
        }

        if(scrollTop>this.scrollTopOrBottom){
          alert('scrollTop '+scrollTop);
          this.scrollTopOrBottom=scrollTop;
        }
       
     
    }
}