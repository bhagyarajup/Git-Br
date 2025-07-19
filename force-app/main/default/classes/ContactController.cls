public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [
            SELECT Id, Name, Title, Phone, Email
            FROM Contact where phone != null and title!=null                  
            LIMIT 10
        ];
    }
}