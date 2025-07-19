trigger accTrigger on Account (before insert,before update) {
    
 List<my_switches__c> mcs = [select id,Is_Disable_Triggers__c from my_switches__c];
 list<account> acclst = [select id,name,(select id,name from contacts) from account];
 system.debug('### soql count :'+limits.getQueries());
  
    if(mcs[0].Is_Disable_Triggers__c==true){
      return;        
    }
    for(account acc : trigger.new){
        acc.addError('inside Account trigger');
    }
}