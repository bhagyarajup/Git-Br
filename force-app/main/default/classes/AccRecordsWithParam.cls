public with sharing class AccRecordsWithParam {
    @AuraEnabled(cacheable=true)
    public static list<account> accRecords(integer NoOfAccRecords){
        list<account> acclst = [select id,name,phone from account limit :NoOfAccRecords];
      return acclst;
}
}