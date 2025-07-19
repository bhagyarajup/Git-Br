public with sharing class RecordController {
    @AuraEnabled(cacheable=true)
    public static List<sObject> getPaginatedRecords(Integer pageNumber, Integer pageSize) {
        Integer offsetValue = (pageNumber - 1) * pageSize;
        return [SELECT Id, Name FROM Account ORDER BY CreatedDate LIMIT :pageSize OFFSET :offsetValue];
    }
}