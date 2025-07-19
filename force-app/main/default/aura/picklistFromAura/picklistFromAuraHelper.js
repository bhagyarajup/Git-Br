({
    getUserList : function(component) {
        var action = component.get("c.getPickList"); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("userList is :"+ JSON.stringify(response.getReturnValue()));
                var mapResult = response.getReturnValue();
                var arrMap =[];
                
                for(let i in response.getReturnValue()){
                    var objMap = {};
                     console.log("key from mapResult : "+ i);
                    console.log("value from mapResult : "+mapResult[i]);
                    objMap.id = mapResult[i];
                    objMap.label=i;
                    arrMap.push(objMap);
                }
                console.log('arr map has :'+JSON.stringify(arrMap));
                component.set("v.options",arrMap);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    } ,

})