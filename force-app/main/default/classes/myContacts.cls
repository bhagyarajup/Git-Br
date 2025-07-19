public class myContacts {
@auraEnabled(cacheable=true)
    public static string getContacts(){
        list<contact> contacts = [select id,lastname,phone from contact where phone!=null];
        string contactJson = json.serialize(contacts);
        return contactJson;
    }
}