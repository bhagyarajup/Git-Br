import { LightningElement,track } from 'lwc';
 
export default class GetterProperty extends LightningElement {
    weight;
    height;
    bmivalue;
    getBMI(event){
        if(event.target.name=='height'){
            this.height = event.target.value;
        }
        else{
        this.weight = event.target.value;
        }
        console.log('this.weight is '+this.weight);
        console.log('this.height is '+this.height);
    } 
    calculateBMI(event){
        try{
        this.bmivalue = this.weight/(this.weight+this.height);
        console.log(this.bmivalue);
        }
        catch(error){
            this.bmivalue=undefined;
        }
    }
    get BMICal(){
        if(this.bmivalue!=undefined)
        {
        return 'BMI value is '+(this.bmivalue);
        }
        else{
            return "";
        }
    }
   
}