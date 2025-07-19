public class DataTableEx1Cls {
@AuraEnabled
public static list<opportunity> oppMethod(){
        list<opportunity> opplst = [select name,Closedate,stagename,accountid from opportunity limit 10];
        return opplst;
    }
}