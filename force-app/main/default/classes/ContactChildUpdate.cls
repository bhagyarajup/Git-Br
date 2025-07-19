public class ContactChildUpdate {
  @InvocableMethod(label='ContactChild records updation'
                  description='this method is to fetch the contact child ids'
                  category='contact_child')
public static list<string> getChildContacts(list<string> ids){
        list<Contact_Child__c> OppChildlst = [select id from Contact_Child__c where Contact__C in :ids];
        list<string> ContactChilds = new list<string>();
        for(Contact_Child__c cntctchild : OppChildlst)
        {
          ContactChilds.add(cntctchild.id);  
        }
    return ContactChilds;
}
    
}