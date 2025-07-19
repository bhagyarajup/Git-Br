import { LightningElement,track,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getHardWord from '@salesforce/apex/HardGameController.getHardWord';
import saveResults from '@salesforce/apex/HardGameController.saveResults';
export default class MyHardWord extends LightningElement {
@api numberOfAttempts;
@api userRecId;
@track enteredWord;
@track actualWord=[];
@track dictionaryWord='';
@track error;
@track positionCorrect;
@track letterCorrect;
@track buttonDisabled=false;
@track attemptsReached =false;
@track wordUpper='';
      wordRecId;      
     uniqueWord = [];
     n=1;

@track columns=[
       { label: 'Sno', fieldName: 'Sno', type: 'number'},
       { label: 'Letter1', fieldName: 'FirstLetter', type: 'text'},
        { label: 'Letter2', fieldName: 'SecondLetter', type: 'text'},
        { label: 'Letter3', fieldName: 'ThirdLetter', type: 'text'},
        { label: 'Letter4', fieldName: 'FourthLetter', type: 'text'},
        { label: 'CorrectOrder', fieldName: 'CorrectOrder', type: 'number'},
        { label: 'LetterExist', fieldName: 'LetterExist', type: 'number'},
    ];
    @track rows=[];
connectedCallback(){
    getHardWord().then((result)=>{
        this.actualWord=result.wordList;
        this.wordRecId=result.wordId;
        for(let i of result.wordList){
            this.dictionaryWord=this.dictionaryWord+i;
        }
        
    }).catch((error)=>{      
        this.error=error; 
        });
}
captureLetter(event){
    this.enteredWord=event.target.value;
    const inputUpper=this.enteredWord.toUpperCase();
    this.wordUpper = inputUpper;
}
handleCheck(event){
    this.uniqueWord=[];
      if(this.enteredWord!=null && this.enteredWord!=undefined && this.enteredWord!=''){
       let word = this.enteredWord.toLowerCase();
          for(let char of word){
            if(!this.uniqueWord.includes(char)){
                this.uniqueWord.push(char);
                
            }
          
        }
        console.log('this.uniqueWord '+this.uniqueWord);
       if(this.uniqueWord.length != word.length){
            this.tostErrorEvent(' Word has Duplicate Letters');
            return;
            
    }
    else  if(word.length<4){
        this.tostErrorEvent('Word must be having 4 letters');
        return;
    }
    else{
      this.positionCorrect=0;
      this.letterCorrect=0;
      for(let i=0 ; i<4 ; i++){ 
           if(this.actualWord[i]==this.uniqueWord[i]){
               this.positionCorrect++; 
            }
            else{
                for(let j of this.actualWord){
                  if(this.uniqueWord[i]==j){
                    this.letterCorrect++;
                    }
                }
               
            }
    }
   // alert('recObj');
  
  const recObj={id:this.n,Sno:this.n, FirstLetter: this.uniqueWord[0].toUpperCase(), SecondLetter:this.uniqueWord[1].toUpperCase(), ThirdLetter:this.uniqueWord[2].toUpperCase(), FourthLetter:this.uniqueWord[3].toUpperCase(), CorrectOrder:this.positionCorrect, LetterExist:this.letterCorrect};
      
      //alert('recObj'+JSON.stringify(recObj));
      this.rows=[...this.rows,recObj];
      if(this.n==this.numberOfAttempts){
        this.tostErrorEvent('You have reached the maximum attempts');
        this.buttonDisabled=true;
        this.attemptsReached=true;
        this.saveRecords('Lost');
      }
      this.n++;
      if(this.positionCorrect==4){
        this.tostSuccessEvent('Congratulations !!');
        this.buttonDisabled=true;
        this.attemptsReached=true;
        this.saveRecords('Won');
        }
    }
}
this.wordUpper='';
}
saveRecords(status){
  let savedResult;
  let rowsString=JSON.stringify(this.rows);
  saveResults({userId:this.userRecId,attemptedRows:rowsString,userAttempts:this.n,attemptsLimit:this.numberOfAttempts,wordId:this.wordRecId,gameStatus:status}).then((result)=>{
    savedResult=result;
  //  tostSuccessEvent('Game result successfully saved');
  }).catch((error)=>{
      this.error=error;
     // this.tostErrorEvent(this.error);
  });
  

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