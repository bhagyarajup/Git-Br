import { LightningElement,track } from 'lwc';

export default class CssCompEx1 extends LightningElement {

    @track var1="";
    var2="";
    function1(event){
        this.var2=event.target.value;
    }
    function2(event){
        this.var1=this.var2;
    }
}