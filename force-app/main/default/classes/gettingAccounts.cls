public with sharing class gettingAccounts {
    @AuraEnabled(cacheable=true)
    public static list<account> accRecords(){
        list<account> acclst = [select id,name,phone from account limit 10];
      return acclst;
    }
}