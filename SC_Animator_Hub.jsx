//The Animator Hub v1.2.2
//Author: Brian Joseph Studio

////Global Variables

var currentVersion = '1.2.2';
var patchNotesBodyText = "-Fixed several bugs for 'Agent Stats Table' workspace.\n-Added 'Map Overviews' Workspace.\n-Added 'Map Overviews' panel.\n-Map Overviews can be generated with custom parameters from the Animator Hub by preselecting your parameters and clicking on 'Generate Map'.";
var targetComp = 0;
var agentsArray = ['Astra','Breach','Brimstone','Chamber','Cypher','Fade','Jett','KAY/O','Killjoy','Neon','Omen','Phoenix','Raze','Reyna','Sage','Skye','Sova','Viper','Yoru'];
var mapsArray = ['Ascent','Bind','Breeze','Fracture','Haven','Icebox','Pearl','Split'];

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
            var itemCount = app.project.numItems;
            var itemId = 0;
            for (var i = itemCount; i>0; i--)
            {
                var itemName = app.project.item(i).name;
                if (skipMissing==true && (itemName == targetName && (app.project.item(i).footageMissing==false || app.project.item(i).footageMissing==undefined)))
                {
                    itemId = i;
                    break;
                }
                else if (skipMissing!==true)
                {
                    if (itemName == targetName)
                    {
                        itemId = i;
                        break;
                    };
                };
            };
            if (itemId!==0){return [itemId,app.project.item(itemId),app.project.item(itemId).id,targetName]}
            else {return [false]};
        }
        else if(folderIndex=='Root')
        {
            var itemCount = app.project.rootFolder.numItems;
            var itemId = 0;
            for (var i = itemCount; i>0; i--)
            {
                var itemName = app.project.rootFolder.item(i).name;
                if (skipMissing==true && (itemName == targetName && (app.project.item(i).footageMissing==false || app.project.item(i).footageMissing==undefined)))
                {
                        itemId = i;
                        break;
                }
                else
                {
                    if (itemName == targetName)
                    {
                        itemId = i;
                        break;
                    };
                }
            };   
            if (itemId!==0){return [itemId,app.project.rootFolder.item(itemId),app.project.rootFolder.item(itemId).id,targetName]}
            else {return [false]};
        }
        else
        {
            var itemCount = app.project.item(folderIndex).numItems;
            var itemId = 0;
            for (var i = itemCount; i>0; i--)
            {
                var itemName = app.project.item(folderIndex).item(i).name;
                if (skipMissing==true && (itemName == targetName && (app.project.item(i).footageMissing==false || app.project.item(i).footageMissing==undefined)))
                {
                        itemId = i;
                        break;
                }
                else
                {
                    if (itemName == targetName)
                    {
                        itemId = i;
                        break;
                    }
                };
            };
            if (itemId!==0){return [itemId,app.project.item(folderIndex).item(itemId),app.project.item(folderIndex).item(itemId).id,targetName]}
            else {return [false]};
        };
    }
    catch(e)
    {
        alert("Animator Hub: There's an error in function 'findItem'");
    }
};
function errorCode(errorCodeId)
{
    var errorList = [
        'empty'
    ];
    myAppTag = 'MF Wizard:\n\n    -';
    return alert(myAppTag+errorList[errorCodeId]);
};
function reportCode(reportCodeId)
{
    var reportList = [
        "Animator Hub: Your Map was summoned succesfully but we could not find all the missing files inside this project.\nSeems like you're gonna have to manage missing files yourself for this one!",
        "Animator Hub: Your Template was summoned succesfully but we could not find all the missing files inside this project.\nSeems like you're gonna have to manage missing files yourself for this one!"
    ];
    myAppTag = 'MF Wizard:\n\n    -';
    return alert(myAppTag+reportList[reportCodeId]);
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
            var compId =  findItem(nameArray[i],true)[0];
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
                    alert("Animator Hub: Seems like you've got some missing files!");
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
/* Finds the range of items within a folder. Returns a 2 value array:
[0]:Total Amount of items within specified folder.
[1]Absolute index of the last item within that folder.*/
function folderRelativeLength(folderObject)
{
    var folderLength = folderObject[1].numItems;
    var lastItemName = folderObject[1].item(folderLength).name;
    var lastItem = findItem(lastItemName);
    while(lastItem[1].typeName=='Folder')
    {
        folderLength = lastItem[1].numItems
        lastItemName = lastItem[1].item(folderLength).name;
        lastItem = findItem(lastItemName);
    };
    return [lastItem[0]-folderObject[0],lastItem[0]];
};
//Stores missing Files in a specified folder and outputs them in an array
function missingFilesToIdArray(folderIndex,onlyUseless)
{
    try
    {
        var myArray = [];
        var myFolder = app.project.item(folderIndex[0]); //folderItem
        if (myFolder.typeName!=='Folder'){return false};
        var arrayIndex = 0;
        for (var i=1;i<=folderRelativeLength(folderIndex)[0];i++)
        {
            if(onlyUseless!==true)
            {
                if (app.project.item(folderIndex[0]+i).footageMissing==true)
                {
                    myArray[arrayIndex] = app.project.item(folderIndex[0]+i).id;
                    arrayIndex += 1;
                };
            }
            else if (onlyUseless==true)
            {
                if (app.project.item(folderIndex[0]+i).footageMissing==true && app.project.item(folderIndex+i).usedIn[0]==undefined)
                {
                    myArray[arrayIndex] = app.project.item(folderIndex[0]+i).id;
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
    if (idArray==undefined) {return false};
    for (i=0;i<idArray.length;i++)
    {
        var myItem = app.project.itemByID(idArray[i]);
        if(myItem.typeName!=='Footage') {return false}
        else if(myItem.footageMissing==true && myItem.usedIn[0]==undefined) {myItem.remove()}
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
    var compId = findItem(compName,true)[0];
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
    var completion = true;
    var report = [];
    var arrayIndex = 0;
    for (var c = 0;c<compArray.length;c++)
    {
        var myComp = app.project.itemByID(findItem(compArray[c])[2]);
        var layerName;
        for (var i=1;i<=myComp.numLayers;i++)
        {
            if(myComp.layer(i).source!==null && myComp.layer(i).source.typeName == 'Footage' && myComp.layer(i).source.footageMissing==true)
            {
                layerName = myComp.layer(i).source.name;
                var missingCheck = myComp.layer(i).source.id;
                var targetItem = findItem(layerName,true);
                if(targetItem[0]!==false && targetItem[1].typeName=='Footage')
                {
                    myComp.layer(i).replaceSource(targetItem[1],true);
                    if (myComp.layer(i).source!==app.project.itemByID(missingCheck))
                    {
                        report[arrayIndex] = missingCheck;
                        arrayIndex +=1;
                    }
                }
                else if (targetItem[0]==false) {completion = false};
            };
        };
    };
    return [completion,report];
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
//Takes a string and returns a string with a raised number at the end or a 2 if there is no number at the end.
function serialNamer(string,enumerateNaN,reverseDirection)
{
    var mySplit = string.split(' ');
    var myCheck = isNaN(mySplit[mySplit.length-1]);
    var myOutput;
    if (myCheck==false && reverseDirection!==true)
    {
        var myNumber = mySplit.pop();
        myOutput = string.replace(myNumber,eval(myNumber)+1)
    }
    else if (myCheck==false && reverseDirection==true)
    {
        var myNumber = mySplit.pop();
        myOutput = string.replace(myNumber,eval(myNumber)-1)
    }
    else if (myCheck==true && enumerateNaN==true)
    {
        myOutput = string+' 2'; 
    }
    else
    {
        myOutput = string
    }
    return myOutput
};
//Renames all layers inside project or specified folder based on search and replace input variables
function renamer(searchTerm,replaceTerm,folderIndex)
{
    var startIndex;
    var endIndex;
    if(folderIndex==undefined) {startIndex=1,endIndex==app.project.numItems}
    else {startIndex=folderIndex; endIndex=folderRelativeLength(folderIndex[0])[1]};
    var returnVal = 0;
    for (var i=startIndex;i<=endIndex;i++)
    {
        if (app.project.item(i).name.search(searchTerm)!==-1)
        {
            app.project.item(i).name = app.project.item(i).name.replace(searchTerm,replaceTerm);
            returnVal += 1;
        };
    };
    return returnVal
};
//A loop designed to work within duplicator function
function myDupLoop(targetItem,arr)
{
    var getName = serialNamer(targetItem.name,true);
    var dupItem;
    var newFolder;
    if(arr[0]!==undefined)
    {
        newFolder = app.project.itemByID(arr[arr.length-1]).items.addFolder(getName);
    }
    else {newFolder = app.project.items.addFolder(getName)};
    arr[arr.length] = newFolder.id;
    for (var i = 1; i<= targetItem.numItems; i++)
    {
        if(targetItem.item(i).typeName=='Composition')
        {
            dupItem = targetItem.item(i).duplicate();
            dupItem.parentFolder=app.project.itemByID(arr[arr.length-1]);
        }
        else if (targetItem.item(i).typeName=='Folder')
        {
            myDupLoop(targetItem.item(i),arr);
        };
    }
    return [arr.pop(),newFolder]
};
//Takes an item(comp or folder) and duplicates all of its contents with the correct naming. Skips footageItems.
function duplicator(itemObject)
{
    if (itemObject==undefined){return false};
    var itemType = itemObject.typeName;
    var itemId = itemObject.id;
    var parentFolder = itemObject.parentFolder;
    var targetItem = app.project.itemByID(itemId);
    if (itemType == 'Composition')
    {
        targetItem.duplicate();
        return true
    }
    else if (itemType == 'Folder')
    {
        var idArr = [];
        if(parentFolder.name!=='Root') {idArr[0] = parentFolder.id};
        return myDupLoop(itemObject,idArr)[1];
    };
};
//Import Project Item Into Active Comp
function importItemToActiveComp(templateName)
{
    var compId = findItem(templateName,true)[0];
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
//Deselects everything in the project panel
function deselectAll()
{
    var sel = app.project.selection;
    if(sel!==undefined)
    {
        for(var i = 0;i<sel.length;i++)
        {
            sel[i].selected = false;
        };
        return true
    }
    else {return undefined};
};
//Downloads a comp form database and imports it in project
function downloadAndImport(saveName,URL)
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
            }
            else {return false};
        }
        else {return false};
    }
    else {return false};
};
//copies and pastes a keyframe at custom input time
function cloneKeyAtTime(propPath,keyIndex,newKeyTime,deleteOld,timeIsFrames)
{
    ////Retrive key properties
    var myKey = keyProp(propPath,keyIndex);
    ///Delete Reference keyframe
    if (deleteOld==true)
    {
        propPath.removeKey(keyIndex);
    };
    ////Create New keyframe
    if (timeIsFrames==true)
    {
        var myTime = newKeyTime*(1/app.project.activeItem.frameRate);
        var newKey = propPath.addKey(myTime);
    }
    else
    {
        var newKey = propPath.addKey(newKeyTime);
    };
    //Set Key Properties
    propPath.setValueAtKey(newKey,myKey[0]);
    propPath.setTemporalEaseAtKey(newKey,myKey[5],myKey[6]);
    propPath.setInterpolationTypeAtKey(newKey,myKey[3],myKey[4]);
    if (propPath.isSpatial==true)
    {
        propPath.setSpatialTangentsAtKey(newKey,myKey[8],myKey[9]);
        if(myKey[10]==true){propPath.setRovingAtKey(newKey,true)};
        propPath.setTemporalAutoBezierAtKey(newKey,myKey[12]);
        propPath.setSpatialAutoBezierAtKey(newKey,myKey[11]);
        propPath.setTemporalContinuousAtKey(newKey,myKey[14]);
        propPath.setSpatialContinuousAtKey(newKey,myKey[13]);
    }
    return true
};
//Returns all key properties from input keyframe
function keyProp(propPath,keyIndex)
{
    ////Retrive key properties
    //Key Value
    var kVal = propPath.keyValue(keyIndex);
    //Key Time
    var kTime = propPath.keyTime(keyIndex);
    //Property Value Type
    var propValType = propPath.propertyValueType;
    //interpolation Types
    var inIntType = propPath.keyInInterpolationType(keyIndex);
    var outIntType = propPath.keyOutInterpolationType(keyIndex);
    //Temporal Ease
    var inTempEase = propPath.keyInTemporalEase(keyIndex);
    var outTempEase = propPath.keyOutTemporalEase(keyIndex);

    //Spatial Attributes
    if (propPath.isSpatial==true)
    {
        //Spatial Tangents
        var inSpatialTangent = propPath.keyInSpatialTangent(keyIndex);
        var outSpatialTangent = propPath.keyOutSpatialTangent(keyIndex);
        //Key Roving
        var isRoving = propPath.keyRoving(keyIndex);
        //AutoBezier
        var spatialAutoBezier = propPath.keySpatialAutoBezier(keyIndex);
        var temporalAutoBezier = propPath.keyTemporalAutoBezier(keyIndex);
        //Continuous
        var spatialContinuous = propPath.keySpatialContinuous(keyIndex);
        var temporalContinuous = propPath.keyTemporalContinuous(keyIndex);
    };
    return [kVal,kTime,propValType,inIntType,outIntType,inTempEase,outTempEase,propPath.isSpatial,inSpatialTangent,outSpatialTangent,isRoving,spatialAutoBezier,temporalAutoBezier,spatialContinuous,temporalContinuous]
};
//Shifts in and out animation times for a 4-keyframe based I/O animation
function IOanimKeySetter(propPath,newInTime,newOutTime)
{
    //Obtain some Key info
    var keyOne = keyProp(propPath,1);
    var keyTwo = keyProp(propPath,2);
    var keyThree = keyProp(propPath,3);
    var keyFour = keyProp(propPath,4);
    var inAnim = keyTwo[1] - keyOne[1];
    if(newInTime!==undefined)
    {
        cloneKeyAtTime(propPath,2,newInTime+inAnim,true,false);
        cloneKeyAtTime(propPath,1,newInTime,true,false);
    };
    if (newOutTime!==undefined)
    {
        var outAnim = keyFour[1] - keyThree[1];
        if(newInTime+inAnim<keyThree[1] || newInTime==undefined)
        {
            cloneKeyAtTime(propPath,3,newOutTime-outAnim,true,false);
            if (newOutTime-outAnim>keyFour[1]) {var k4Index = 3}
            else {var k4Index = 4};
            cloneKeyAtTime(propPath,k4Index,newOutTime,true,false);
        }
        else if(newInTime+inAnim>keyThree[1] && newInTime+inAnim<keyFour[1])
        {
            cloneKeyAtTime(propPath,2,newOutTime-outAnim,true,false);
            if (newOutTime-outAnim>keyFour[1]) {var k4Index = 3}
            else {var k4Index = 4};
            cloneKeyAtTime(propPath,k4Index,newOutTime,true,false);
        }
        else if (newInTime<keyThree[1] && newInTime+inAnim>keyFour[1])
        {
            cloneKeyAtTime(propPath,2,newOutTime-outAnim,true,false);
            cloneKeyAtTime(propPath,2,newOutTime,true,false);
        }
        else if(newInTime>keyThree[1] && newInTime<keyFour[1])
        {
            cloneKeyAtTime(propPath,1,newOutTime-outAnim,true,false);
            cloneKeyAtTime(propPath,2,newOutTime,true,false);
        }
        else if (newInTime>keyFour[1])
        {
            cloneKeyAtTime(propPath,1,newOutTime-outAnim,true,false);
            cloneKeyAtTime(propPath,1,newOutTime,true,false);
        }
    };
};


////MACRO FUNCTIONS

//Reset Topic Titles
function resetTopicTitles()
{
    app.beginUndoGroup("Reset Topic Titles");
    try
    {
        var compId = findItem("Global Topic Reference",true)[0];
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
        var id = findItem("Global Topic Reference",true)[0];
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
        var id2 = findItem("Global Topic Reference",true)[0];
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
//Generates map Overviews
function generateMap(saveName,url)
{
    try
    { 
        app.beginUndoGroup('Generate Map');
        var mapRootFolder = findItem(saveName);
        if(mapRootFolder[0]==false)
        {
            var myTemplate = downloadAndImport(saveName,url);
            if (myTemplate!==false)
            {
                var compArray = ['Maps [ND]','Comp Background 1','Map Edit 1'];
                var missingFiles = replaceMissing(compArray);
                if(missingFiles[1][0]!==undefined)
                {
                    delMissingFiles(missingFiles[1]);
                };
                if (missingFiles[0]==false || missingFiles[1][0]==undefined) {reportCode(0)};
                return generateMap(saveName,url)
            }
            else {alert("Animator Hub: There's and error in function generateMap.\n\nSuggested Actions:\n    -Make sure we have an active Internet Connection."); return false};
        };
        var mapMainFolderName = 'Map Overviews [MO]';
        var mapMainFolder = findItem(mapMainFolderName);
        if (mapMainFolder[0]==false)
        {
            for(var i = mapRootFolder[0];i<=folderRelativeLength(mapRootFolder)[1];i++)
            {
                if (app.project.item(i).typeName!=='Footage')
                {
                    app.project.item(i).name = app.project.item(i).name+' CORRUPTED';
                };

            };;
            return generateMap(saveName,url);
        };
        if (findItem('Maps [ND]')[0]==false || findItem('Map Comp 1')[0]==false || findItem('Map Edit 1')[0]==false || findItem('Comp Background 1')[0]==false)
        {   for(var i = mapRootFolder[0];i<=folderRelativeLength(mapRootFolder)[1];i++)
            {
                if (app.project.item(i).typeName!=='Footage')
                {
                    app.project.item(i).name = app.project.item(i).name+' CORRUPTED';
                };
            };
            return generateMap(saveName,url)
        };
        var mapMainFolderNumItems =  mapMainFolder[1].numItems;
        var usedCheck = undefined;
        if (mapMainFolderNumItems==0)
        {
            for(var i = mapRootFolder[0];i<=folderRelativeLength(mapRootFolder)[1];i++)
            {
                if (app.project.item(i).typeName!=='Footage')
                {
                    app.project.item(i).name = app.project.item(i).name+' CORRUPTED';
                };

            };
            return generateMap(saveName,url);
        }
        else if (mapMainFolderNumItems==1)
        {
            usedCheck = mapMainFolder[1].item(1).item(2).usedIn[0];
        };
        if(usedCheck!==undefined || mapMainFolderNumItems>1)
        {
            var targetItem = mapMainFolder[1].item(mapMainFolderNumItems);
            //Duplicate Last Folder
            var newMOFolder = duplicator(targetItem);
            if (newMOFolder==false) {return alert('Animator Hub: NewMOFolder is false')}
            //Replace Layers
            var mapComp = findItem(newMOFolder.item(2).name);
            var mapEdit = findItem(newMOFolder.item(1).item(2).name);
            var compBG = findItem(newMOFolder.item(1).item(1).name);
            mapComp[1].layer(serialNamer(mapEdit[3],undefined,true)).replaceSource(mapEdit[1],true);
            mapComp[1].layer(serialNamer(compBG[3],undefined,true)).replaceSource(compBG[1],true);
            mapEdit[1].layer('Reference Background.').replaceSource(compBG[1],true);
        }
        else if (usedCheck==undefined)
        {
            var newMOFolder = mapMainFolder[1].item(1);
            var mapComp = findItem(newMOFolder.item(2).name);
            var mapEdit = findItem(newMOFolder.item(1).item(2).name);
            var compBG = findItem(newMOFolder.item(1).item(1).name);
        };
        //Find last map comp
        var lastMapComp = newMOFolder.item(2);
        //Bring active viewer to front
        app.activeViewer.setActive();
        //Import Map Comp into active Comp
        var myActive = app.project.activeItem;
        var compImport = myActive.layers.add(lastMapComp);
        //Set Keyframes
        var myPath = compImport.property('Essential Properties').property('Animation');
        IOanimKeySetter(myPath,undefined,myActive.duration);
        //Set key values
        try {var screenSpan = eval(mapOvTextbox1.text)} catch(e){var screenSpan = 100};
        myPath.setValueAtKey(2,screenSpan); myPath.setValueAtKey(3,screenSpan);
        while(compBG[1].numLayers>2) {compBG[1].layer(3).remove()};
        while(mapEdit[1].layer(mapEdit[1].numLayers).hasVideo==false && mapEdit[1].layer(mapEdit[1].numLayers).hasAudio==true) {mapEdit[1].layer(mapEdit[1].numLayers).remove()};
        if(mapOvCb1.value==1)
        {
            for (var i = 1; i <= myActive.numLayers; i++)
            {
                if (myActive.layer(i).hasVideo==true && myActive.layer(i).source.comment.split("_")[0]!=='animHub')
                {
                    myActive.layer(i).copyToComp(compBG[1]);
                    compBG[1].layer(1).moveToEnd();
                    myActive.layer(i).enabled = false;
                    if(myActive.layer(i).hasAudio==true){myActive.layer(i).audioEnabled=false};
                    myActive.layer(i).shy = true;
                }
                else if (myActive.layer(i).hasVideo==false && myActive.layer(i).hasAudio==true)
                {
                    myActive.layer(i).copyToComp(mapEdit[1]);
                    mapEdit[1].layer(1).moveToEnd();
                    myActive.layer(i).audioEnabled=false;
                    myActive.layer(i).shy = true;
                };
            };
            myActive.hideShyLayers = true;

        };
        //Open Map Edit
        mapEdit[1].openInViewer();
        //Set Map
        mapEdit[1].layer('Map [ND]').property('Effects').property('Map')('Menu').setValue(mapOvMenu1.selection.index+1);
        app.endUndoGroup();
    }
    catch(e){alert("Animator Hub: There's an error in function 'generateMap'.\n\nSuggested Actions:\n    -Go talk to Brian!")}
};
//Generate Template Function
function generateTemplate(templateName,saveName,URL,hasMissingFiles,customEG,compArray,parArr,valArr)
{
    try
    {
        var compId = findItem(saveName)[0];
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
                if (missingFiles[1][0]!==undefined)
                {
                    delMissingFiles(missingFiles[1]);
                };
                if (missingFiles[0]==false || missingFiles[1][0]==undefined)
                {
                    reportCode(1);
                };
            };

        };
        app.activeViewer.setActive();
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
                    hub.stubs = hub.main.add ('dropdownlist', undefined, ['Topic Titles','Map Overviews','Agent Stats','Updates & Patch Notes']);
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
                                        mapOvPanel1 = hub.tabs[1].add('panel',undefined,'Map Overviews');
                                        mapOvPanel1.orientation = 'row';
                                            mapOvMenu1 = mapOvPanel1.add('dropdownlist',undefined,mapsArray);
                                            mapOvMenu1.selection = 0;
                                            mapOvGroup1 = mapOvPanel1.add('group');
                                            mapOvGroup1.orientation = 'column';
                                            mapOvGroup1.alignChildren = 'left';
                                            mapOvTextbox1 = mapOvGroup1.add('edittext',[0,0,75,23.5],'Screen Span');
                                            mapOvCb1 = mapOvGroup1.add('checkbox',undefined,'Manage Footage');
                                            mapOvCb1.value = 1;
                                            generateMapB = mapOvPanel1.add('button',undefined,'Generate Map');
                                        /*agentIconPanel1 = hub.tabs[1].add('panel',undefined,'Agent Icon');
                                        agentIconPanel1.orientation = 'row';
                                            AgentIconPanel1Group1 = agentIconPanel1.add('group');
                                            AgentIconPanel1Group1.orientation = 'column';
                                            agentIconMenu1 = AgentIconPanel1Group1.add('dropdownlist',undefined,agentsArray);
                                            agentIconMenu1.selection = 0;
                                            agentIconMenu2 = AgentIconPanel1Group1.add('dropdownlist',undefined,['Defender','Attacker']);
                                            agentIconMenu2.selection = 0;
                                            agentIconcheckbox1 = agentIconPanel1.add('checkbox',undefined,'Death');
                                            placeAgent = agentIconPanel1.add('button',undefined,'Place Agent');*/
                                    

                                hub.tabs[2] = hub.tabGroup.add ("group");
                                    hub.tabs[2].add ('panel {preferredSize: [-1, -10]}');
                                    hub.tabs[2].orientation = "column";
                                    agentStatspanel = hub.tabs[2].add("Panel",undefined,"Agent Stats Table");
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


                                hub.tabs[3] = hub.tabGroup.add ("group");
                                    hub.tabs[3].add ('panel {preferredSize: [-1, -10]}');
                                    hub.tabs[3].orientation = "column";
                                    updateTabGroup = hub.tabs[3].add("group",undefined,"");
                                    updateTabGroup.orientation = "row";
                                    updateTabGroup.alignment = "right";
                                    updateTabGroup.add ("statictext",undefined,"Current Version: "+currentVersion);
                                    updateButton = updateTabGroup.add("button",undefined,"Search for Updates");
                                    patchNotes = hub.tabs[3].add("panel",undefined,"Patch Notes 1.2.2");
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
                app.beginUndoGroup('Generate Template');
                var customEGpars = false;
                if (agentStatDropdown.selection!==null) {customEGpars = true};
                var parArr = ['.property("Settings").property("Sort Rank")','.property("Settings").property("Win Rate")','.property("Settings").property("Pick Rate")','.property("Settings").property("Map Sort")','.property("Data Input").property("Agent")','.property("Data Input").property("Rank Sort")','.property("Data Input").property("WR")','.property("Data Input").property("PR")','.property("Data Input").property("Map")']
                var valArr = [rsCB.value,wrCB.value,prCB.value,msCB.value,agentStatDropdown.selection.index+1,agentStats()[agentStatDropdown.selection.index].SortRank,agentStats()[agentStatDropdown.selection.index].WinRate,agentStats()[agentStatDropdown.selection.index].PickRate,agentStats()[agentStatDropdown.selection.index].SortMap];
                var compArray = ['Agent Pool [ast0]','Map Pool [ast0]','Rank Pool [ast0]','Agent Stats Table'];
                generateTemplate("Agent Stats Table","Agent Stats Table p5.0.aep","https://brianjosephstudio.github.io/templates/Agent%20Stats%20Table%20p5.0.aep",true,true,compArray,parArr,valArr);
                app.endUndoGroup();
            };
            generateMapB.onClick = function() {generateMap('Map Overviews p5.0.aep','https://brianjosephstudio.github.io/templates/Map%20Overviews%20p5.0.aep')};
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