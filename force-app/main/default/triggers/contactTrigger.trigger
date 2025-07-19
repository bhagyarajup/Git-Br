trigger contactTrigger on Contact (before update) {
    for(contact cnt : trigger.new){
        if(cnt.account.name=='Edge Communications'){
            cnt.addError('acc name is edge communications');
        }
        else{
            cnt.addError('outside if : '+cnt.AccountId);
        }
    }
}