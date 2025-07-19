trigger duplicateContactCheck on Contact (before insert,before update) {
    set<string> newContactCambo = new set<string>();
    set<string> VfitstName = new set<string>();
    set<string> VlastName = new set<string>();
    set<string> VPhone = new set<string>();
    set<string> existingContact = new set<string>();
    for(Contact cnt :trigger.new){
        if(newContactCambo.contains(cnt.firstName+cnt.LastName+cnt.phone)){
            cnt.addError('this is a duplicate contact'); 
        }
        else{
            newContactCambo.add(cnt.firstName+cnt.LastName+cnt.phone); 
            VfitstName.add(cnt.firstName);
            VlastName.add(cnt.LastName);
            VPhone.add(cnt.phone);
        }
    }
    list<contact> cntctExist = [select id,firstName,LastName,Phone from contact where firstName in:VfitstName and lastName in:VlastName and Phone in:VPhone  ];
    for(Contact cnt :cntctExist){
        existingContact.add(cnt.firstName+cnt.LastName+cnt.phone);
    }
    for(contact cnt : trigger.new){
        if(existingContact.contains(cnt.firstName+cnt.LastName+cnt.phone)){
            cnt.addError('this contact is already exist');
        }
    }
}