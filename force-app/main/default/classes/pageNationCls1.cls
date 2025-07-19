public with sharing class pageNationCls1 {
    @AuraEnabled(cacheable=true)
    public static list<contact> getContacts(integer recordLimit,string AccId){
         list<contact> cntct = [select id,name,phone,email,accountId from contact where accountId=:AccId limit :recordLimit];
          return cntct;
    }
}