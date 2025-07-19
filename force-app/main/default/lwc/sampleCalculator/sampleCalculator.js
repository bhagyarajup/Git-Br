import { LightningElement,track } from 'lwc';

export default class SampleCalculator extends LightningElement {
     var1 =0;
     var2=0;
     sno=1;
     var4=[];
     radioValue='';
     @track var6;
     @track var3='';
     @track var5=[];
    firstVal(event){
        this.var1=event.target.value;
    }
    secondVal(event){
        this.var2=event.target.value;
    }
    sumbutton(event){
        this.var3='Sum of the given values is :'+(parseInt(this.var1)+parseInt(this.var2));
        this.var4.push(this.sno+'. '+ this.var3);
        this.sno=parseInt(this.sno)+1;
    }
    subbutton(event){
        this.var3='substraction of the given values is :'+(this.var1-this.var2);
        this.var4.push(this.sno+'. '+ this.var3);
        this.sno=parseInt(this.sno)+1;
    }
    mulbutton(event){
        this.var3='multiplication of the given values is :'+(this.var1*this.var2);
        this.var4.push(this.sno+'. '+ this.var3);
        this.sno=parseInt(this.sno)+1;
    }
    divbutton(event){
        this.var3='division of the given values is :'+(this.var1/this.var2);
        this.var4.push(this.sno+'. '+ this.var3);
        this.sno=parseInt(this.sno)+1;
    }
    checkbox1(event){
        if(event.target.checked){
        this.var6=true;
        }
        else{
            this.var6=false;    
        }
        if(this.radioValue=="restore"){
        this.var5=this.var4;
        }
        else if(this.radioValue=="clear"){
            this.var5=[];
            this.var5.push('Calculator history has been cleared... you can restore by selecting restore button');
        }
        else{
            this.var5=this.var4; 
        }
    }
    get options() {
        return [
            { label: 'Restore History', value: 'restore' },
            { label: 'Clear History', value: 'clear' },
        ];
    }
    radiochange(event){
        this.radioValue=event.detail.value;
        if(this.radioValue=="clear"){
            this.var5=[];
            this.var5.push('Calculator history has been cleared... you can restore by selecting restore button');
        }
        else{
            this.var5=this.var4;
        }
        //alert(event.detail.value);
    }
/*  checkbox2(event){
        if(event.target.checked){
            this.var5=[];
            this.clearhistory=true;
        }
        else{
            this.clearhistory=false;
        }
    } */
}