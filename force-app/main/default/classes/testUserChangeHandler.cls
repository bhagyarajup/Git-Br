public class testUserChangeHandler {
    public static void testHandler(list<TEST__c> newTest,map<id,TEST__c> oldMapTest,map<id,TEST__C> newMapTest){
        set<id> accIdChange = new set<id>();
       // set<id> ownerIdChange = new set<id>();
        for(test__c tst: newTest){
            if(tst.AccountId__c!=oldMapTest.get(tst.id).AccountId__c || tst.OwnerId !=oldMapTest.get(tst.id).ownerId){
                accIdChange.add(tst.id);
            }
              list<contact> cntlst  = [select id,ownerid from contact where accountid in:accIdChange];
            
            for(test__c tst2: newTest){
                for(contact cntct :cntlst){
                    if(newMapTest.get(tst2.id).AccountId__c==cntct.accountid && newMapTest.get(tst2.id).ownerId==cntct.accountid){}

                }
                
            }
        }
    }
}