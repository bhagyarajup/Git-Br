public with sharing class accRecordWithTwoParams {
    @AuraEnabled(cacheable=true)
    public static list<account> accRecords(integer NoOfAccRecords,string accid){
        list<account> acclst = [select id,name,phone from account where id=:accid limit :NoOfAccRecords];
      return acclst;
}
}