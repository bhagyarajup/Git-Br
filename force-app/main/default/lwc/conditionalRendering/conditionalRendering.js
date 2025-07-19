import { LightningElement,track } from 'lwc';

export default class ConditionalRendering extends LightningElement {
    @track var1=true;
    @track var2="";
    submitBotton(event){
        this.var1=true;
    }
    checkboxfun(event){
        this.var1=false;
    }

}