var currentVersion = '1.2.3';
/*********************************************************************************************/
function expandComponents()
{
    hubComponents.ui =
    {
        saveName : "animHub_UI.jsx",
        name:"animHub_UI",
        url:"https://brianjosephstudio.github.io/components/animHub_UI.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/animHub_UI.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.globalVariables =
    {
        saveName : "globalVariables.jsx",
        name:"Global Variables",
        url:"https://brianjosephstudio.github.io/components/globalVariables.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/globalVariables.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.elementalFunctions =
    {
        saveName : "elementalFunctions.jsx",
        name:"Elemental Functions",
        url:"https://brianjosephstudio.github.io/components/elementalFunctions.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/elementalFunctions.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.templateConstructors =
    {
        saveName : "templateConstructors.jsx",
        name:"Template Constructors",
        url:"https://brianjosephstudio.github.io/components/templateConstructors.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/templateConstructors.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.generatorFunctions =
    {
        saveName : "generatorFunctions.jsx",
        name:"Generator Functions",
        url:"https://brianjosephstudio.github.io/components/generatorFunctions.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/generatorFunctions.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.ads =
    {
        saveName : "AdSegments.jsx",
        name:"Ad Segments",
        url:"https://brianjosephstudio.github.io/components/animHub_ADS.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/animHub_ADS.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.errorReportCodes =
    {
        saveName : "errorReportCodes.jsx",
        name:"Error & Report Codes",
        url:"https://brianjosephstudio.github.io/components/errorReportCodes.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/errorReportCodes.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.patchNotes =
    {
        saveName : "patchNotes.jsx",
        name:"Patch Notes",
        url:"https://brianjosephstudio.github.io/components/patchNotes.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/patchNotes.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.urlManager =
    {
        saveName : "urlManager.jsx",
        name:"URL Manager",
        url:"https://brianjosephstudio.github.io/components/urlManager.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/urlManager.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
}
/*********************************************************************************************/
function initializeHub(UIBody)
{
    expandComponents();
    resolveComponents()
    eval("#include '"+hubComponents.urlManager.uri+"'");
    eval("#include '"+hubComponents.globalVariables.uri+"'");
    eval("#include '"+hubComponents.elementalFunctions.uri+"'");
    eval("#include '"+hubComponents.templateConstructors.uri+"'");
    eval("#include '"+hubComponents.ads.uri+"'");
    eval("#include '"+hubComponents.generatorFunctions.uri+"'");
    eval("#include '"+hubComponents.errorReportCodes.uri+"'");
    eval("#include '"+hubComponents.ui.uri+"'");
    eval("#include '"+hubComponents.patchNotes.uri+"'");
    myScript(UIBody)
    
};
/*********************************************************************************************/
function resolveComponents()
{
    if(
    hubComponents.initializer.resolveIt() == false ||
    hubComponents.urlManager.resolveIt() == false ||
    hubComponents.ui.resolveIt() == false ||
    hubComponents.globalVariables.resolveIt() == false ||
    hubComponents.templateConstructors.resolveIt() == false ||
    hubComponents.ads.resolveIt() == false ||
    hubComponents.elementalFunctions.resolveIt() == false ||
    hubComponents.generatorFunctions.resolveIt() == false ||
    hubComponents.errorReportCodes.resolveIt() == false ||
    hubComponents.patchNotes.resolveIt())
    {primitiveAlert(5)};
}
/*********************************************************************************************/
/*//Update Main Script
function updateMainScript() 
{
    var AnimatorHubPath = $.fileName;
    var versionCheckJson = system.callSystem('curl -s '+UrlManager.jsonFile.versionCheck);
    if (versionCheckJson !='')
    {
        var versionCheck = JSON.parse(versionCheckJson);
        var latestVersion = versionCheck.latestVersion;
        if (latestVersion == currentVersion){reportCode(3);}
        else
        {
            try
            {
                var latestAnimatorHub = system.callSystem('curl -s '+urlmanager.component.animHub);
                var newAnimatorHub = new File(AnimatorHubPath);
                var openNewAnimatorHub = newAnimatorHub.open("w");
                if (openNewAnimatorHub==true)
                {            
                    newAnimatorHub.write(latestAnimatorHub);
                    newAnimatorHub.close();
                    reportCode(4);
                }
                else if (openNewAnimatorHub==false){errorCode(0);}
                else{errorCode(1)};
            }
            catch(e){errorCode(2)};
        };
    }
    else{errorCode(3);};
    
};

var versionCheckJson = system.callSystem('curl -s '+UrlManager.jsonFile.versionCheck)
alert(versionCheckJson)*/