public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> fetchAccounts(Integer offset, Integer limitSize) {
        return [
            SELECT Id, Name, Industry FROM Account ORDER BY Name 
            LIMIT :limitSize OFFSET :offset
        ];
    }
}