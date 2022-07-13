//// ELEMENTAL FUNCTIONS ////

//Agent Stats JSON ______________________________________________________________________________________________________________
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
//Agent Stats JSON_______________________________________________________________________________________________________________
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
//Map Array______________________________________________________________________________________________________________________
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
//Agents Array___________________________________________________________________________________________________________________
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
//Finding compItem | returns compItem index______________________________________________________________________________________
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
        errorCode(5);
    }
};
//returns template item Id
function findTemplate(commentTag)
{
    var templateIndex = 0;
    for(var i = 1; i<= app.project.numItems; i++)
    {
        if (app.project.item(i).comment == commentTag)
        {
            var ParentFolder = app.project.item(i).parentFolder;
            var tempName = app.project.item(i).name;
            var templateID = app.project.item(i).id;
            templateIndex = i;
            var obj = app.project.itemByID(templateID);
            break;
        };
    };
    if(templateIndex==0){return false};
    return {object : obj, ID : templateID, index: templateIndex, templateName : tempName, parent : ParentFolder.name,parentID : ParentFolder.id}
};
//Fetch Online Essential Graphics Comp | Downloads an .aep file from the database on the computer________________________________
function fetchEgCompOnline(saveName,URL)
{
    system.callSystem('cmd.exe /c cd %HOMEPATH% && cd downloads && curl -s -f -o "'+saveName+'" "'+URL+'"');
    var dataCheck = system.callSystem('cmd.exe /c cd %HOMEPATH% && cd downloads && if exist "'+saveName+'" (echo true) else (echo false)');
    if (dataCheck.search('true')!==-1) {return true}
    else {return false};
};
//Fetch Online Json | Returns Json ready to be parsed____________________________________________________________________________
function fetchOnlineJson(URL)
{
    var myJson = system.callSystem('curl -s '+ URL);
    if (myJson!=='') {return myJson}
    else {return false};
};
//Json Object Array______________________________________________________________________________________________________________
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
        errorCode(7);
        return false
    };
};
//Use array to find a group of items with matching names | Returns an array of indexes.__________________________________________
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
//Activates Collapse Transformations for the active comp and targeted layer name.________________________________________________
function activateCollapse(templateName)
{
    var myLayer = app.project.activeItem.layer(templateName);
    myLayer.collapseTransformation = true;
};
/* Finds the range of items within a folder. Returns a 2 value array:
[0]:Total Amount of items within specified folder.
[1]Absolute index of the last item within that folder.*///_______________________________________________________________________
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
//Stores missing Files in a specified folder and outputs them in an array________________________________________________________
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

function fixMissing(compArray)
    {
        var missingFiles = replaceMissing(compArray); 
        if (missingFiles[1][0]!==undefined)
        {
            delMissingFiles(missingFiles[1]);
        };
        if (missingFiles[0]==true && missingFiles[1][0]==undefined){}
        else if (missingFiles[0]==false || missingFiles[1][0]==undefined)
        {
            reportCode(1);
        };
    };
//Erase Missing files targeted in an array_______________________________________________________________________________________
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
//returns a filtered string without its extension, if any._______________________________________________________________________
function removeExtFromName(nameString)
{
    var output;
    if (nameString.slice(-4)=='.png') {output = nameString.slice(0,-4)}
    else if (nameString.slice(-5)=='.jpeg') {output = nameString.slice(0,-5)}
    else if (nameString.slice(-5)=='.mp4') {output = nameString.slice(0,-4)}
    else {output = nameString};
    return output
    
};
//Replace files in target Comp from an array of project items____________________________________________________________________
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
//Replace Missing layers in comp from project items with matching names__________________________________________________________
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
//Delete File in System__________________________________________________________________________________________________________
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
//Find Downloaded Comp in System |Returns ExtendScript File Object(URI)__________________________________________________________
function findFileInSystem(fileName)
{
    var URIname = encodeURI(fileName)
    var myFile = new File('~/DOWNLOADS/'+URIname)
    var openMyFile = myFile.open("r");
    myFile.close();
    if (openMyFile==true) {return myFile}
    else {return false};
};
//Imports a File Object into the current project.________________________________________________________________________________
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
            errorCode(6);
            return false
        };
    };
};
//Takes a string and returns a string with a raised number at the end or a 2 if there is no number at the end.___________________
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
//Renames all layers inside project or specified folder based on search and replace input variables______________________________
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
//A loop designed to work within duplicator function_____________________________________________________________________________
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
//Takes an item(comp or folder) and duplicates all of its contents with the correct naming. Skips footageItems.__________________
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
//Import Project Item Into Active Comp___________________________________________________________________________________________
function importItemToActiveComp(template)
{
    if (template!==false)
    {
        try
        {
            var activeComp = app.project.activeItem;
            activeComp.layers.add(template.object);
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
ParameterArray is an array of property path strings*///__________________________________________________________________________
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
//Deselects everything in the project panel______________________________________________________________________________________
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
//Downloads a comp form database and imports it in project_______________________________________________________________________
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
                return true;
            }
            else {return false};
        }
        else {return false};
    }
    else {return false};
};
//copies and pastes a keyframe at custom input time______________________________________________________________________________
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
//Returns all key properties from input keyframe_________________________________________________________________________________
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
//Shifts in and out animation times for a 4-keyframe based I/O animation_________________________________________________________
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