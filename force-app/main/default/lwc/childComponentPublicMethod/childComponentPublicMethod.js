import { LightningElement,track,api } from 'lwc';

export default class ChildComponentPublicMethod extends LightningElement {
   @track value = ['red'];
     options= [
            { label: 'red', value: 'red' },
            { label: 'green', value: 'green' },
            { label: 'yellow', value: 'yellow' },
            { label: 'white', value: 'white' }
        ]; 
        @api 
        selectCheckBox(checkboxValue){
           // alert('inside child method');
          const  checkValueParent = this.options.find(checkbox =>{
                return checkboxValue===checkbox.value;
            });
            console.log("check value parent"+checkValueParent);
            if(checkValueParent){
                this.value=checkValueParent.value;
                return "check box found";
            }
            else{
                return "no check box found";
            }
        }
       }