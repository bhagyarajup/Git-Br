public with sharing class picklistobjCall {
 @AuraEnabled
    public static map<string,string> getPickList() {
        map<string,string> picklistMap = new map<string,string>();
        integer m=1;
        integer n=0;
        for(picklistCheck__c Pck : [select id,name from picklistCheck__c order by name desc]){
           // system.debug('outside if :'+n);
           // system.debug('outside if :'+m);
            n=n+1;            
            if(n==1){   
             //   system.debug('inside if :'+n);
              //  system.debug('inside if :'+m);
               picklistMap.put(string.valueof(m),pck.name);
               
            }            
            else if(n==1000){
              //  system.debug('inside if :'+n);
                //system.debug('inside if :'+m);
              picklistMap.put(string.valueof(m),picklistMap.get(string.valueof(m))+'-'+pck.name);
                n=0;
                m=m+1;
            }
            
        }
        return picklistMap;
    }
    
     @AuraEnabled
    public static list<picklistCheck__c>  getData(string pickLimit) {
        string startValue =pickLimit.substringAfterLast('-') ;
        string endValue =pickLimit.substringBefore('-') ;
        system.debug('start and end values are :'+endValue + '   '+ startValue);
        list<picklistCheck__c> picklistObjLst  = [select id,name from picklistCheck__c where name<=:endValue and name>=:startValue  order by name desc];
        return picklistObjLst;
    }

}