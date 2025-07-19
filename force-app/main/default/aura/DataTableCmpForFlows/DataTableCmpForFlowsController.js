({
    init: function (cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'Opportunity name', fieldName: 'Name', type: 'text'},
            {label: 'Close Date', fieldName: 'CloseDate', type: 'text'},
            {label: 'Amount', fieldName: 'Amount', type: 'decimal'},
            {label: 'Stage Name', fieldName: 'StageName', type: 'text'},
            
        ]);
      var action=cmp.get('c.OppDataTable');
       action.setParams({accid : cmp.get('v.RecordId')});
            action.setCallback(this,function(response){
              var state = response.getState();
            if(state==="SUCCESS"){
              cmp.set('v.data',response.getReturnValue());
            }else if(state ==="ERROR"){
            var errors = response.getError();
            console.log(errors);
            }
            });
            $A.enqueueAction(action);
            }
            })