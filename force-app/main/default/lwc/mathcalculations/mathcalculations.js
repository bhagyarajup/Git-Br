import { LightningElement,track } from 'lwc';

export default class Mathcalculations extends LightningElement {
   v_Aval;
   V_Bval;
  @track cVal;
   inputValue(event){
       if(event.target.name=="Aval")
       {
            this.v_Aval = event.target.value;
        }
       else{
        this.v_Bval = event.target.value; 
       }
    }
       SumtwoVar(event){
        this.cVal=parseInt(this.v_Bval)+parseInt(this.v_Aval);
       }

   }