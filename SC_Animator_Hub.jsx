//The Animator Hub v1.1.0
//Author: Brian Joseph Studio

////Global Variables

var currentVersion = '1.1.0';
var patchNotesBodyText = "-Added 'Agent Stats' Workspace.\n-Added 'Agent stats Table' panel.\n-New 'Agent Stats Table' Template available.\n-'Agent Stats Table' can be generated with custom Essential Properties from the Animator Hub by preselecting your parameters and clicking on 'Generate'.";
var targetComp = 0;
var agentsArray = ['Astra','Breach','Brimstone','Chamber','Cypher','Fade','Jett','KAY/O','Killjoy','Neon','Omen','Phoenix','Raze','Reyna','Sage','Skye','Sova','Viper','Yoru'];

////ELEMENTAL FUNCTIONS

//Agent Stats JSON
function agentData()
{
    try
    {
        var agentDataURL = fetchOnlineJson("https://brianjosephstudio.github.io/jsonFiles/agentData.json");
        var agentData = JSON.parse(agentDataURL);
        return agentData
    }
    catch(e) {return false};
};
//Agent Stats JSON
function agentArray()
{
    try
    {
        var agentArray = [];
        for(var i = 0;i<agentData().AgentBasicData.length;i++) {agentArray[i] = agentData().AgentBasicData[i].Name};
        return agentArray
    }
    catch(e) {return false};
};
//Map Array
function agentStats()
{
    try
    {
        var agentStatsURL = fetchOnlineJson("https://brianjosephstudio.github.io/jsonFiles/agentStats.json");
        var agentStats = JSON.parse(agentStatsURL);
        return agentStats
    }
    catch(e) {return false};
};
//Agents Array
function mapArray()
{
    try
    {
        var mapArrayURL = fetchOnlineJson("https://brianjosephstudio.github.io/jsonFiles/mapData.json");
        var mapArrayJson = JSON.parse(mapArrayURL);
        var mapArray = [];
        for (var i = 0; i<mapArrayJson.length; i++) {mapArrayJson.mapData[i] = mapArray[i].Name};
        return mapArray
    }
    catch(e) {return false};
};
//Finding compItem | returns compItem index
function findItem(targetName,skipMissing,folderIndex)
{
    try
    {   if(folderIndex==undefined)
        {
            var itemCount = app.project.items.length;
            var compId = 0;
            for (var i = itemCount; i>0; i--)
            {
                var compName = app.project.item(i).name;
                if (skipMissing==true)
                {
                    if (compName == targetName && app.project.item(i).footageMissing==false)
                    {
                        compId = i;
                        break;
                    };
                }
                else
                {
                    if (compName == targetName)
                    {
                        compId = i;
                        break;
                    };
                };
            };
        }
        else if(folderIndex=='Root')
        {
            var itemCount = app.project.rootFolder.numItems;
            var compId = 0;
            for (var i = itemCount; i>0; i--)
            {
                var compName = app.project.rootFolder.item(i).name;
                if (compName == targetName)
                {
                    compId = i;
                    break;
                }
                else
                {
                    compId = 0
                };
            };   
        }
        else
        {
            var itemCount = app.project.item(folderIndex).numItems;
            var compId = 0;
            for (var i = itemCount; i>0; i--)
            {
                var compName = app.project.item(folderIndex).item(i).name;
                if (skipMissing==true)
                {
                    if (compName == targetName && app.project.item(i).footageMissing==false)
                    {
                        compId = i;
                        break;
                    }
                    else
                    {
                        compId = 0
                    };
                }
                else
                {
                    if (compName == targetName)
                    {
                        compId = i;
                        break;
                    }
                    else
                    {
                        compId = 0
                    };
                }
            };
        };
        if (compId!==0){return compId}
        else {return false};
    }
    catch(e)
    {
        alert("Animator Hub: There's an error in function 'findCompItem'");
    }
};
//Fetch Online Essential Graphics Comp | Downloads an .aep file from the database on the computer
function fetchEgCompOnline(saveName,URL)
{
    system.callSystem('cmd.exe /c cd %HOMEPATH% && cd downloads && curl -s -f -o "'+saveName+'" "'+URL+'"');
    var dataCheck = system.callSystem('cmd.exe /c cd %HOMEPATH% && cd downloads && if exist "'+saveName+'" (echo true) else (echo false)');
    if (dataCheck.search('true')!==-1) {return true}
    else {return false};
};
//Fetch Online Json | Returns Json ready to be parsed
function fetchOnlineJson(URL)
{
    var myJson = system.callSystem('curl -s '+ URL);
    if (myJson!=='') {return myJson}
    else {return false};
};
//Json Object Array
function jsonObjectArray(targetJson,targetProperty)
{
    if (targetJson!==false)
    {
        var myJson = Json.parse(targetJson);
        var myArray = [];
        for (i = 0;i<=myJson.length;i++)
        {
            myArray[i] = myJson[i].targetProperty;            
        };
        return myArray
    }
    else
    {
        alert("Animator Hub: There's an error in function 'Target Json'");
        return false
    };
};
//Use array to find a group of items with matching names | Returns an array of indexes.
function nameArrToIndexArr(nameArray)
{
    if (nameArray!==false)
    {
        var P = app.project;
        var indexArray = [];
        var projectItemLength = app.project.items.length;
        for (i = 1;i<=projectItemLength;i++)
        {
            var compId =  findItem(nameArray[i],true);
            if (compId!==false)
            {
                indexArray[i] = compId; 
            }
            else
            {
                compId = false
            };
            switch (compId)
            {
                case false:
                    alert("Aniamtor Hub: Seems like you've got some missing files!");
                    return false;
                default:
            };
        };
        return indexArray
    }
    else
    {
        alert("Animator Hub: There's an error in function 'nameArrToIndexArr':\n\n    nameArray is false");
        return false
    };
};
//Activates Collapse Transformations for the active comp and targeted layer name.
function activateCollapse(templateName)
{
    var myLayer = app.project.activeItem.layer(templateName);
    myLayer.collapseTransformation = true;
};

