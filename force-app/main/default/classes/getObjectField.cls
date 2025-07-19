public class getObjectField {
    public static object getfield(Sobject sob,string fieldname){
        if(fieldName.contains('.')){
            string[] relationshipPath = fieldName.split('\\.');
            integer i;
            for(i=0;i<relationshipPath.size()-1;i++){
                sob = sob.getSobject(relationshipPath[i]);
                
            }
            fieldName = relationshipPath[i];
        }
        return sob.get(fieldname);
    }
}