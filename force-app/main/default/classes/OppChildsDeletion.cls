public class OppChildsDeletion {
  @InvocableMethod(label='OppChild records deletion'
                  description='this method is to fetch the opp child ids'
                  category='Oppchild__c')
public static void getAccountNames(list<string> ids){
        list<Oppchild__c> OppChildlst = [select id from Oppchild__c where Opportunity__c in :ids ];
        list<string> oppChildIds = new list<string>();
    // string oppchilds = '';       
 /*   for(Oppchild__c oppchld :OppChildlst ){
        oppChildIds.add(oppchld.id);
     //  oppchilds=oppchilds+oppchld.id+',';
    } */
    //return oppChildIds;
     delete OppChildlst;
}
    
}