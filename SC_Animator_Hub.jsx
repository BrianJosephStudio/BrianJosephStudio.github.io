//The Animator Hub v1.0.0
//Author: Brian Joseph Studio

var currentVersion = "1.0.0";

//Global Variables
var targetComp = 0;


//FUNCTIONS

//Finding compItem
function findCompItem(targetCompName)
{
    try
    {
        var itemCount = app.project.items.length;
        var compId = 0;
        for (var i = itemCount; i>0; i--)
        {
            var compName = app.project.item(i).name;
            if (compName == targetCompName)
            {
                compId = i;
                break;
            }
            else
            {
                compId = 0
            };
        };
        return compId
    }
    catch(e)
    {
        alert("Animator Hub: There's an error in function 'findCompItem'");
    }
};

//Reset Topic Titles
function resetTopicTitles()
{
    app.beginUndoGroup("Reset Topic Titles");
    try
    {
        var compId = findCompItem("Global Topic Reference");
        var defaultText = "Insert Title";           
        if (compId != 0)
        {
            var GTR = app.project.item(compId);
            for (var e = GTR.numLayers; e > 0; e--)
            {        
                var layer = GTR.layer(e);        
                if (layer instanceof TextLayer)
                {        
                    var textProp = layer.property("Source Text");        
                    textProp.setValue(defaultText + " " + e);        
                };        
            };
        }
        else if (compId == 0){
            alert("Animator Hub: The 'Global Topic Reference' composition was not found in this project");
        };      
    }
    catch(e)
    {
        alert("Animator Hub: There's an error in function 'resetTopicTitles'");
    };
    app.endUndoGroup();
};


//Open GTR
function goToGTR()
{
    app.beginUndoGroup("Open GTR");
    try
    {
        var id = findCompItem("Global Topic Reference");
        if (id > 0)
        {
            app.project.item(id).openInViewer();
        }
        else
        {
            generateGTR();
        };
    }
    catch(e)
    {
        alert("Animator Hub: There's an error in function 'openGTR'");
    }
    app.endUndoGroup();
};

//Create compItem
function generateGTR()
{
    try
    {
        //Create Comp
        app.project.items.addComp("Global Topic Reference",1920,1080,1,20*60,29.97);
        //find Global Topic Reference ID   
        var id2 = findCompItem("Global Topic Reference");
        //Create Text Layers
        for (e = 30; e >=1;e--){
            app.project.item(id2).layers.addText("");
        };
        //Set Layer Formatting
        for (lp = 1; lp<=30;lp++)
        {
            textDoc = new TextDocument("Text Document lp");
            var textProp = app.project.item(id2).layer(lp).property("sourceText");
            textProp.setValue(textDoc);
            textDoc = textProp.value;
            textDoc.justification = ParagraphJustification.LEFT_JUSTIFY;
            textDoc.font = "Mont-BookItalic";
            textDoc.fontSize = 40;
            textDoc.fillColor = [1,1,1];
            textDoc.text = "Insert Title "+ lp;
            textDoc.tracking = -19;
            textProp.setValue(textDoc);
            // Layer Transform SEttings
            var src = app.project.item(id2).layer(lp).sourceRectAtTime(0,true);
            var anchorPX = src.left;
            var anchorPY = src.top+(src.height/2);
            app.project.item(id2).layer(lp).anchorPoint.setValue([anchorPX,anchorPY,0]);
            app.project.item(id2).layer(lp).position.setValue([0,(1080/31)*lp,100]);
        }
        app.project.item(id2).openInViewer();
    }
    catch(e)
    {
        alert("Animator Hub: There's an error in function 'generateGTR'");
    };
};


//Update Animator Hub
var image1 = "https://scontent-mad1-1.xx.fbcdn.net/v/t1.6435-9/79952966_10221317538751414_2379918413247021056_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=XvWfinnQbP8AX-36kh4&_nc_ht=scontent-mad1-1.xx&oh=00_AT_YnrjrW8XYRRvTlcO17c9Uk9Lhs4p8nXTcxdsA7niV_w&oe=62C416BE";
var cl1 = "D:"; 
var cl2 = 'cd D:\\"Dropbox (personal)"\\"Brian Joseph"\\STUDIO\\Test_Folder';
var versionCheckFile = system.callSystem('curl -s "https://brianjosephstudio.github.io/versionCheck.json"');
var versionCheck = JSON.parse(versionCheckFile);
var latestVerion = versionCheck.latestVersion;
var latestAnimatorHub = versionCheck.downloadURL;



