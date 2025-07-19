({
    init: function (cmp, event, helper) {
        cmp.set('v.columns', [	
            {label: 'Opportunity name', fieldName: 'Name', type: 'text'},
            {label: 'Close date', fieldName: 'CloseDate', type: 'date'} ,
            {label:'Stage',fieldName:'StageName',type:'text',editable:true},
            {label:'accountid',fieldName:'id',type:'text',editable:true}
        ]);
        var action = cmp.get("c.oppMethod");        
        // Call back method
        action.setCallback(this, function(response) {            
            var responseValue = response.getReturnValue(); 
            console.log(responseValue);
           // cmp.set("v.responseValue",responseValue);
            cmp.set("v.data",responseValue);
        });
        
        // Enqueue Action
        $A.enqueueAction(action);
    },
    handleSaveEdition: function (cmp, event, helper) {
    alert('saved results');
         var draftValues = event.getParam('draftValues');
        console.log(draftValues);
        
}

    
});