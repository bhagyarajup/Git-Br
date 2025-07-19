public class ApexSharingTest {
    public static void ApexSharing(){
        TEST__Share  TestShare = new TEST__Share ();
        //set the id of record being shared
        TestShare.ParentId='a005j000004Vj4TAAS';
        //set the id of user or group being granted access.
        TestShare.UserOrGroupId='0055j000002dw4MAAQ';
        // set access level
        TestShare.AccessLevel='Edit';
        Database.SaveResult st = database.insert(TestShare,false);
        
    }
}