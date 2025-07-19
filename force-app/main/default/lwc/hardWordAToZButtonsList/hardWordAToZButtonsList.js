import { LightningElement,track } from 'lwc';

export default class HardWordAToZButtonsList extends LightningElement {
    buttonArray=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    buttonName='';
    buttonDisabled=false;
    
    @track buttons=[];
   
    connectedCallback(){    
    for(let i of this.buttonArray){
        const  buttonObj={name:'',bVariant:''};
            buttonObj.name=i;
            buttonObj.bVariant="Brand";
            this.buttons.push(buttonObj);          
    }
    }
    handleClick(event){
        const buttons2=[];
        for(let i of this.buttons){
            const  buttonObj={name:'',bVariant:''};
            if(i.name==event.target.label){
                buttonObj.name=i.name;
                buttonObj.bVariant=i.bVariant=="Brand"?"Outline-brand":"Brand";
                buttons2.push(buttonObj); 
               
            }
            else{
                buttons2.push(i);
            } 
        }
        this.buttons=[];
        this.buttons=[...buttons2];
     
    }


}