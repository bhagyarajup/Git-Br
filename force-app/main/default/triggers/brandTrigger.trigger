trigger brandTrigger on Brand__c (before insert,after insert) {
    if(trigger.isbefore && trigger.isInsert){
        
        system.debug('before insert name'+trigger.new[0].contact_name__c);
    }
    if(trigger.isAfter && trigger.isInsert){
        
        system.debug('after insert name'+trigger.new[0].contact_name__c);
    }
}