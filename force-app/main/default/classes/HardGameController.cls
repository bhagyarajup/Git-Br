public class HardGameController {
@auraEnabled
    public static wordWrapper getHardWord(){
        wordWrapper ww = new wordWrapper();
        Hard_Word__c hw = [select id,name,Word__c,wordWithComa__c from Hard_Word__c   order by createddate desc limit 1];
        string word = hw.wordWithComa__c;
        list<string> wordList = new list<string>();
        wordList=word.split(',');
        system.debug('wordlist : '+wordList);
        ww.wordId=hw.Id;
        ww.wordList=wordList;        
        return ww;
    }
 @auraEnabled
    public static wordWrapper getUserId(string userId){
         wordWrapper ww = new wordWrapper();
        list<gameUser__c> gameUsers = [select id,name from gameUser__c where name=:userId and IsActive__c=true limit 1];
     
        if(gameUsers.size()>0){
            ww.userRecId=gameUsers[0].Id;  
            ww.userExist=true;
            return ww;
        }
        return ww;
        
    }
  @auraEnabled
    public static boolean saveResults(string userId,string attemptedRows,integer userAttempts,integer attemptsLimit,string wordId,string gameStatus){
      system.debug('inside saveresults');
        WordPlayerGameHistory__c  wpgh = new WordPlayerGameHistory__c();
        wpgh.Hard_Word__c=wordId;
        wpgh.gameUser__c=userId;
        wpgh.GivenAttempts__c=attemptsLimit;
        wpgh.UserAttempts__c=userAttempts-1;
        wpgh.GameHistory__c=attemptedRows;
        wpgh.GameStatus__c=gameStatus;
        insert wpgh;
        system.debug(' wpgh :'+wpgh);
        return true;
    }
    public class wordWrapper{
        @auraEnabled public list<string> wordList;
        @auraEnabled public string wordId;
        @auraEnabled public string userRecId;
        @auraEnabled public boolean userExist;
    }
}