//Use index array to create a 'item.name' Array
//function indexArrToNameArr()

/* Finds the range of items within a folder. Returns a 2 value array:
[0]:Total Amount of items within specified folder.
[1]Absolute index of the last item within that folder.*/
function folderRelativeLength(folderIndex)
{
    var myFolder = app.project.item(folderIndex);
    var myFolderName = app.project.item(folderIndex).name;
    if (myFolder.typeName.search('Folder')==-1) {return [false,false]};
    var parentFolder = myFolder.parentFolder.name;
    var myFolderRelativeIndex = -1;
    if (parentFolder=='Root')
    {
        try
        {
            var myFolderRelIndex = findItem(myFolderName,false,'Root');
            var relItemName = app.project.rootFolder.item(myFolderRelIndex+1).name;
            var relItemIndex = findItem(relItemName,false);
            return [relItemIndex-1-folderIndex,relItemIndex-1]
        }
        catch(e)
        {
            return [app.project.numItems-folderIndex,app.project.numItems]
        };
    }
    else
    {
        var parentFolderIndex = findItem(parentFolder,false);
        for (i=1;i<=app.project.item(parentFolderIndex).numItems;i++)
        {
            if (app.project.item(parentFolderIndex).item(i).name==myFolder.name)
            {
                myFolderRelativeIndex = i;
                break;
            };
        };
        if(myFolderRelativeIndex==-1) {return [false,false]};
        try
        {
            var relItemName = app.project.item(parentFolderIndex).item(myFolderRelativeIndex+1).name;
            var relItemGlobIndex = findItem(relItemName,false);
            return [relItemGlobIndex-1-folderIndex,relItemGlobIndex-1]
        }
        catch(e)
        {
            return [app.project.item(parentFolderIndex).item(myFolderRelativeIndex).numItems,app.project.item(parentFolderIndex).item(myFolderRelativeIndex).numItems+folderIndex]
        };
    };
};

