public class TriggerPracticeHandler {
  
    public static void TPBefoerinsert(list<TriggerPractice__c> TPlist){
        set<id> setTPid = new set<id>();
        map<id,string> tpMap = new map<id, string>();
        for(TriggerPractice__c tp : TPlist){
            tp.triggerText__c='tpinsert by trigger';
            if(tp.TriggerPractice__c!=null){
                setTPid.add(tp.TriggerPractice__c);
            }
            for(TriggerPractice__c tp2 : [select id,name from TriggerPractice__c where id in :setTPid]){
                if(tp2.name != null){
                    tpMap.put(tp2.id,tp2.name);
                }
                for(TriggerPractice__c tp3 : TPlist){
                    tp3.TriggerParentName__c=tpMap.get(tp3.TriggerPractice__c);
                }
            }
            
        }
    }
 public static  void TPBefoerUpdate(list<TriggerPractice__c> TPlist){
       list<TriggerPractice__c> TPlist2Update = new list<TriggerPractice__c>();
        for(TriggerPractice__c tp : TPlist){
            tp.triggerText__c='tpupdate by trigger'; 
    		//TPlist2Update.add(tp);
        }
      // database.update(TPlist2Update,false);
}
}