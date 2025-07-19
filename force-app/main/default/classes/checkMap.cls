public class checkMap {
    public static void checkMapMethod(integer mapId){        
        map<Integer,integer> mapNames = new map<Integer,integer>();
        mapNames.put(1,10);
        mapNames.put(2,20);
        //mapNames.containsKey(mapId) &&
        if(  mapNames.containsKey(mapId) || (mapNames.get(mapId)-5)>0 ){
          system.debug(' checking map inside');  
        }
        else{
          system.debug(' checking map outside');    
        }
    }
}