//Stores missing Files in a specified folder and outputs them in an array
function missingFilesToIdArray(folderIndex,onlyUseless)
{
    try
    {
        var myArray = [];
        var myFolder = app.project.item(folderIndex); //folderItem
        if (myFolder.typeName!=='Folder'){return false};
        var arrayIndex = 0;
        for (var i=1;i<=folderRelativeLength(folderIndex)[0];i++)
        {
            if(onlyUseless!==true)
            {
                if (app.project.item(folderIndex+i).footageMissing==true)
                {
                    myArray[arrayIndex] = app.project.item(folderIndex+i).id;
                    arrayIndex += 1;
                };
            }
            else if (onlyUseless==true)
            {
                if (app.project.item(folderIndex+i).footageMissing==true && app.project.item(folderIndex+i).usedIn[0]==undefined)
                {
                    myArray[arrayIndex] = app.project.item(folderIndex+i).id;
                    arrayIndex += 1;
                };
            };
        };
        if(myArray[0]==null){return false}
        else {return myArray};
    }
    catch(e)
    {
        return false
    }
};

//Erase Missing files targeted in an array
function delMissingFiles(idArray)
{
    if (idArray==false) {return false};
    for (i=0;i<idArray.length;i++)
    {
        var myItem = app.project.itemByID(idArray[i]);
        if(myItem.typeName!=='Footage') {return false}
        else {myItem.remove()}
    };
    return true
};

//returns a filtered string without its extension, if any.
function removeExtFromName(nameString)
{
    var output;
    if (nameString.slice(-4)=='.png') {output = nameString.slice(0,-4)}
    else if (nameString.slice(-5)=='.jpeg') {output = nameString.slice(0,-5)}
    else if (nameString.slice(-5)=='.mp4') {output = nameString.slice(0,-4)}
    else {output = nameString};
    return output
    
};

//Replace files in target Comp from an array of project items
function replaceLayers(compName,indexArray)
{
    var compId = findItem(compName,true);
    if (compId!==false && indexArray!==false)
    {
        var myComp =  app.project.item(compId);
        for (i=0;i<indexArray.length;i++)
        {
            myComp.layer(i).replaceSource(indexArray[i],true)
        }
    }
    else
    {
        alert("Animato Hub: There's an error in function 'replaceLayers'.\n\n    -One of the variables is false");
        return false
    };
};
//Replace Missing layers in comp from project items with matching names
function replaceMissing(compArray)
{
    for (var c = 0;c<compArray.length;c++)
    {
        var myComp = app.project.item(findItem(compArray[c]));
        var layerName;
        var completion = true;
        for (var i=1;i<=myComp.numLayers;i++)
        {
            layerName = myComp.layer(i).name;
            if (myComp.layer(i).source.footageMissing==true)
            {
                var targetItem = findItem(layerName,true);
                if(targetItem!==false)
                {
                    myComp.layer(i).replaceSource(app.project.item(targetItem),true);
                }
                else if (targetItem==false) {completion = false};
            };
        };
        return completion
    };
};

//Delete File in System
function eraseFileFromSystem(saveName)
{
    try
    {
        var myFile = findFileInSystem(saveName);
        if (myFile==false){return false};
        var removeFile = myFile.remove();
        if (removeFile==true) {return true}
        else {return false}
    }
    catch(e) {return false}
};

//Find Downloaded Comp in System |Returns ExtendScript File Object(URI)
function findFileInSystem(fileName)
{
    var URIname = encodeURI(fileName)
    var myFile = new File('~/DOWNLOADS/'+URIname)
    var openMyFile = myFile.open("r");
    myFile.close();
    if (openMyFile==true) {return myFile}
    else {return false};
};

//Imports a File Object into the current project.
function importFileToProject(fileObject)
{
    if(fileObject==false)
    {
        return false
    }
    else
    {
        try
        {
            app.beginSuppressDialogs();
            app.project.importFile(new ImportOptions(fileObject));
            app.endSuppressDialogs(false);
            return true
        }
        catch(e)
        {
            alert("Animator Hubber: There's an error in function 'Import File To Project'");
            return false
        };
    };
};

//Item Group to Array based on input Array


//Import Project Item Into Active Comp
function importItemToActiveComp(templateName)
{
    var compId = findItem(templateName,true);
    if (compId!==false)
    {
        try
        {
            var activeComp = app.project.activeItem;
            activeComp.layers.add(app.project.item(compId));
            return true
        }
        catch(e)
        {
            return false
        }
    }
    else {return false};
};

