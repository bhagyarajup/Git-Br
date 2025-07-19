public class CentralTimeConversion {
    public static void caseTimeConversio(dateTime timenow){
        DateTime caseCreatedDate = timenow;
        DateTime caseCreatedDateCnetral=caseCreatedDate.addSeconds(10000);
        system.debug(caseCreatedDateCnetral);
    }
}