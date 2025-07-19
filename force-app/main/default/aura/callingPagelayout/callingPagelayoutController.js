({
    navigateToCaseClose: function(component, event, helper) {
        
        var caseid = component.get("v.recordId");
        //window.location.href='{!$Site.BaseUrl}/'+caseid+'/s?retURL=/'+'{!$CurrentPage.Parameters.Id}';
        window.location.href='/'+caseid+'/e?retURL=%2F'+caseid;
        
    }
})

/*
({
    navigateToCaseClose: function(component, event, helper) {
        var navService = component.find("navService");
        var pageReference = {
            type: "standard__recordPage",
            attributes: {
                recordId: component.get("v.recordId"),
                objectApiName: "Case",
                actionName: "view"
            },
            state: {
                layoutType: "Full",
               // recordTypeId: "0125j0000001BqYAAU",
                pageName: "Close Case Layout"
            }
        };
        navService.navigate(pageReference);
    }
})


({
    navigateToCaseClose: function(component, event, helper) {
        var navService = component.find("navService");
        var pageReference = {
            type: "standard__recordPage",
            attributes: {
                recordId: component.get("v.recordId"),
                actionName: "view"
            },
            state: {
                nooverride: "1"
            },
            navigationLocation: "RELATED_LIST"
        };
        navService.navigate(pageReference);
    }
})


({
openCloseCase: function(component, event, helper) {
        //var caseRecord = component.get("v.caseRecord");
        var caseId = component.get("v.recordId");
        var recordTypeId = '0125j0000001BqYAAU';
   		// window.location.href = "/" + caseId + "/e?retURL=%2F" + caseId+ "&RecordType=" + recordTypeId;// + "&cancelURL=/" + caseId;
     	window.location.href = "/" + caseId + "/e?retURL=%2F" + caseId + "&paygelayout=" + "Close_Case_Layout";// + "&cancelURL=/" + caseId;

    
    //window.history.back();
    /*
       *       
        var navEvt = $A.get("e.force:navigateToSObject");
        if (navEvt) {
            navEvt.setParams({
                recordId: caseId,
                slideDevName: "detail"
            });
            navEvt.fire();
        } else {
            window.location.href = "/" + caseId + "/e?retURL=%2F" + caseId + "&RecordType=" + recordTypeId + "&cancelURL=/" + caseId;
        } 
    }

})
/*({
    openCloseCase: function(component, event, helper) {
        var caseId = component.get("v.recordId");
        var navService = component.find("navService");
        var pageReference = {
            type: "standard__recordPage",
            attributes: {
                recordId: caseId,
                actionName: "view"
            },
            state: {
                nooverride: "1",
                recordTypeId: "0125j0000001BqnAAE"
            }
        };
        navService.navigate(pageReference);
    }
})
/*
({
    navigateToCaseCloseLayout : function(component, event, helper) {
        var caseId = component.get("v.recordId");
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/lightning/r/Case/" + caseId + "/view?recordTypeId=0125j0000001BqnAAE&actionName=home"
        });
        urlEvent.fire();
    }
})
/*
 * 0125j0000001BqnAAE
 * 0125j0000001BqYAAU

({
    navigateToCaseCloseLayout: function(component, event, helper) {
        var caseId = component.get("v.recordId");
        var caseLayoutName = "Case_Layout"; // Replace with the API name of the "Case Layout" that contains the "Case Close" button

        // Construct the URL for the "Case Close" page layout
        var url = "/lightning/r/Case/" + caseId + "/view?layouttype=RecordTypeDetail&layoutName=" + caseLayoutName + "&nooverride=1&action=Case.Close_Case";

        // Fire the force:navigateToURL event to open the "Case Close" page layout
        var navigateEvent = $A.get("e.force:navigateToURL");
        navigateEvent.setParams({
            "url": url
        });
        navigateEvent.fire();
    }
})

({
    navigateToCaseCloseLayout: function(component, event, helper) {
        var caseId = component.get("v.recordId");
        var caseLayoutName = "Case_Layout"; // Replace with the API name of the "Case Layout" page layout
        var caseCloseLayoutName = "Case_Close_Layout"; // Replace with the API name of the "Case Close" page layout

        // Construct the URL for the "Case Close" page layout
        var url = "/lightning/r/Case/" + caseId + "/view?layouttype=RecordTypeDetail&layoutName=" + caseLayoutName + "&nooverride=1&recordLayout=" + caseCloseLayoutName;

        // Navigate to the "Case Close" page layout
        window.location.href = url;
    }
})

/*
({
    navigateToCaseCloseLayout: function(component, event, helper) {
        var caseId = component.get("v.recordId");
        var pageLayoutName = "CaseClosePageLayouts"; // Replace with the API name of the "Case Close" page layout
        var navigateEvent = $A.get("e.force:navigateToSObject");
        navigateEvent.setParams({
            recordId: caseId,
            slideDevName: "detail",
            objectApiName: "Case",
            actionName: "view",
            recordHomeOverride: {
                type: "standard",
                pageLayoutName: pageLayoutName
            }
        });
        navigateEvent.fire();
    }
})


({
    navigateToPageLayout: function(component, event, helper) {
        alert("inside detil page call");
        var recordId = '0035j000008xm4WAAQ'; //component.get("v.recordId");
        var navigateEvent = $A.get("e.force:navigateToSObject");
        navigateEvent.setParams({
            recordId: recordId,
            slideDevName: "detail"
        });
        navigateEvent.fire();
    }
})
*/