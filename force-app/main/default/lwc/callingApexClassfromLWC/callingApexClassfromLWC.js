import { LightningElement,wire } from 'lwc';
import accRecrds from '@salesforce/apex/gettingAccounts.accRecords';
export default class CallingApexClassfromLWC extends LightningElement {
   @wire(accRecrds) 
   accounts;
   get responseRecieved(){
       if(this.accounts){
           return true;
       }
       else
       return false;
   }
}