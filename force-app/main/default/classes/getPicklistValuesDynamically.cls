public class getPicklistValuesDynamically {
    
    public static void picilistValues(){
        
        // Get the describe result for the object and field
        Schema.DescribeSObjectResult sObjectDescribe = Case.sObjectType.getDescribe();
        Schema.DescribeFieldResult fieldDescribe = sObjectDescribe.fields.getMap().get('Status').getDescribe();
        
        // Get the picklist values
        List<Schema.PicklistEntry> picklistValues = fieldDescribe.getPicklistValues();
        
        // Iterate over the picklist values and perform desired operations
        for (Schema.PicklistEntry picklistEntry : picklistValues) {
            String pickLabel = picklistEntry.getLabel();
            String pickValue = picklistEntry.getValue();
            system.debug('label is :'+ pickLabel);
            system.debug('value is :'+ pickValue);
            // Perform operations with label and value as required
        }
    }
}