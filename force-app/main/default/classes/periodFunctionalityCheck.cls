public class periodFunctionalityCheck {
    public static void getdata(string yr){
        map<string,AggregateResult> CyYearMap = new map<string,AggregateResult>();
         map<string,AggregateResult> PyYearMap = new map<string,AggregateResult>();
        list<PeriodFunctionalityWrapper> FPwrapperList = new list<PeriodFunctionalityWrapper>();
        AggregateResult[] ptList = [SELECT condition__c condition, type__c typeV, subtype__c subtypeV, FYear__c FinancialYear, Period__c Period,count(id) cnt FROM periodTable__c where FYear__c=:yr or FYear__c=:string.valueof(Integer.valueOf(yr)-1) group by  condition__c,type__c,subtype__c,FYear__c,Period__c ];
        for(AggregateResult agg :ptList){
            if(agg.get('Period')=='Period 1 FY 2023' || agg.get('Period')=='Period 1 FY 2022' ){
           // system.debug('***# ptList is :'+agg);
             string periodV =string.valueOf(agg.get('Period')); 
                periodV=periodV.substring(1,9);
                if(string.valueOf(agg.get('FinancialYear'))==yr)
                {
                CyYearMap.put(string.valueOf(agg.get('condition'))+string.valueOf(agg.get('typeV'))+string.valueOf(agg.get('subtypeV'))+periodV,agg);
            			}
                else{
                PyYearMap.put(string.valueOf(agg.get('condition'))+string.valueOf(agg.get('typeV'))+string.valueOf(agg.get('subtypeV'))+periodV,agg);
                }
           
            }
        }
        
        system.debug('***# current year map is :'+CyYearMap);
        system.debug('***# previous year map is :'+PyYearMap);
        
        for(AggregateResult agg :ptList){
             string periodV =string.valueOf(agg.get('Period')); 
                periodV=periodV.substring(1,9);
        PeriodFunctionalityWrapper PFWrapper = new PeriodFunctionalityWrapper();
         //   if(CyYearMap.containsKey(string.valueOf(agg.get('condition'))+string.valueOf(agg.get('typeV'))+string.valueOf(agg.get('subtypeV'))+periodV)){
                if(agg.get('Period')=='Period 1 FY 2023'){
                PFWrapper.period1=Integer.valueOf(agg.get('cnt'));
            }
                if(agg.get('Period')=='Period 2 FY 2023'){
                PFWrapper.period2=Integer.valueOf(agg.get('cnt'));
            }
           if(agg.get('Period')=='Period 3 FY 2023')
                PFWrapper.period3=Integer.valueOf(agg.get('cnt'));
            
            if(agg.get('Period')=='Period 4 FY 2023'){
                PFWrapper.period4=Integer.valueOf(agg.get('cnt'));
            }
            if(agg.get('Period')=='Period 5 FY 2023'){
                PFWrapper.period5=Integer.valueOf(agg.get('cnt'));
            }
            FPwrapperList.add(PFWrapper);
    }
           system.debug('***# FPwrapperList is :'+FPwrapperList);
    }
           
        
     
            
            
        }
    //}