({
    newCaseAction : function(component, event, helper) {
        var homePageNewslabel = $A.get("$Label.c.abc");
        component.set('v.homePageNews', homePageNewslabel);
    }
})