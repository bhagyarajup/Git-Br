trigger TiggerObjTriggerEvents1 on TriggerPractice__c (before insert,before update) {
    if(trigger.isbefore){
        if(trigger.isinsert){
            TriggerPracticeHandler.TPBefoerinsert(trigger.new);
        }
      if(trigger.isupdate){
          TriggerPracticeHandler.TPBefoerUpdate(trigger.new); 
        } 
    }
 
}