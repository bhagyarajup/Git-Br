global class BatchAccCls  implements Database.Batchable<sobject>,Database.Stateful  {
    public list<string> AccCombo = new list<string>();
    global Database.QueryLocator start(Database.BatchableContext BC) { 
        String query = 'select name,phone  from Account ';
        return Database.getQueryLocator(query);
    }
  global void execute(Database.BatchableContext BC, List<Account> scope){
	    list<string> AccName = new list<string>();
        list<string> AccPhone = new list<string>();
        list<string> AggAccName = new list<string>();
      	list<string> AggAccPhone = new list<string>();
        list<string> accCambolocal = new list<string>();
      	map<string,integer> AccAggMap = new map<string,integer>();
        map<string,string> AccMapParentid = new map<string,string>();
        map<string,list<string>> AccMapChildRecords = new map<string,list<string>>();
        list<account> acclist = new list<account>();        
      for(Account agg: scope){
          if(!AccCombo.contains(agg.name+agg.phone)){
              AccCombo.add(agg.name+agg.phone);
           //   accCambolocal.add(agg.name+agg.phone);
              AccName.add(agg.name);
              AccPhone.add(agg.phone);
          } 
      }
         system.debug('acc name :'+AccName);
    system.debug('acc name :' +AccPhone);
      //list<AggregateResult> Aggrlst = [select name,phone,count(id) cntId from Account where name in :AccName and phone in :AccPhone group by name,phone having count(id)>1 ];
   
      for(AggregateResult Aggrlst : [select name,phone,count(id) cntId from Account where name in :AccName and phone in :AccPhone group by name,phone having count(id)>1 ] ){
           AggAccName.add((string)Aggrlst.get('name'));
           AggAccPhone.add((string)Aggrlst.get('phone'));
           AccAggMap.put((string)Aggrlst.get('name')+(string)Aggrlst.get('phone'),(integer)Aggrlst.get('cntId'));
           accCambolocal.add((string)Aggrlst.get('name')+(string)Aggrlst.get('phone'));
      }
    //system.debug('Agg acc name :'+AggAccName);
    //system.debug('Agg acc name :' +AggAccPhone);
      
      for(Account acc : [select id,name,phone,createddate from account where name in :AggAccName and phone in :AggAccPhone  order by createddate desc]){
        system.debug('acc records '+acc.name + ' | '+ acc.phone +' | '+ acc.id+ ' | '+ acc.createddate);
          if(accCambolocal.contains(acc.name+acc.phone)){
          if(!AccMapParentid.containsKey(acc.name+acc.phone)){
          AccMapParentid.put(acc.name+acc.phone,acc.id);
          }
          if(!AccMapChildRecords.containsKey(acc.name+acc.phone) && AccMapParentid.get(acc.name+acc.phone)!=acc.id && AccMapParentid.get(acc.name+acc.phone)!=null){
              list<string> lstid = new list<string>();
              lstid.add(acc.id);
              AccMapChildRecords.put(acc.name+acc.phone,lstid);                 
       }
          else if(AccMapParentid.get(acc.name+acc.phone)!=acc.id && AccMapParentid.get(acc.name+acc.phone)!=null){
              list<string> lstid = AccMapChildRecords.remove(acc.name+acc.phone);
              lstid.add(acc.id);
              AccMapChildRecords.put(acc.name+acc.phone,lstid);
          } 
          }
      }
       system.debug(AccMapParentid);
	   system.debug(AccMapChildRecords);
      for(string parentstr : AccMapParentid.keyset()){
          for(string child : AccMapChildRecords.get(parentstr)){
              Account acc = new Account();
              acc.id=child;
              acc.ParentId=AccMapParentid.get(parentstr);
              acclist.add(acc);
          }
      }
      system.debug('acc list is :'+ acclist);
      update acclist;
  }
    global void finish(Database.BatchableContext BC) {
    }   

}