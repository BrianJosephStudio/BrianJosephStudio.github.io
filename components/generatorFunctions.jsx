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
        var GTR = findTemplate("animHub_template_[GTR]");
        if (GTR !== false)
        {
            GTR.object.openInViewer();
        }
        else
        {
            generateGTR();
            var GTR = findTemplate("animHub_template_[GTR]");
            GTR.object.openInViewer();
        };
    }
    catch(e)
    {
        errorCode(12);
    }
    app.endUndoGroup();
};
//Create compItem
function generateGTR()
{
    try
    {
        var templateName = "Global Topic Reference";
        var commentTag = 'animHub_template_[GTR]';
        var saveName = "Global Topic Reference.aep";
       generateTemplate(templateName,commentTag,saveName,UrlManager.template.globalTopicReference,false,false,false,undefined)
    }
    catch(e)
    {
        errorCode(11);
    };
};
function generateAgentStatsTable(rsCB,wrCB,prCB,msCB,agentStatDropdown)
{try{
    app.beginUndoGroup('Generate Agent Stats Table');
    var templateName = "Agent Stats Table";
    var commentTag = 'animHub_template_[AST]';
    var saveName = "Agent Stats Table.aep";
    var compArray = ['Agent Pool [ast0]','Map Pool [ast0]','Rank Pool [ast0]','Agent Stats Table'];
    generateTemplate(templateName,commentTag,saveName,UrlManager.template.agentStatsTable,true,true,true,compArray);
    var sortRankcb = new EgParameter('Sort Rank',rsCB.value,'checkbox',templateName,'Settings',undefined);
    var winRatecb = new EgParameter('Win Rate',wrCB.value,'checkbox',templateName,'Settings',undefined);
    var pickRatecb = new EgParameter('Pick Rate',prCB.value,'checkbox',templateName,'Settings',undefined);
    var mapSortcb = new EgParameter('Map Sort',msCB.value,'checkbox',templateName,'Settings',undefined);
    var agent = new EgParameter('Agent',agentStatDropdown.selection.index,'menuControl',templateName,'Data Input',undefined);
    var sortRank = new EgParameter('Rank Sort',agentStats()[agentStatDropdown.selection.index].SortRank-1,'menuControl',templateName,'Data Input',undefined);
    var winRate = new EgParameter('WR',agentStats()[agentStatDropdown.selection.index].WinRate,'slider',templateName,'Data Input',undefined);
    var pickRate = new EgParameter('PR',agentStats()[agentStatDropdown.selection.index].PickRate,'slider',templateName,'Data Input',undefined);
    var map = new EgParameter('Map',agentStats()[agentStatDropdown.selection.index].SortMap-1,'menuControl',templateName,'Data Input',undefined);
    sortRankcb.setEgValue();
    winRatecb.setEgValue();
    pickRatecb.setEgValue();
    mapSortcb.setEgValue();
    agent.setEgValue();
    sortRank.setEgValue();
    winRate.setEgValue();
    pickRate.setEgValue();
    map.setEgValue();
    app.endUndoGroup();}catch(e){errorCode(4)}
};
//Generates map Overviews
function generateMap(saveName,url,Map,screenSpan,manageFootage)
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
                return generateMap(saveName,url,Map,screenSpan,manageFootage)
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
            return generateMap(saveName,url,Map,screenSpan,manageFootage);
        };
        if (findItem('Maps [ND]')[0]==false || findItem('Map Comp 1')[0]==false || findItem('Map Edit 1')[0]==false || findItem('Comp Background 1')[0]==false)
        {   for(var i = mapRootFolder[0];i<=folderRelativeLength(mapRootFolder)[1];i++)
            {
                if (app.project.item(i).typeName!=='Footage')
                {
                    app.project.item(i).name = app.project.item(i).name+' CORRUPTED';
                };
            };
            return generateMap(saveName,url,Map,screenSpan,manageFootage)
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
        if(isNaN(screenSpan.text)==false){var screenSpanValue = eval(screenSpan.text)}
        else{var screenSpanValue = 100;}
        myPath.setValueAtKey(2,screenSpanValue); myPath.setValueAtKey(3,screenSpanValue);
        while(compBG[1].numLayers>2) {compBG[1].layer(3).remove()};
        while(mapEdit[1].layer(mapEdit[1].numLayers).hasVideo==false && mapEdit[1].layer(mapEdit[1].numLayers).hasAudio==true) {mapEdit[1].layer(mapEdit[1].numLayers).remove()};
        if(manageFootage.value==true)
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
        mapEdit[1].layer('Map [ND]').property('Effects').property('Map')('Menu').setValue(Map.selection.index+1);
        app.endUndoGroup();
    }
    catch(e){alert("Animator Hub: There's an error in function 'generateMap'.\n\nSuggested Actions:\n    -Go talk to Brian!")}
};
function generateAgentIcon(agentIconMenu1,agentIconMenu2,agentIconCheckbox1)
{
    try
    {
        app.beginUndoGroup('Generate Agent Icon');
        var templateName = 'Agent Icon';
        var commentTag = "animHub_template_[AI]";
        var saveName = "Agent Icon.aep";
        var compArray = ['M.A.I. Agents'];
        generateTemplate(templateName,commentTag,saveName,UrlManager.template.agentIcon,true,true,false,compArray);
        var attackDefense = new EgParameter('Attack/Defense',agentIconMenu2.selection.index,'menuControl',templateName,undefined,undefined);
        var agent = new EgParameter('Agent',agentIconMenu1.selection.index,'menuControl',templateName,undefined,undefined);
        var death = new EgParameter('Death',agentIconCheckbox1.value,'checkbox',templateName,undefined,undefined);
        attackDefense.setEgValue();
        agent.setEgValue();
        death.setEgValue();
        var myLayer = app.project.activeItem.layer('Map [ND]');
        if(myLayer!== null){app.project.activeItem.selectedLayers[0].parent = myLayer}
        app.project.activeItem.selectedLayers[0].property('Transform').property('Scale').setValue([30,30]);
        app.project.activeItem.selectedLayers[0].property('Essential Properties').property('Rotation').expression = "transform.rotation";
        //make it parent of Map ND layer
        app.endUndoGroup();
    } catch(e) {errorCode(9)}
};
function generateTopBanner(topBannerMode,topBannerAgentMenu,topBannerGunMenu,topBannerAutoNaming,topBannerText,topBannerAttachedFloating,topBannerSide)
{
    try
    {
        app.beginUndoGroup('Generate Top Banner');
        var templateName = 'Top Banner';
        var commentTag = "animHub_template_[TB]";
        var templateTag = '[TB]';
        var saveName = "Top Banner.aep";
        var compArray = ['Top Banner','Agents Frame','Top Banner Agent Pool','Top Banner Gun Pool'];
        generateTemplate(templateName,commentTag,saveName,UrlManager.template.topBanner,true,true,false,compArray);
        var mode = new EgParameter('Mode',topBannerMode.selection.index,'menuControl',templateName,'Settings',undefined)
        var agentSelect = new EgParameter('Agent Select',topBannerAgentMenu.selection.index,'menuControl',templateName,'Settings',undefined);
        var gunSelect = new EgParameter('Gun Select',topBannerGunMenu.selection.index,'menuControl',templateName,'Settings',undefined);
        var autoNaming = new EgParameter('Auto-Naming',topBannerAutoNaming.value,'checkbox',templateName,'Settings',undefined);
        var bannerText = new egParameter('Text',topBannerText.text,'textInput',templateName,'Settings',undefined);
        var attachedFloating = new egParameter('Attached/Floating',topBannerAttachedFloating.selection.index,'menuControl',templateName,'Settings',undefined);
        var side = new egParameter('Side',topBannerSide.selection.index,'menucontrol',templateName,'Settings',undefined);
        mode.setEgValue();
        agentSelect.setEgValue();
        gunSelect.setEgValue();
        autoNaming.setEgValue();
        if(topBannerAutoNaming.value==false){bannerText.setEgValue()};
        attachedFloating.setEgValue();
        side.setEgValue();
        app.endUndoGroup();
    }catch(e){errorCode(13)}
};