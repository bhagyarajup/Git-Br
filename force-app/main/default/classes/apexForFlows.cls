public class apexForFlows {
    @InvocableMethod(label='Acc Related Contacts'
                  description='this method is to fetch the opp child ids'
                  category='Account')
    public static list<contact> accContacts(list<string> accIds){
        list<contact> cntlst = [select id, name, phone from contact where accountid in :accIds ];
        return cntlst;
    }
}