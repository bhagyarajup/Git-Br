trigger testchange on TEST__c (after update) {
    if(trigger.isupdate){
        testUserChangeHandler.testHandler(trigger.new,trigger.oldmap,trigger.newmap);
    }
}