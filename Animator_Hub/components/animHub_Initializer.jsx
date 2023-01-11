function hubError(e)
{
    alert(e.name+'\n\n'+e.description+'\n\n'+'In file: '+e.fileName+'\n\n'+'at line: '+e.line,'Animator Hub')
}
/*********************************************************************************************/
function expandComponents()
{
    hubComponents.JSON =
    {
        saveName : "JSON.js",
        name:"JSON",
        url:"https://brianjosephstudio.github.io/Animator_Hub/components/JSON.js",
        uri:"~/DOCUMENTS/Animator Hub/Components/JSON.js",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        updateIt: function(){return searchUpdateComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.ui =
    {
        saveName : "animHub_UI.jsx",
        name:"animHub_UI",
        url:"https://brianjosephstudio.github.io/Animator_Hub/components/animHub_UI.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/animHub_UI.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        updateIt: function(){return searchUpdateComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.globalVariables =
    {
        saveName : "globalVariables.jsx",
        name:"Global Variables",
        url:"https://brianjosephstudio.github.io/Animator_Hub/components/globalVariables.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/globalVariables.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        updateIt: function(){return searchUpdateComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.elementalFunctions =
    {
        saveName : "elementalFunctions.jsx",
        name:"Elemental Functions",
        url:"https://brianjosephstudio.github.io/Animator_Hub/components/elementalFunctions.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/elementalFunctions.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        updateIt: function(){return searchUpdateComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.templateConstructors =
    {
        saveName : "templateConstructors.jsx",
        name:"Template Constructors",
        url:"https://brianjosephstudio.github.io/Animator_Hub/components/templateConstructors.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/templateConstructors.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        updateIt: function(){return searchUpdateComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.generatorFunctions =
    {
        saveName : "generatorFunctions.jsx",
        name:"Generator Functions",
        url:"https://brianjosephstudio.github.io/Animator_Hub/components/generatorFunctions.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/generatorFunctions.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        updateIt: function(){return searchUpdateComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.ads =
    {
        saveName : "AdSegments.jsx",
        name:"Ad Segments",
        url:"https://brianjosephstudio.github.io/Animator_Hub/components/animHub_ADS.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/animHub_ADS.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        updateIt: function(){return searchUpdateComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.errorReportCodes =
    {
        saveName : "errorReportCodes.jsx",
        name:"Error & Report Codes",
        url:"https://brianjosephstudio.github.io/Animator_Hub/components/errorReportCodes.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/errorReportCodes.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        updateIt: function(){return searchUpdateComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.patchNotes =
    {
        saveName : "patchNotes.jsx",
        name:"Patch Notes",
        url:"https://brianjosephstudio.github.io/Animator_Hub/components/patchNotes.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/patchNotes.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        updateIt: function(){return searchUpdateComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.urlManager =
    {
        saveName : "urlManager.jsx",
        name:"URL Manager",
        url:"https://brianjosephstudio.github.io/Animator_Hub/components/urlManager.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/urlManager.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        updateIt: function(){return searchUpdateComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.editingToolsFunctions =
    {
        saveName : "editingToolsFunctions.jsx",
        name:"Editing Tools Functions",
        url:"https://brianjosephstudio.github.io/Animator_Hub/components/editingToolsFunctions.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/editingToolsFunctions.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        updateIt: function(){return searchUpdateComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.editingToolsGenerators =
    {
        saveName : "editingToolsGenerators.jsx",
        name:"Editing Tools Generators",
        url:"https://brianjosephstudio.github.io/Animator_Hub/components/editingToolsGenerators.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/editingToolsGenerators.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        updateIt: function(){return searchUpdateComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.imagesUI = 
    {
        saveName : "images_UI.jsx",
        name:"User Interface Images",
        url:"https://brianjosephstudio.github.io/Animator_Hub/components/images_UI.jsx",
        uri:"~/DOCUMENTS/Animator%20Hub/Components/images_UI.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        updateIt: function(){return searchUpdateComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    };
    hubComponents.dropboxAPI = 
    {
        saveName : "dropboxAPI.jsx",
        name : "Dropbox API",
        url : "https://brianjosephstudio.github.io/Animator_Hub/components/dropboxAPI.jsx",
        uri : "~/DOCUMENTS/Animator%20Hub/Components/dropboxAPI.jsx",
        resolveIt : function(){return searchComponent(this.url,this.uri)},
        updateIt: function(){return searchUpdateComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri)}
    }
}
/*********************************************************************************************/
function initializeHub(UIBody)
{
    expandComponents();
    checkVersion();
    try{
        $.evalFile('~/DOCUMENTS/Animator%20Hub/components/JSON.js');
        eval("#include '"+hubComponents.initializer.uri+"'");
        eval("#include '"+hubComponents.urlManager.uri+"'");
        eval("#include '"+hubComponents.globalVariables.uri+"'");
        eval("#include '"+hubComponents.elementalFunctions.uri+"'");
        eval("#include '"+hubComponents.templateConstructors.uri+"'");
        eval("#include '"+hubComponents.ads.uri+"'");
        eval("#include '"+hubComponents.generatorFunctions.uri+"'");
        eval("#include '"+hubComponents.errorReportCodes.uri+"'");
        eval("#include '"+hubComponents.ui.uri+"'");
        eval("#include '"+hubComponents.patchNotes.uri+"'");
        eval("#include '"+hubComponents.editingToolsFunctions.uri+"'");
        eval("#include '"+hubComponents.editingToolsGenerators.uri+"'");
        eval("#include '"+hubComponents.imagesUI.uri+"'");
        eval("#include '"+hubComponents.dropboxAPI.uri+"'");
    }catch(e){return hubError(e)}
    try{updateResources();}catch(e){hubError(e)}
    myScript(UIBody)
};
/*********************************************************************************************/
function resolveComponents()
{
        hubComponents.JSON.resolveIt();
        hubComponents.urlManager.resolveIt();
        hubComponents.ui.resolveIt();
        hubComponents.globalVariables.resolveIt();
        hubComponents.templateConstructors.resolveIt();
        hubComponents.ads.resolveIt();
        hubComponents.elementalFunctions.resolveIt();
        hubComponents.generatorFunctions.resolveIt();
        hubComponents.errorReportCodes.resolveIt();
        hubComponents.patchNotes.resolveIt();
        hubComponents.editingToolsFunctions.resolveIt();
        hubComponents.editingToolsGenerators.resolveIt();
        hubComponents.imagesUI.resolveIt();
        hubComponents.dropboxAPI.resolveIt();
}
function checkVersion()
{
    var myVersion = new File("~/DOCUMENTS/Animator%20Hub/Json%20Files/localVersion.txt");
    if(myVersion.exists==true)
    {
        myVersion.open('r');
        var versionJson = myVersion.read();
        myVersion.close();
        var currentVersion = versionJson;
        if(currentVersion==latestVersion)
        {
            return resolveComponents();
        }
        else {updateComponents(); writeCurrentVersion()}
    }
    else
    {
        updateComponents(); writeCurrentVersion();
    }
};
function updateComponents()
{
    hubComponents.JSON.updateIt();
    hubComponents.initializer.updateIt();
    hubComponents.urlManager.updateIt();
    hubComponents.ui.updateIt();
    hubComponents.globalVariables.updateIt();
    hubComponents.templateConstructors.updateIt();
    hubComponents.ads.updateIt();
    hubComponents.elementalFunctions.updateIt();
    hubComponents.generatorFunctions.updateIt();
    hubComponents.errorReportCodes.updateIt();
    hubComponents.patchNotes.updateIt();
    hubComponents.editingToolsFunctions.updateIt();
    hubComponents.editingToolsGenerators.updateIt();
    hubComponents.imagesUI.updateIt();
    hubComponents.dropboxAPI.updateIt();
}
function writeCurrentVersion()
{
    
    var jsonBody = latestVersion;
    var myVersion = new File("~/DOCUMENTS/Animator%20Hub/Json%20Files/localVersion.txt");
    myVersion.open('w');
    myVersion.write(jsonBody);
    myVersion.close();
}
/*********************************************************************************************/
function resolveUIImages()
{
    //Check Folder
    var myFolder = new Folder("~/DOCUMENTS/Animator%20Hub/Resources/animHubUI");
    if(myFolder.exists == false){myFolder.create()}
    var listItemIcons = new Folder("~/DOCUMENTS/Animator%20Hub/Resources/animHubUI/itemIcons");
    if(listItemIcons.exists == false){listItemIcons.create()}
    //Check Files
    for (var i in UIImagePaths)
    {
        if(typeof(UIImagePaths[i]) == "string")
        {
            var image = File(UIImagePaths[i]);
            if(image.exists == true){continue};
            var binData = UIBinImages[i];
            image.open('w');
            image.encoding = 'BINARY';
            image.write(binData);
            image.close()
        }
    };
    for (var i in UIImagePaths.listItemIcons)
    {
        var image = File(UIImagePaths.listItemIcons[i]);
            if(image.exists == true){continue};
            var binData = UIBinImages.listItemIcons[i];
            image.open('w');
            image.encoding = 'BINARY';
            image.write(binData);
            image.close()
    }
    
}