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
       generateTemplate(templateName,commentTag,saveName,UrlManager.template.globalTopicReference,UriManager.template.globalTopicReference,false,false,false,undefined)
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
    generateTemplate(templateName,commentTag,saveName,UrlManager.template.agentStatsTable,UriManager.template.agentStatsTable,true,true,true,compArray);
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
function generateMap(saveName,url,uri,Map,screenSpan,manageFootage)
{
    try
    { 
        app.beginUndoGroup('Generate Map');
        var mapRootFolder = findItem(saveName);
        if(mapRootFolder[0]==false)
        {
            var myTemplate = downloadAndImport(saveName,url,uri);
            if (myTemplate!=false)
            {
                var compArray = ['Maps [ND]','Comp Background 1','Map Edit 1'];
                fixMissing(compArray);
                return generateMap(saveName,url,uri,Map,screenSpan,manageFootage)
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
            return generateMap(saveName,url,uri,Map,screenSpan,manageFootage);
        };
        if (findItem('Maps [ND]')[0]==false || findItem('Map Comp 1')[0]==false || findItem('Map Edit 1')[0]==false || findItem('Comp Background 1')[0]==false)
        {   for(var i = mapRootFolder[0];i<=folderRelativeLength(mapRootFolder)[1];i++)
            {
                if (app.project.item(i).typeName!=='Footage')
                {
                    app.project.item(i).name = app.project.item(i).name+' CORRUPTED';
                };
            };
            return generateMap(saveName,url,uri,Map,screenSpan,manageFootage)
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
            return generateMap(saveName,url,uri,Map,screenSpan,manageFootage);
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
        generateTemplate(templateName,commentTag,saveName,UrlManager.template.agentIcon,UriManager.template.agentIcon,true,true,false,compArray);
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
        var compArray = ['Agents Frame','Guns Frame','Top Banner Agent Pool','Top Banner Gun Pool'];
        generateTemplate(templateName,commentTag,saveName,UrlManager.template.topBanner,UriManager.template.topBanner,true,true,false,compArray);
        var mode = new EgParameter('Mode',topBannerMode.selection.index,'menuControl',templateName,'Settings',undefined);
        var agentSelect = new EgParameter('Agent Select',topBannerAgentMenu.selection.index,'menuControl',templateName,'Settings',undefined);
        var gunSelect = new EgParameter('Gun Select',topBannerGunMenu.selection.index,'menuControl',templateName,'Settings',undefined);
        var autoNaming = new EgParameter('Auto-Naming',topBannerAutoNaming.value,'checkbox',templateName,'Settings',undefined);
        var bannerText = new EgParameter('Text',topBannerText.text,'textInput',templateName,'Settings',undefined);
        var attachedFloating = new EgParameter('Attached/Floating',topBannerAttachedFloating.selection.index,'menuControl',templateName,'Settings',undefined);
        var side = new EgParameter('Side',topBannerSide.selection.index,'menuControl',templateName,'Settings',undefined);
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
function placeOutroScreen(outroScreenManagement,outroScreenContentCreator,outroScreenVoiceOver,outroScreenArtDirection,outroScreenPiecer,outroScreenEditor)
{
    try
    {
        app.beginUndoGroup('Place Outro Screen');
        var templateName = 'Outro Screen';
        var commentTag = "animHub_template_[OS]";
        var templateTag = '[OS]';
        var saveName = "Outro Screen.aep";
        var compArray = ['Outro Screen','Credits'];
        generateTemplate(templateName,commentTag,saveName,UrlManager.template.outroScreen,UriManager.template.outroScreen,true,true,false,compArray)
        var management = new EgParameter('Management',String(outroScreenManagement.selection),'textInput',templateName,undefined,undefined);
        var contentCreator = new EgParameter('Content Creator',String(outroScreenContentCreator.selection),'textInput',templateName,undefined,undefined);
        var voiceOver = new EgParameter('Voice-Over',String(outroScreenVoiceOver.selection),'textInput',templateName,undefined,undefined);
        var artDirection = new EgParameter('Art Direction',String(outroScreenArtDirection.selection),'textInput',templateName,undefined,undefined);
        var piecer = new EgParameter('Piecer',String(outroScreenPiecer.selection),'textInput',templateName,undefined,undefined);
        var editor = new EgParameter('Editor',String(outroScreenEditor.selection),'textInput',templateName,undefined,undefined);
        management.setEgValue();
        contentCreator.setEgValue();
        voiceOver.setEgValue();
        artDirection.setEgValue();
        piecer.setEgValue();
        editor.setEgValue();
        app.endUndoGroup();
    }catch(e){errorCode(16)}
};
function declareTitle(titleBox,topicId)
{
    var GTR = findTemplate('animHub_template_[GTR]');
    if(GTR==false){generateGTR(); GTR = findTemplate('animHub_template_[GTR]')};
    var text = '';
    var line1 = '';
    var line2 = '';
    if(titleBox.text.length != 0)
    {
        text = (titleBox.text.replace('\n',' '));
        line1 = titleBox.text.split('\n')[0];
        line2 = titleBox.text.split('\n')[1];
        GTR.object.layer(topicId.selection.index+1).property('Source Text').setValue(text);
    }
    else if(titleBox.text.length == 0 || titleBox.text == 'Insert Title Text')
    {
        text = String(GTR.object.layer(topicId.selection.index+1).property('Source Text').value);
        if(GTR.object.layer(topicId.selection.index+1).sourceRectAtTime(0,false).width >= 270)
        {
            var titleLength = text.split(' ').length;
            var titleMidPoint = Math.ceil(text.split(' ').length/2)
            for (var i = 0; i<titleMidPoint; i++)
            {
                line1 += text.split(' ')[i] + ' ';
            };
            for (var i = titleMidPoint-1; i< titleLength; i++)
            {
                line2 += text.split(' ')[i] + ' ';
            };
        }
        else
        {
            line1 = text;
            line2 = undefined;
        };
    };
    return {line1:line1, line2:line2}
};
function generateTopicTitle(titleBox,style,topicId)
{
    try
    {
        app.activeViewer.setActive();
        var selection = app.project.activeItem.selectedLayers[0].source.comment;
    }
    catch(e)
    {
        var selection = undefined
    }
    try
    {
        var templateName = 'Topic Title';
        var commentTag = "animHub_template_[TT]";
        var templateTag = '[TT]';
        var saveName = "Topic Title.aep";
        var compArray = ['Topic Title','Title Box','Glass Panel','Black Panel'];
        app.beginUndoGroup('Generate Topic Title')
        if(selection != 'animHub_template_[TT]')
        {
            generateTemplate(templateName,commentTag,saveName,UrlManager.template.topicTitle,UriManager.template.topicTitle,true,true,true,compArray);
        };
        var myText = declareTitle(titleBox,topicId);
        //Private Style Variables
        var active1Value = true;
        if(myText.line2 == undefined)
        {
            var active2Value = false;
            var position1Value = [960,488.9];
        }
        else
        {
            var active2Value = true;
            var position1Value = [960,455.9]
        };
        if(style.selection.index == 0)
        {
            //Default Style
            var text1ScaleValue = 50;
            var text2ScaleValue = 95;
            var color1 = [0.9,0.9,0.9,0];
            var color2 = [254/255,74/255,87/255,0];
            var font1 = "Montserrat-Light";
            var font2 = "Montserrat-Bold";
        }
        else if (style.selection.index == 1)
        {
            //Reverse Style
            var text1ScaleValue = 95;
            var text2ScaleValue = 50;
            var color1 = [254/255,74/255,87/255,0];
            var color2 = [0.9,0.9,0.9,0];
            var font1 = "Montserrat-Bold";
            var font2 = "Montserrat-Light";
        };
        //
        //
        var topicID =  new EgParameter('Topic ID',topicId.selection.index,'menuControl',templateName,'Settings',undefined);

        var active1 = new EgParameter('Active 1',active1Value,'checkbox',templateName,'Settings','Text');
        var text1 = new EgParameter('Text 1',myText.line1,'textInput',templateName,'Settings','Text');
        var text1Scale = new EgParameter('Text 1 Font Size',text1ScaleValue,'slider',templateName,'Settings','Text');
        var text1Font = new EgParameter('Text 1 Font',font1,'textInput',templateName,'Settings','Style');
        var text1Color = new EgParameter('Text 1 Color',color1,'color',templateName,'Settings','Style');
        var position1 = new EgParameter('Text 1 Position',position1Value,'positionArray',templateName,'Settings','Text')
        topicID.setEgValue();
        active1.setEgValue();
        text1.setEgValue();
        text1Scale.setEgValue();
        text1Font.setEgValue();
        text1Color.setEgValue();
        position1.setEgValue();

        var active2 = new EgParameter('Active 2',active2Value,'checkbox',templateName,'Settings','Text');
        active2.setEgValue();
        if(active2Value == true)
        {
            var text2 = new EgParameter('Text 2',myText.line2,'textInput',templateName,'Settings','Text');
            var text2Scale = new EgParameter('Text 2 Font Size',text2ScaleValue,'slider',templateName,'Settings','Text');
            var text2Font = new EgParameter('Text 2 Font',font2,'textInput',templateName,'Settings','Style');
            var text2Color = new EgParameter('Text 2 Color',color2,'color',templateName,'Settings','Style');
            text2.setEgValue();
            text2Scale.setEgValue();
            text2Font.setEgValue();
            text2Color.setEgValue();
        };
        app.endUndoGroup();
    }
        catch(e){errorCode(17)}
}
function generateTopicDisplay(topicID,cuVisibility)
{
    try
    {
        app.beginUndoGroup('Place Outro Screen');
        var templateName = 'Topic Display';
        var commentTag = "animHub_template_[TD]";
        var templateTag = '[TD]';
        var saveName = "Topic Display.aep";
        var compArray = [];
        generateTemplate(templateName,commentTag,saveName,UrlManager.template.topicDisplay,UriManager.template.topicDisplay,true,false,false,compArray)
        var topicId = new EgParameter('Topic ID',topicID.selection.index,'menuControl',templateName,"Layout Settings",undefined);
        //var visibility = new EgParameter("Coming Up Visibility",cuVisibility.selection.index,'menuControl',templateName,"Layout Settings",undefined);
        topicId.setEgValue();
        //visibility.setEgValue();
        app.activeViewer.setActive();
        app.project.activeItem.selectedLayers[0].property("Essential Properties").property("Animation").property("Duration Slider").expression = "thisProperty.key(1).time-thisLayer.inPoint";
        app.endUndoGroup();
    }catch(e){errorCode(16)}
};
function generateCCT(menuControl)
{
    var templateName = 'Content Creator Tag';
    var commentTag = "animHub_template_[CCT]";
    var templateTag = '[CCT]';
    var saveName = "Content Creator Tag.aep";
    var compArray = ['Text Box','Social Media Logos','Glass Panel Shape 1','Glass Panel Shape 2','Glass Panel Shape 3'];
    generateTemplate(templateName,commentTag,saveName,UrlManager.template.creatorTag,UriManager.template.creatorTag,true,true,true,compArray);
    var socialMediaLibrary =
    {
        CaseyKing : [true,true,true],
        Teets : [false,true,true],
        DrZora : [true,true,false],
        LukasBylsma : [true,false,false],
        Jitterz : [true,false,false],
        xtr : [true,false,false],
        Dorshii : [true,false,false],
        xJake : [true,false,false]
    }
    var cctName = String(menuControl.selection).replace(' ','');
    var ccName = new EgParameter('Content Creator Name',String(menuControl.selection),'textInput',templateName,undefined,undefined);
    var cctTwitch = new EgParameter('Twitch',socialMediaLibrary[cctName][0],'checkbox',templateName,undefined,undefined);
    var cctYoutube = new EgParameter('Youtube',socialMediaLibrary[cctName][1],'checkbox',templateName,undefined,undefined);
    var cctTwitter = new EgParameter('Twitter',socialMediaLibrary[cctName][2],'checkbox',templateName,undefined,undefined);
    ccName.setEgValue();
    cctTwitch.setEgValue();
    cctYoutube.setEgValue();
    cctTwitter.setEgValue();
};