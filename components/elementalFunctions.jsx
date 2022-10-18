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
ItemObject = function (searchMethod,searchValue,width,height,frameRate,pixelAspect)
{
    this.object = undefined;
    this.index = undefined;
    switch(searchMethod)
    {//Search by name
        case 'name':
            for(var i = 1; i<= app.project.numItems; i++)
            {
                if (app.project.item(i).name == searchValue) 
                {
                    this.object = app.project.itemByID(app.project.item(i).id)
                    this.index = i;
                    ;break
                };
            };
            break;
        //Search by ID
        case 'id':
            for (var i = 1 ; i <= app.project.numItems; i++)
            {
                if (app.project.item(i).id == searchValue) 
                {
                    this.object = app.project.itemByID(searchValue);
                    this.index = i;
                    break;
                }
            }
            break;
        //Search a Perfect Media Match
        case 'perfectMatch':
            for(var i = 1; i<= app.project.numItems; i++)
            {
                if (app.project.item(i).name == searchValue &&
                    app.project.item(i).width == width &&
                    app.project.item(i).height == height &&
                    app.project.item(i).frameRate == frameRate &&
                    app.project.item(i).pixelAspect == pixelAspect)
                {
                    this.object = app.project.itemByID(app.project.item(i).id);
                    this.index = i;
                    break;
                };
            };
            break;
        //Search by Index
        case 'index':
            if(searchValue<=app.project.numItems)
            {
                this.object = app.project.itembyID(app.project.item(searchValue).id);
                this.index = searchValue;
            }
            break;
        //Search by Comment
        case 'comment':
            for(var i = 1; i<= app.project.numItems; i++)
            {
                if(app.project.item(i).comment == searchValue)
                {
                    this.object = app.project.item(i);
                    this.index = i;
                    break;
                }
            };
            break;
        //Search by object
        case 'object':
            for(var i = 1; i<= app.project.numItems; i++)
            {
                if(app.project.item(i) == searchValue)
                {
                    this.object = searchValue;
                    this.index = i;
                    break;
                };
            };
            break;
        default:
            this.object = undefined;
            this.index = undefined;
    };
    if(this.object==undefined ||this.index==undefined)
    {
        return this
    }
    /***************************************************************************/
    // Parent Folder Declarations
    this.parentFolder = this.object.parentFolder;
    this.parentFolderID = this.parentFolder.id;
    // if parent folder is Root.
    if(this.parentFolder.name=='Root')
    {
        this.parentFolderLength = function(){return app.project.rootFolder.numItems};

    }
    // if parent folder is not Root.
    else 
    {
        this.parentFolderLength = function()
        {
            var lastItem = this.parentFolder.item(this.parentFolder.numItems);
            while(lastItem.typeName=='Folder')
            {
                 lastItem = lastItem.item(lastItem.numLayers);
            }
            for (var i = 1; i<= app.project.numItems;i++)
            {
                if(app.project.item(i).id==lastItem.id)
                {
                    return {length:i-this.parentFolderIndex(),lastLength:i}
                }
            }
            return false
        };
        this.parentFolderIndex = function()
        {
            for (var i = this.index-1;i>0;i--)
            {
                if (app.project.item(i).id == this.parentFolderID)
                {
                    return i
                }
            }
            return 0
        };
    };
    /***************************************************************************/
    this.length = this.object.numItems;
    this.indexInParentFolder = function()
    {
        for (var i = 1; i <= this.parentFolderLength;i++)
        {
            if (this.parentFolder.item(i).id==this.object.id)
            {
                return i
            }
        }
        return 0
    };
    return this
};
//Fetch Online Essential Graphics Comp | Downloads an .aep file from the database on the computer________________________________
function fetchEgCompOnline(saveName,URL)
{
    system.callSystem('cmd.exe /c cd '+FolderObject.templates.fsName+' && curl -s -f -o "'+saveName+'" "'+URL+'"');
    var dataCheck = system.callSystem('cmd.exe /c cd '+FolderObject.templates.fsName+' && if exist "'+saveName+'" (echo true) else (echo false)');
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
    app.activeViewer.setActive()
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
    if (missingFiles[1][0]!=undefined)
    {
        delMissingFiles(missingFiles[1]);
        return true;
    };
    if (missingFiles[0]==true && missingFiles[1][0]==undefined){return true}
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
        if(myItem.typeName!='Footage') {return false}
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
        alert("AnimatoR Hub: There's an error in function 'replaceLayers'.\n\n    -One of the variables is false");
        return false
    };
};
//Replace Missing layers in comp from project items with matching names__________________________________________________________
function replaceMissing(compArray)
{
    var completion = true;
    var report = [];
    for (var c = 0;c<compArray.length;c++)
    {
        var myComp = app.project.itemByID(findItem(compArray[c])[2]);
        var missingLayer;
        for (var i=1;i<=myComp.numLayers;i++)
        {
            if(myComp.layer(i).source!=null && myComp.layer(i).source.typeName == 'Footage' && myComp.layer(i).source.footageMissing==true)
            {
                missingLayer = myComp.layer(i).source;
                var missingCheck = myComp.layer(i).source.id;
                var targetItem = findItem(missingLayer.name,true);
                if (targetItem[0]==false) 
                {
                    var myMissingFile = new ResourceFile(missingLayer);
                    var myResourceFolder = resourceFolder(myMissingFile);
                    targetItem = [true];
                    targetItem.push(myMissingFile.resolve());
                    if(targetItem[1] != undefined)
                    {
                        targetItem[1].parentFolder = myResourceFolder.object;
                    }
                    else{return errorCode(14)};
                };
                if(targetItem!=undefined && targetItem[1].typeName=='Footage')
                {
                    myComp.layer(i).replaceSource(targetItem[1],true);
                    if (myComp.layer(i).source!=app.project.itemByID(missingCheck))
                    {
                        var repeated = false;
                        for(var d = 0; d < report.length;d++)
                        {
                            if (missingCheck==report[d])
                            {
                                repeated = true;
                            };
                        };
                        if(repeated == false)
                        {
                            report.push(missingCheck);
                        };
                    };
                };
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
    var myFile = new File('~/DOCUMENTS/Animator%20Hub/Templates/'+URIname)
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
            var myItem = app.project.importFile(new ImportOptions(fileObject));
            app.endSuppressDialogs(false);
            return myItem
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
//Downloads a comp from database and imports it in project. it then erases the downloaded file from system_______________________________________________________________________
function downloadAndImport(saveName,URL,URI,templateTag)
{
    var myDownload = fetchEgCompOnline(saveName,URL);
    if (myDownload==true)
    {
        var myFile = findFileInSystem(saveName);
        if (myFile!=false)
        {
            var myImport = importFileToProject(myFile);
            if (myImport!=false)
            {
                //eraseFileFromSystem(saveName);
                myImport.comment = 'animHub_templateRoot_'+templateTag;
                var templatesFolder = new ItemObject('comment','animHub_sortFiles_[TF]');
                if(templatesFolder.object != undefined){myImport.parentFolder = templatesFolder.object};
                return true;
            }
            else
            {
                return false
            };
        }
        else 
        {
            var myBackupFile = new File(URI);
            if(myBackupFile.exists==true)
            {
                importFileToProject(myBackupFile);
            }
            else
            {
                return false
            };
        };
    }
    else {return false};
};
//Downloads a resource file into its specified URI
function downloadResource(saveName,uri,url)
{
    var path = File(uri).fsName.slice(0,-(saveName.length));
    system.callSystem('cmd.exe /c cd '+path+' && curl -s -o "'+saveName+'" '+url);
    return {file : File(uri)}
}
//Downloads and imports a resource file into the project
function downloadImportResource(saveName,url,uri)
{
    var resourceFile = new File(uri);
    downloadResource(saveName,uri,url);
    return importFileToProject(resourceFile);
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
function resourceFolder(resourceFile)
{
    var resourceFolder = new ItemObject("comment","animHub_resourceFolder_[RF]");
    if(resourceFolder.object == undefined)
    {
        resourceFolder = new ItemObject("object",app.project.items.addFolder("Animator Hub Resource Folder"))
        resourceFolder.object.comment = "animHub_resourceFolder_[RF]";
        var sortFilesFolder = new ItemObject('comment','animHub_sortFiles_[PF]').object;
        if(sortFilesFolder != undefined){resourceFolder.object.parentFolder = sortFilesFolder} 
    };
    var myResourceFolder = new ItemObject("comment",resourceFile.resourceFolderComment);
    if(myResourceFolder.object == undefined)
    {
        myResourceFolder = new ItemObject("object",app.project.items.addFolder(resourceFile.resourceFolder))
        myResourceFolder.object.comment = resourceFile.resourceFolderComment;
        myResourceFolder.object.parentFolder = resourceFolder.object;
    };
    return myResourceFolder
};
function isInArray(array,item)
{
    for(var i = 0; i < array.length; i++)
    {
        if(array[i] == item) {return true};
        return false
    }
};
function sortFiles(compsVal,linkedCompsVal,templatesVal,videoFilesVal,imageFilesVal,audioFilesVal,solidsVal,otherFilesVal,projectVal,onlySelVal,excludeVal,rootFolderVal)
{
    if(compsVal==false && linkedCompsVal == false && templatesVal== false && videoFilesVal== false && imageFilesVal == false && audioFilesVal == false && solidsVal == false) {return};
    // Set up   
    var compItems = []; var linkedComps = []; var imageFiles = []; var videoFiles = []; var templates = []; var audioFiles = []; var solids = []; var otherFiles = [];
    var project = app.project;
    function isTarget(itemObject)
    {

        if (projectVal == true || (projectVal == false && onlySelVal == false && excludeVal == false))
        {
            return true
        };
        var sel = app.project.selection;
        if (onlySelVal == true)
        {
            for (var i = 0; i < sel.length; i++)
            {
                if(sel[i] == itemObject) {return true}
            };
            var parent = itemObject.parentFolder;
            while(parent != app.project.rootFolder)
            {
                if(isInArray(sel,parent) == true) {return true};
                parent = parent.parentFolder;
            };
            return false
        }
        else if(excludeVal == true)
        {
            for (var i = 0; i < sel.length; i++)
            {
                if(sel[i] == itemObject) {return false}
            };
            var parent = itemObject.parentFolder;
            while(parent != app.project.rootFolder)
            {
                if(isInArray(sel,parent) == true) {return false};
                parent = parent.parentFolder;
            };
            return true
        };
        return undefined;
    };
    // Get Files to Sort
    for (var i = 1; i <= app.project.numItems; i++)
    {
        var item = app.project.item(i);
        if (isTarget(item) == false)
            {continue}
        else if (item.comment.slice(0,20) == 'animHub_templateRoot' && item.typeName == 'Folder')
            {templates.push(item)}
        else if (item.name == 'Solids' && item.typeName == 'Folder')
            {solids.push(item)}
        else if ((item.comment.substring(0,7) == 'animHub' || item.parentFolder.comment.substring(0,7) == 'animHub'))
            {continue}
        else if (item.typeName == 'Composition' && item.name.slice(-14,-3) == 'Linked Comp')
            {linkedComps.push(item)}
        else if(item.typeName == 'Composition')
            {compItems.push(item)}
        else if(item.typeName == 'Footage' && item.mainSource != '[object SolidSource]' && item.width != 0 && item.duration == 0 && item.hasAudio == false)
            {imageFiles.push(item)}
        else if (item.typeName == 'Footage' && item.mainSource != '[object SolidSource]' && item.duration > 0 && item.hasVideo == true)
            {videoFiles.push(item)}
        else if(item.typeName == 'Footage' && item.mainSource != '[object SolidSource]' && item.hasVideo == false && item.hasAudio == true)
            {audioFiles.push(item)} 
        else if (item.typeName != 'Folder' && item.mainSource != '[object SolidSource]')
            {otherFiles.push(item)}
    };
    //Create Folders
    var projectFolder = new ItemObject('comment','animHub_sortFiles_[PF]').object;
    if(projectFolder == undefined)
    {
        if(rootFolderVal == true)
        {
            var projectFolder = app.project.items.addFolder('SkillCapped Project'); projectFolder.comment = 'animHub_sortFiles_[PF]';
        }
        else {var projectFolder = app.project.rootFolder;}
    }
    else if (rootFolderVal == false){var projectFolder = app.project.rootFolder;};
    var compsFolder = new ItemObject('comment','animHub_sortFiles_[CF]').object; if(compsFolder != undefined){compsFolder.parentFolder = projectFolder};
    var linkedFolder = new ItemObject('comment','animHub_sortFiles_[LC]').object; if(linkedFolder != undefined){linkedFolder.parentFolder = projectFolder};
    var templatesFolder = new ItemObject('comment','animHub_sortFiles_[TF]').object; if(templatesFolder != undefined){templatesFolder.parentFolder = projectFolder};
    var filesFolder = new ItemObject('comment','animHub_sortFiles_[FF]').object; if(filesFolder != undefined){filesFolder.parentFolder = projectFolder};
    var imagesFolder = new ItemObject('comment','animHub_sortFiles_[IF]').object;
    var videoFolder = new ItemObject('comment','animHub_sortFiles_[VF]').object;
    var audioFolder = new ItemObject('comment','animHub_sortFiles_[AF]').object;
    var otherFolder = new ItemObject('comment','animHub_sortFiles_[OF]').object; if(otherFolder != undefined){otherFolder.parentFolder = projectFolder};
    if(compItems.length > 0 && compsFolder == undefined && compsVal == true)
        {compsFolder = projectFolder.items.addFolder('Compositions'); compsFolder.comment = 'animHub_sortFiles_[CF]'};
    if(linkedComps.length > 0 && linkedFolder == undefined && linkedCompsVal == true)
        {linkedFolder = projectFolder.items.addFolder('Dynamic Linked Comps'); linkedFolder.comment = 'animHub_sortFiles_[LC]'};
    if(templates.length > 0 && templatesFolder == undefined && templatesVal == true)
        {templatesFolder = projectFolder.items.addFolder('Animator Hub Templates'); templatesFolder.comment = 'animHub_sortFiles_[TF]'};
    if(((imageFiles.length > 0 && imageFilesVal == true) || (videoFiles.length > 0 && videoFilesVal == true)) || (audioFiles.length > 0 && audioFilesVal == true) && filesFolder == undefined)
        {filesFolder = projectFolder.items.addFolder('Footage Files'); filesFolder.comment = 'animHub_sortFiles_[FF]'};
    if(imageFiles.length > 0 && imagesFolder == undefined && imageFilesVal == true)
        {imagesFolder = filesFolder.items.addFolder('Image Files'); imagesFolder.comment = 'animHub_sortFiles_[IF]'};
    if(videoFiles.length > 0 && videoFolder == undefined && videoFilesVal == true)
        {videoFolder = filesFolder.items.addFolder('Video Files'); videoFolder.comment = 'animHub_sortFiles_[VF]'};
    if(audioFiles.length > 0 && audioFolder == undefined && audioFilesVal == true)
        {audioFolder = filesFolder.items.addFolder('Audio Files'); audioFolder.comment = 'animHub_sortFiles_[AF]'};
    //Search for Animator Hub Resource Files Folder
    var resourceFilesFolder = new ItemObject('comment','animHub_resourceFolder_[RF]')
    {
        if(resourceFilesFolder.object != undefined && isTarget(resourceFilesFolder.object) == true && templatesVal == true)
        {resourceFilesFolder.object.parentFolder = projectFolder}
    }
    //Put solids folders inside our Project Folder
    if(solids[0] != undefined && solidsVal == true)
    {
        for(var i = 1; i < solids.length; i++)
        {
            while(solids[i].numItems > 0)
            {
                solids[i].item(1).parentFolder = solids[0]
            };
        };
        solids[0]
        solids[0].parentFolder = projectFolder;
    };
    //Loops to sort Files
    var filesToSort = [compItems,linkedComps,imageFiles,videoFiles,templates,audioFiles];
    var folders = [compsFolder,linkedFolder,imagesFolder,videoFolder,templatesFolder,audioFolder]
    for (var i = 0; i < filesToSort.length; i++)
    {
        for(var o = 0; o < filesToSort[i].length; o++)
        {
            if(folders[i] != undefined)
            {
                filesToSort[i][o].parentFolder = folders[i];
            }
        }
    }
    //Clean project one last time and put the rest of items in 'Other'
    if(app.project.rootFolder.numItems > 1 && otherFilesVal == true) 
    {
        if (otherFolder == undefined && otherFiles.length > 0)
        {otherFolder = projectFolder.items.addFolder('Other'); otherFolder.comment = 'animHub_sortFiles_[OF]'};
        for (var i = 0; i < otherFiles.length; i++)
        {
            otherFiles[i].parentFolder = otherFolder;
        }
    }
    //Delete Empty Folders
    for(var p = project.numItems; p > 0 ; p--)
    {
        var item = app.project.item(p);
        if(item.typeName == 'Folder' && item.numItems == 0 && isTarget(item) == true)
        {
            item.remove()
        }
    };
};
function updateResources(pathArray)
{
    for (var i = 0; i < pathArray.length; i++)
    {
        var path = File(pathArray[i]);
        if (path.exists == true)
        {
            var resource = new ResourceFile({name : path.displayName});
            downloadResource(resource.saveName,resource.uri,resource.url);
        }
    }
}