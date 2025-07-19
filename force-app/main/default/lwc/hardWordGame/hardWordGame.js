import { LightningElement,track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getHardWord from '@salesforce/apex/HardGameController.getHardWord';
export default class HardWordGame extends LightningElement {
@track word;
@track wordList=[];
@track Letter1;
@track Letter2;
@track Letter3;
@track Letter4;
@track positionCorrect=0;
@track letterCorrect=0;
letterRepeated;
@track columns=[{ label: 'First Letter', fieldName: 'FirstLetter', type: 'text'},
    { label: 'Second Letter', fieldName: 'SecondLetter', type: 'text'},
    { label: 'Third Letter', fieldName: 'ThirdLetter', type: 'text'},
    { label: 'Fourth Letter', fieldName: 'FourthLetter', type: 'text'},
    { label: 'Correct Order', fieldName: 'CorrectOrder', type: 'number'},
    { label: 'Letter Exist', fieldName: 'LetterExist', type: 'number'},
];
@track rows;

    connectedCallback(){
        getHardWord().then((result)=>{
            this.word=result;
           // console.log('inside result'+word);
          //  alert('word list : '+result);
            this.wordList=result;
        }).catch((error)=>{
            this.error=error;
            });
    }

    handleChange(event){
            if(event.target.name=="Input1"){            
            this.Letter1=event.target.value;
            /*if(this.Letter1==this.Letter2){
                this.letterRepeated=true;
            }
            else if(this.Letter1==this.Letter3){
                this.letterRepeated=true;
            }
            else if(this.Letter1==this.Letter4){
                this.letterRepeated=true;
            }*/
        }
       else if(event.target.name=="Input2"){           
            this.Letter2=event.target.value;
           /* if(this.Letter2==this.Letter1){
                this.tostErrorEvent(this.Letter2 + ' Is already used ');
            }
            else if(this.Letter2==this.Letter3){
                this.tostErrorEvent(this.Letter2 + ' Is already used ');
            }
            else if(this.Letter2==this.Letter4){
                this.tostErrorEvent(this.Letter2 + ' Is already used ');
            }*/
        }
       else if(event.target.name=="Input3"){
            this.Letter3=event.target.value;
           /* if(this.Letter3==this.Letter1){
                this.tostErrorEvent(this.Letter3 + ' Is already used ');
            }
            else if(this.Letter3==this.Letter2){
                this.tostErrorEvent(this.Letter3 + ' Is already used ');
            }
            else if(this.Letter3==this.Letter4){
                this.tostErrorEvent(this.Letter3 + ' Is already used ');
            }*/
        }
       else if(event.target.name=="Input4"){
            this.Letter4=event.target.value;
           /* if(this.Letter4==this.Letter1){
                this.tostErrorEvent(this.Letter4 + ' Is already used ');
            }
            else if(this.Letter4==this.Letter2){
                this.tostErrorEvent(this.Letter4 + ' Is already used ');

            }
            else if(this.Letter4==this.Letter3){
                this.tostErrorEvent(this.Letter4 + ' Is already used ');

            }*/
        }      
    }

    handleCheck(event){
        this.positionCorrect=0;
        this.letterCorrect=0;
      /*  alert('inside handle check');
        alert(this.Letter1+'  '+this.Letter2+'   '+this.Letter3+'   '+this.Letter4);
        if(this.Letter1 === this.letter2){ //|| this.Letter1==this.letter3 || this.Letter1==this.letter4){
         alert('inside first check');
         this.tostErrorEvent('Letter Should not be Repeated');
         
        }
        else if(this.Letter2==this.letter3 || this.Letter2==this.letter4){
         this.tostErrorEvent('Letter Should not be Repeated');
        
        }
        else if(this.Letter3==this.letter4){
         this.tostErrorEvent('Letter Should not be Repeated');
        
        }
        else{
            alert('inside else');
        }
     alert(  ' after check' ); */
        
        if(this.Letter1== this.wordList[0]){
            this.positionCorrect=this.positionCorrect+1; 
         //   alert(' word 0 '+this.positionCorrect);
        }
        if(this.Letter2== this.wordList[1]){
            this.positionCorrect=this.positionCorrect+1; 

           // alert(' word 1 '+this.positionCorrect);
        }
        if(this.Letter3== this.wordList[2]){
            this.positionCorrect=this.positionCorrect+1; 
         //   alert(' word 2 '+this.positionCorrect);
        }
        if(this.Letter4== this.wordList[3]){
            this.positionCorrect=this.positionCorrect+1; 
           // alert(' word 3 '+this.positionCorrect);
        }
      //  alert(' length  '+this.wordList.length);
      for(let i=0 ; i<this.wordList.length ; i++)
        {
        if(this.Letter1!= this.wordList[0]){
          if(this.Letter1== this.wordList[i]){
           this.letterCorrect=this.letterCorrect+1;          
          } 
        }
        if(this.Letter2!= this.wordList[1]){
            if(this.Letter2== this.wordList[i]){
                this.letterCorrect=this.letterCorrect+1;          
               } 
        }
        if(this.Letter3!= this.wordList[2]){
            if(this.Letter3== this.wordList[i]){
                this.letterCorrect=this.letterCorrect+1;          
               } 
        }
        if(this.Letter4!= this.wordList[3]){
            if(this.Letter4== this.wordList[i]){
                this.letterCorrect=this.letterCorrect+1;          
               } 
        }
      }
      
      if(this.positionCorrect==4){
        this.tostSuccessEvent('Congratulations');
      }
     
    }

    tostSuccessEvent(message){
      const successToast = new ShowToastEvent({
        title: 'Success',
        message: message,
        variant: 'success',
      });
      this.dispatchEvent(successToast);
    }

    tostErrorEvent(message){
      const errorToast = new ShowToastEvent({
        title: 'Error',
        message: message,
        variant: 'error',
      });
      this.dispatchEvent(errorToast);
      
    }
}