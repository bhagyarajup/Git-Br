({
	Calculation : function(component, event, helper) {
        
		var Fval = component.get("v.FirstVal1");
        console.log('fval is :'+Fval);
        var Sval = component.get("v.SecondVal1");
        var OutputVal = Fval*Sval;
        component.set("v.Output",OutputVal);
	}
})