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
                if (missingFiles[0]==true && missingFiles[1][0]==undefined){}
                else if (missingFiles[0]==false || missingFiles[1][0]==undefined){reportCode(0)};
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
        if(app.project.activeItem == null){return reportCode(2)};
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
                if (missingFiles[0]==true && missingFiles[1][0]==undefined){}
                else if (missingFiles[0]==false || missingFiles[1][0]==undefined)
                {
                    reportCode(1);
                };
            };

        };
        app.activeViewer.setActive();
        if(app.project.activeItem == null){return reportCode(2)};
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