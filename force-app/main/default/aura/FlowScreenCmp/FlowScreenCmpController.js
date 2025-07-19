({
	doInit : function(component, event, helper) {
        component.set('v.validate',function(){
            var userInput = component.get('v.value');
            if(userInput){
                //if the component is valid...
                return{isValid : true };
            }else if(!userInput && component.get("v.required")){
                //if the component is invalid..
                return{isValid:false, errorMessage : 'This is a required field'};
            }else{
                return{isValid:true};
            }            
        });
	}
})