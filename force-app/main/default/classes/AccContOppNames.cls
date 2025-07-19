public class AccContOppNames {
    public static void AccCntOppNameCollect(){
        list<account> accCntOppLst = new  list<account>();
       string ContactName='' ;
        string OpportunityName='';
        
        for(Account acc :[select id,name,(select id,name from contacts),(select id,name from opportunities) from account ]){
            if(acc.contacts.size()>0){
                for(Contact cnt: acc.Contacts) {
                   ContactName=ContactName+ cnt.name+',';
                }         
            }
            if(acc.opportunities.size()>0){
                for(opportunity opp :acc.opportunities){
                    OpportunityName =OpportunityName+opp.name+',';
                }
            }
            Account accCntOpp = new Account();
            accCntOpp.id=acc.id;
             accCntOpp.RelatedContactNames__c=ContactName.removeEnd(','); 
            accCntOpp.RelatedOppNames__c = OpportunityName.removeEnd(',');
            accCntOppLst.add(accCntOpp);
        }
        if(accCntOppLst.size()>0){
            database.update(accCntOppLst,false);
        }
    }
}