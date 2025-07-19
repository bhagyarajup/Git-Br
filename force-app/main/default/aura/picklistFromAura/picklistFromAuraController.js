({
    doInit : function(component, event, helper) {
        helper.getUserList(component);
         component.set('v.columns', [
            {label: 'Id', fieldName: 'Id', type: 'text'},
            {label: 'Name', fieldName: 'Name', type: 'text'}
             ]);
           
    },
    onChange: function (cmp, evt, helper) {
        // alert(cmp.find('colorId').get('v.value') + ' page limit');
        var action = cmp.get("c.getData"); 
        action.setParams({pickLimit:cmp.find('colorId').get('v.value')});        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") { 
                //alert('inside success');
               // cmp.set('v.loaded',true);
        		cmp.set("v.data",response.getReturnValue()); 
                console.log("data is :"+response.getReturnValue());
                //console.log("data is :"+cmp.get("v.data"));
                //cmp.set('v.loaded',false);
            }
            else{
                alert('inside else');
            }
        });
             $A.enqueueAction(action);
        
    },
})