@RestResource(urlmapping='/bhagyaPasarla/*')
global class RestApiService {
	@HttpGet
    global Static String getData(){
        string result='';
        RestRequest request = RestContext.request;
        map<string,string> params = request.params;
        string searchText = params.get('industry');
        searchText=searchText.trim();
      //  system.debug('industry length is :'+searchText.length());
       // system.debug('industry value is :'+searchText);
        list<account> accounts = [select id,name,rating,(select id,name,Phone,email from Contacts) from account where industry =:searchText];
       // system.debug('accounts data is '+accounts);
       /* system.JSONGenerator js = json.createGenerator(true);
        js.writeStartObject();
        js.writeStringField('Status','Success');
        js.writeNumberField('Count',accounts.size());
        system.debug('record count is :'+accounts.size());
        if(accounts.size()>0){
            js.writefieldName('Accounts');
            js.writeStartArray();
            for(Account ac :accounts){
                js.writeString(ac.name);
            }
            js.writeEndArray();
        }
        js.writeEndObject();
        string result=js.getAsString();
*/
        list<JsonWrapperClass> JWcList = new list<JsonWrapperClass>();
        if(accounts.size()>0){
            for(Account accLoop : accounts){
               JsonWrapperClass Jwc = new JsonWrapperClass(); 
                Jwc.Accid = accLoop.id;
                Jwc.Rating=accLoop.Rating;
                Jwc.AccountName = accLoop.Name;
                if(accLoop.Contacts.size()>0){
                    for(Contact cntLoop : accLoop.Contacts){
                        Contact cntct = new Contact();
                        cntct.id=cntLoop.id;
                        cntct.LastName = cntLoop.name;
                        cntct.email=cntLoop.email;
                        cntct.phone = cntLoop.Phone;
                        Jwc.cnt.add(cntct);
                    }
                }
                JWcList.add(Jwc);
                
            }
            
        }
        result=JSON.serialize(JWcList,true); // suppressing the nulls from json string
    /*    string result = '';
        if(accounts.size()>0){
        for(Account acc: accounts){
            result=result+acc;
        }
        }
        system.debug(result); */
        return result;
    }
    public class JsonWrapperClass{
         public string AccountName;
         public string Rating;
         public string Accid;
         public list<contact> cnt = new list<contact>();      
    }
}