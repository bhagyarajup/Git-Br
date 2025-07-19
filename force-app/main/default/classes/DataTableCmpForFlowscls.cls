public class DataTableCmpForFlowscls {
  @auraEnabled
    public static list<Opportunity> OppDataTable(string accid){
        list<Opportunity> opplst = [select name,amount,closedate,stageName from Opportunity where accountid= : accid];
 		return opplst;  
    }
}