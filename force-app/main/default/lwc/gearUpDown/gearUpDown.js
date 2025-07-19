import { LightningElement,track } from 'lwc';

export default class GearUpDown extends LightningElement {
@track currentGear=0;
@track upDisabled=false;
@track downDisabled=true;
    handleClick(event){
        if(event.target.title=='Up'){
            this.currentGear=this.currentGear+1;
        }
        else{
            this.currentGear=this.currentGear-1;
        }
       if(this.currentGear==0){
        this.downDisabled=true;
        this.upDisabled=false;
       }else if(this.currentGear>0 && this.currentGear<6){
        this.downDisabled=false;
        this.upDisabled=false;
       }else if(this.currentGear==6){
        this.upDisabled=true;
        this.downDisabled=false;
       }
   
    }    
}