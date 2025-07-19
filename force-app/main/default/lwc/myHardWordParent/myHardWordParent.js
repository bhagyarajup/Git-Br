import { LightningElement,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getUserId from '@salesforce/apex/HardGameController.getUserId';
export default class MyHardWordParent extends LightningElement {
@track isGo=true;
@track isGame=false;
@track userId; 
@track enteredUserId;
@track enteredNoOfEttempts;
userExist;
error;

handleChange(event){
    if(event.target.name=="enterUserId"){
        this.enteredUserId=event.target.value;

        getUserId({userId : this.enteredUserId }).then((result)=>{
          this.userExist=result.userExist;
          this.userId=result.userRecId;
          }).catch((error)=>{
            this.error=error;
            this.tostErrorEvent(this.error);
          });
    }
    else{
        this.enteredNoOfEttempts=event.target.value;
    }
   
  
}
getIntoGame(event){
   
    // if user exist
       if(this.userExist)
        { 
          this.isGo=false;
            this.isGame=true;      
       }
        else{
          this.error='Id is not valid';
          this.tostErrorEvent(this.error);
          return;   
        }
    
    
}
tostErrorEvent(message){
    const errorToast = new ShowToastEvent({
      title: 'Error',
      message: message,
      variant: 'error',
    });
    this.dispatchEvent(errorToast);
    
  }
  tostSuccessEvent(message){
    const successToast = new ShowToastEvent({
      title: 'Success',
      message: message,
      variant: 'success',
    });
    this.dispatchEvent(successToast);
  }

}