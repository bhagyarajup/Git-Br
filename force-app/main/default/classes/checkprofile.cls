public class checkprofile {
    public static void profilecheck(){
   // string profileId = userinfo.getProfileId();
    profile profilename =[select name from profile where id =: userinfo.getProfileId() ];
    system.debug(profilename);
     //list<profile_check__mdt> mdtlst = new list<profile_check__mdt>();
     List<profile_check__mdt> mtdProfiles = profile_check__mdt.getAll().values();
     system.debug(mtdProfiles);
     list<profile_check__mdt> mc = new list<profile_check__mdt>([select profile__c from profile_check__mdt where profile__c=:'abc' ]);
    //  system.debug('field values are'+mc.profile__c);
        if(mc.size()>0) {
            system.debug('this is inside if');
        }
        else{
            system.debug(mc.size());
        }
   }
}