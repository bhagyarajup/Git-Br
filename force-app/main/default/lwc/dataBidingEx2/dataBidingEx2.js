import { LightningElement,track } from 'lwc';

export default class DataBidingEx2 extends LightningElement {
var1='';
var2='';
input1(event){
this.var2=event.target.value;
}
input2(event){
    this.var1=this.var2;
}
}