function updateScript() {
   try
   {
        if (versionCheck == currentVersion)
        {
            alert("Animator Hub: Seems like you're up to date mate!");
        }
        else
        {
            system.callSystem('cmd.exe /c '+cl1+" && "+cl2+" && "+'curl -L -o "Animator Hub.jsx"'+latestAnimatorHub);
            alert('Animator Hub: You have succesfully updated to the latest verion! Please re-tart After Effects to reflect changes.');
        }
   }
   catch(e)
   {
    alert("There's an error in function 'updateScript'. Go talk to Brian!")
   };
};

//UI Panel Structure
{
    function myScript(thisObj){
       function myScript_buildUI(thisObj){
            var hub = (thisObj instanceof Panel) ? thisObj : new Window("palette", "SC Animator Hub", undefined, {resizeable:true, closeButton: true});                          
                hub.main = hub.add ('group {preferredSize: [600, 500], alignChildren: ["left","top"]}');
                hub.main.orientation = "column";
                    hub.main.add('statictext{text:"Workspace"}')
                    hub.stubs = hub.main.add ('dropdownlist', undefined, ['Topic Titles','Updates & Patch Notes']);
                    hub.stubs.alignment = "fill";
                    hub.tabGroup = hub.main.add ('group {alignment: ["fill","fill"], orientation: "stack"}');
                            //Mode Tabs
                            hub.tabs = [];
                            //Topic Titles Tab
                                hub.tabs[0] = hub.tabGroup.add ('group');
                                hub.tabs[0].add ('panel {preferredSize: [-1, -10]}');
                                GTRtools = hub.tabs[0].add('panel',undefined,"Global Topic Reference Tools");
                                GTRtools.orientation = "column";
                                GTRtools.alignChildren = "right";
                                    openGTRgroup = GTRtools.add("group",undefined,"");
                                    openGTRgroup.orientation = "row";
                                        openGTRgroup.add ('statictext',undefined,"Open Global Topic Reference");
                                        openGTR = openGTRgroup.add ('button',undefined,"Open");
                                    titleResetGroup = GTRtools.add('group',undefined,"");
                                    titleResetGroup.alignment = "right";
                                    titleResetGroup.orientation = "row";
                                        titleResetGroup.add ('statictext',undefined,"Reset All Topic Titles To Default");
                                        resetTitles = titleResetGroup.add ('button',undefined,"Reset");
                                hub.tabs[1] = hub.tabGroup.add ("group");
                                hub.tabs[1].add ('panel {preferredSize: [-1, -10]}');
                                hub.tabs[1].orientation = "column";
                                    updateTabGroup = hub.tabs[1].add("group",undefined,"");
                                    updateTabGroup.orientation = "row";
                                    updateTabGroup.alignment = "right";
                                    currentVersion = updateTabGroup.add ("statictext",undefined,"Current Version: 0.1.2");
                                    updateButton = updateTabGroup.add("button",undefined,"Search for Updates");
                            //
                for (var i = 0; i < hub.tabs.length; i++) {
                    hub.tabs[i].orientation = 'column';
                    hub.tabs[i].alignChildren = 'fill';
                    hub.tabs[i].alignment = ['fill','fill'];
                    hub.tabs[i].visible = false;
                }
                //Layout Changes
                hub.stubs.onChange = showTab;
                //showTab Function Declaration
                function showTab () {
                    if (hub.stubs.selection !== null) {
                        for (var i = hub.tabs.length-1; i >= 0; i--) {
                            hub.tabs[i].visible = false;
                        }
                        hub.tabs[hub.stubs.selection.index].visible = true;
                    }
                }
        hub.onShow = function () {
            hub.stubs.selection = 0;
            showTab;
        }
            //Start Functionality
            resetTitles.onClick = function() {resetTopicTitles()};
            openGTR.onClick = function () {goToGTR()};
            updateButton.onClick = function() {updateScript()};
            //end of functionality                    
            hub.layout.layout(true);
            return hub;
        }
       var myScriptPal = myScript_buildUI(thisObj); 
       if (myScriptPal != null && myScriptPal instanceof Window){
          myScriptPal.center();
          myScriptPal.show();
        }
    }
    myScript(this);
}


//SkillCapped Animator Hub v0.2.0
//Author: Brian Joseph Ure ('The Battleship')