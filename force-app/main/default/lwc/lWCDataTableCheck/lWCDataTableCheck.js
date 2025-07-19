import { LightningElement,track } from 'lwc';

export default class LWCDataTableCheck extends LightningElement {
    @track columns=[];
     ColmnList =['Jan','Feb','Mar','apr'];
     if(ColmnList){
        
     for(let i in this.ColmnList){
        console.log(i);
        columns.push(i);
     }
    }
     else (){
        console.log('iunside else');
     }
    
}