/*Sets custom Essential Graphics Parameters to the newly imported Template.
ParameterArray is an array of property path strings*/
function customEGParameters(templateName,parameterArray,valueArray)
{
    try
    {
        var myTemplate = 'app.project.activeItem.layer("'+templateName+'").property("Essential Properties")';
        var parArrLength = parameterArray.length;
        var valArrLength = valueArray.length;
        if (parArrLength!==valArrLength){return false};
        for(var i =0;i<parArrLength;i++)
        {
            eval(myTemplate+parameterArray[i]).setValue(valueArray[i]);
        };
    }
    catch(e)
    {
        return false
    }
};


////MACRO FUNCTIONS

//Reset Topic Titles
function resetTopicTitles()
{
    app.beginUndoGroup("Reset Topic Titles");
    try
    {
        var compId = findItem("Global Topic Reference",true);
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
        var id = findItem("Global Topic Reference",true);
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
        var id2 = findItem("Global Topic Reference",true);
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

//Generate Template Function
function generateTemplate(templateName,saveName,URL,hasMissingFiles,customEG,compArray,parArr,valArr)
{
    try
    {
        //app.beginUndoGroup();
        var compId = findItem(saveName,true);
        if (compId==false)
        {
            var myDownload = fetchEgCompOnline(saveName,URL);
            if (myDownload==true)
            {
                var myFile = findFileInSystem(saveName);
                if (myFile!==false)
                {
                    var myImport = importFileToProject(myFile);
                    if (myImport!==false)
                    {
                        eraseFileFromSystem(saveName);
                    };
                }
                else {return false};
            }
            else {return false};
            if (hasMissingFiles==true)
            {
                var missingFiles = replaceMissing(compArray);
                if (missingFiles==true)
                {
                    delMissingFiles(missingFilesToIdArray(findItem(saveName,false),false));
                }
                else if (missingFiles==false)
                {
                    delMissingFiles(missingFilesToIdArray(findItem(saveName,false),true));
                    alert("Animator Hub: Your template was summoned succesfully but we could not find all the missing files inside this project.\nSeems like you're gonna have to manage missing files yourself for this one!");
                };
            };

        };
        var activeI = app.project.activeItem;
        if(activeI!==null && activeI.typeName=='Composition')
        {
            myImport = importItemToActiveComp(templateName);
            if (myImport!==true) {alert("Animator Hub: Please Select a composition to import this template into!"); return false};
            activateCollapse(templateName);
            if(customEG==true)
            {
                customEGParameters(templateName,parArr,valArr)
            };
        }
        else {alert("Animator Hub: Please select a composition to import this template into!")};
        //app.endUndoGroup();
    }
    catch(e)
    {
        alert("Animator Hub: There's an error in function 'Generate Template'");
        return false
    };
};

//Update Animator Hub

function updateScript() 
{
    var AnimatorHubPath = $.fileName;
    var versionCheckJson = system.callSystem('curl -s "https://brianjosephstudio.github.io/jsonFiles/versionCheck.json"');
    if (versionCheckJson !='')
    {
        var versionCheck = JSON.parse(versionCheckJson);
        var latestVersion = versionCheck.latestVersion;
        var latestAnimatorHubLink = versionCheck.downloadURL;
        var latestAnimatorHub = system.callSystem('curl -s '+latestAnimatorHubLink);
        if (latestVersion == currentVersion)
        { 

            alert("Animator Hub: Seems like you're up to date, mate!");
        }
        else
        {
            try
            {
                var newAnimatorHub = new File(AnimatorHubPath);
                var openNewAnimatorHub = newAnimatorHub.open("w");
                if (openNewAnimatorHub==true)
                {            
                        newAnimatorHub.write(latestAnimatorHub);
                        newAnimatorHub.close();
                        alert('Animator Hub: You have succesfully updated to the latest verion! Please restart After Effects to reflect changes.');
                }
                else if (openNewAnimatorHub==false)
                {
                        alert('Animator Hub: Update has failed.\n\nHere are a few suggested solutions for you to try:\n\n    -Make sure you are allowing Scripts to write files on your system in: Edit-Preferences-Scripting & Expressions.\n\n    -Make sure you did run After Effects as Administrator before trying to update.');
                }
                else
                {
                    alert('Animator Hub: Update has failed. Unspecified error')
                };
            }
            catch(e)
            {
                alert("Animator Hub: There's an error in function 'updateScript'. Go talk to Brian!")

            };
        };
    }
    else
    {
        alert('Animator Hub: Update has failed.\n\nHere are a few suggested solutions for you to try:\n\n    -Make sure you have an active internet connection.');
    };
    
};
//UI Panel Structure
{
    function myScript(thisObj){
       function myScript_buildUI(thisObj){
            var hub = (thisObj instanceof Panel) ? thisObj : new Window("palette", "SC Animator Hub", undefined, {resizeable:true, closeButton: true});                          
                hub.main = hub.add ('group {preferredSize: [600, 500], alignChildren: ["left","top"]}');
                hub.main.orientation = "column";
                    hub.main.add('statictext{text:"Select a Workspace"}')
                    hub.stubs = hub.main.add ('dropdownlist', undefined, ['Topic Titles','Agent Stats','Updates & Patch Notes']);
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
                                    agentStatspanel = hub.tabs[1].add("Panel",undefined,"Agent Stats Table");
                                    agentStatspanel.orientation = "row";
                                    agentStatspanel.alignment = "fill";
                                    agentStatDropdown = agentStatspanel.add ("dropdownlist",undefined,(agentsArray));
                                    agentStatDropdown.selection = 0;
                                    agentStatDropdown.helpTip = "Select your Agent";
                                    statCBgroup = agentStatspanel.add('group',undefined,'');
                                    statCBgroup.orientation = "column";
                                    statCBgroup.alignChildren = "fill";
                                        rsCB = statCBgroup.add('checkbox',undefined,'Sorted by Rank');
                                        rsCB.value = true;
                                        wrCB = statCBgroup.add('checkbox',undefined,'Win Rate');
                                        wrCB.value = true;
                                        prCB = statCBgroup.add('checkbox',undefined,'Pick Rate');
                                        prCB.value = true;
                                        prCB.location = [0,20];
                                        msCB = statCBgroup.add('checkbox',undefined,'Sorted by Map');
                                    generateTable = agentStatspanel.add("button",undefined,"Generate");


                                hub.tabs[2] = hub.tabGroup.add ("group");
                                    hub.tabs[2].add ('panel {preferredSize: [-1, -10]}');
                                    hub.tabs[2].orientation = "column";
                                    updateTabGroup = hub.tabs[2].add("group",undefined,"");
                                    updateTabGroup.orientation = "row";
                                    updateTabGroup.alignment = "right";
                                    updateTabGroup.add ("statictext",undefined,"Current Version: "+currentVersion);
                                    updateButton = updateTabGroup.add("button",undefined,"Search for Updates");
                                    patchNotes = hub.tabs[2].add("panel",undefined,"Patch Notes 1.1.0");
                                    patchNotes.orientation = "column";
                                    patchNotes.alignment = "fill";
                                        patchNotesBody = patchNotes.add("staticText",undefined,patchNotesBodyText,{multiline:true,scrolling:true});
                                        patchNotesBody.alignment = "left";
                                        patchNotesBody.preferredSize = [300,90];
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
            generateTable.onClick = function()
            {
                var customEGpars = false;
                if (agentStatDropdown.selection!==null) {customEGpars = true};
                var parArr = ['.property("Settings").property("Sort Rank")','.property("Settings").property("Win Rate")','.property("Settings").property("Pick Rate")','.property("Settings").property("Map Sort")','.property("Data Input").property("Agent")','.property("Data Input").property("Rank Sort")','.property("Data Input").property("WR")','.property("Data Input").property("PR")','.property("Data Input").property("Map")']
                var valArr = [rsCB.value,wrCB.value,prCB.value,msCB.value,agentStatDropdown.selection.index+1,agentStats()[agentStatDropdown.selection.index].SortRank,agentStats()[agentStatDropdown.selection.index].WinRate,agentStats()[agentStatDropdown.selection.index].PickRate,agentStats()[agentStatDropdown.selection.index].SortMap];
                var compArray = ['Agent Pool [ast0]','Map Pool [ast0]','Rank Pool [ast0]'];
                generateTemplate("Agent Stats Table","Agent Stats Table p5.0.aep","https://brianjosephstudio.github.io/templates/Agent%20Stats%20Table%20p5.0.aep",true,true,compArray,parArr,valArr);
            };
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