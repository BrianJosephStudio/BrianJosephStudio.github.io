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
        var templateTag = '[GTR]';
       generateTemplate(templateName,commentTag,templateTag,saveName,DropBoxPath.template.globalTopicReference,UriManager.template.globalTopicReference,false,false,false,undefined)
    }
    catch(e)
    {
        errorCode(11);
    };
};
function generateAgentStatsTable(rsCB,wrCB,prCB,msCB,agentStatDropdown)
{
    try{
        app.beginUndoGroup('Generate Agent Stats Table');
        var templateName = "Agent Stats Table";
        var commentTag = 'animHub_template_[AST]';
        var templateTag = '[AST]'
        var saveName = "Agent Stats Table.aep";
        var compArray = ['Agent Pool [ast0]','Map Pool [ast0]','Rank Pool [ast0]','Agent Stats Table'];
        generateTemplate(templateName,commentTag,templateTag,saveName,DropBoxPath.template.agentStatsTable,UriManager.template.agentStatsTable,true,true,true,compArray);
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
        app.endUndoGroup();} catch(e){errorCode(4)
    }
};
//Generates map Overviews
function generateMap(saveName,dropboxPath,uri,Map,screenSpan,manageFootage)
{
    try
    { 
        app.beginUndoGroup('Generate Map');
        var mapRootFolder = new ItemObject("name",saveName);
        if(mapRootFolder.object==undefined)
        {
            var templateTag = '[MO]';
            var myTemplate = downloadAndImport(saveName,dropboxPath,uri,templateTag);
            if (myTemplate!=false)
            {
                var compArray = ['Maps [ND]','Comp Background 1','Map Edit 1'];
                fixMissing(compArray);
                return generateMap(saveName,dropboxPath,uri,Map,screenSpan,manageFootage)
            }
            else {errorCode(19); return false};
        };
        var mapMainFolderName = 'Map Overviews [MO]';
        var mapMainFolder = new ItemObject("name",mapMainFolderName);
        if (mapMainFolder.object==undefined)
        {
            for(var i = mapRootFolder.index;i<=folderRelativeLength(mapRootFolder.index)[1];i++)
            {
                if (app.project.item(i).typeName!=='Footage')
                {
                    app.project.item(i).name = app.project.item(i).name+' CORRUPTED';
                };

            };;
            return generateMap(saveName,dropboxPath,uri,Map,screenSpan,manageFootage);
        };
        if (new ItemObject("name",'Maps [ND]').object==undefined || new ItemObject("name",'Map Comp 1').object==undefined || new ItemObject("name",'Map Edit 1').object==undefined || new ItemObject("name",'Comp Background 1').object==undefined)
        {   for(var i = mapRootFolder.index;i<=folderRelativeLength(mapRootFolder.index)[1];i++)
            {
                if (app.project.item(i).typeName!=='Footage')
                {
                    app.project.item(i).name = app.project.item(i).name+' CORRUPTED';
                };
            };
            return generateMap(saveName,dropboxPath,uri,Map,screenSpan,manageFootage)
        };
        
        var mapMainFolderNumItems =  mapMainFolder.object.numItems;
        var usedCheck = undefined;
        if (mapMainFolderNumItems==0)
        {
            for(var i = mapRootFolder.index;i<=folderRelativeLength(mapRootFolder.index)[1];i++)
            {
                if (app.project.item(i).typeName != 'Footage')
                {
                    app.project.item(i).name = app.project.item(i).name+' CORRUPTED';
                };

            };
            return generateMap(saveName,dropboxPath,uri,Map,screenSpan,manageFootage);
        }
        else if (mapMainFolderNumItems==1)
        {
            usedCheck = mapMainFolder.object.item(1).item(2).usedIn[0];
        };
        if(usedCheck!==undefined || mapMainFolderNumItems>1)
        {
            var targetItem = mapMainFolder.object.item(mapMainFolderNumItems);
            //Duplicate Last Folder
            var newMOFolder = duplicator(targetItem);
            if (newMOFolder==false) {return alert('Animator Hub: NewMOFolder is false')}
            //Replace Layers
            var mapComp = new ItemObject("name",newMOFolder.item(2).name);
            var mapEdit = new ItemObject("name",newMOFolder.item(1).item(2).name);
            var compBG = new ItemObject("name",newMOFolder.item(1).item(1).name);
            mapComp.object.layer(serialNamer(mapEdit.object.name,undefined,true)).replaceSource(mapEdit.object,true);
            mapComp.object.layer(serialNamer(compBG.object.name,undefined,true)).replaceSource(compBG.object,true);
            mapEdit.object.layer('Reference Background.').replaceSource(compBG.object,true);
        }
        else if (usedCheck==undefined)
        {
            var newMOFolder = mapMainFolder.object.item(1);
            var mapComp = new ItemObject("name",newMOFolder.item(2).name);
            var mapEdit = new ItemObject("name",newMOFolder.item(1).item(2).name);
            var compBG = new ItemObject("name",newMOFolder.item(1).item(1).name);
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
        if(isNaN(screenSpan)==false){var screenSpanValue = eval(screenSpan)}
        else{var screenSpanValue = 100;}
        myPath.setValueAtKey(2,screenSpanValue); myPath.setValueAtKey(3,screenSpanValue);
        while(compBG.object.numLayers>2) {compBG.object.layer(3).remove()};
        while(mapEdit.object.layer(mapEdit.object.numLayers).hasVideo==false && mapEdit.object.layer(mapEdit.object.numLayers).hasAudio==true) {mapEdit.object.layer(mapEdit.object.numLayers).remove()};
        if(manageFootage==true)
        {
            for (var i = 1; i <= myActive.numLayers; i++)
            {
                if (myActive.layer(i).hasVideo==true && myActive.layer(i).source.comment.split("_")[0]!=='animHub')
                {
                    myActive.layer(i).copyToComp(compBG.object);
                    compBG.object.layer(1).moveToEnd();
                    myActive.layer(i).enabled = false;
                    if(myActive.layer(i).hasAudio==true){myActive.layer(i).audioEnabled=false};
                    myActive.layer(i).shy = true;
                }
                else if (myActive.layer(i).hasVideo==false && myActive.layer(i).hasAudio==true)
                {
                    myActive.layer(i).copyToComp(mapEdit.object);
                    mapEdit.object.layer(1).moveToEnd();
                    myActive.layer(i).audioEnabled=false;
                    myActive.layer(i).shy = true;
                };
            };
            myActive.hideShyLayers = true;

        };
        //Open Map Edit
        mapEdit.object.openInViewer();
        //Set Map
        mapEdit.object.layer('Map [ND]').property('Effects').property('Map')('Menu').setValue(Map+1);
        var mapControl = mapEdit.object.layer('Map Control');
        if(screenSpan == 50){
            mapControl.property('transform').property("position").setValue([750,1080])
            mapControl.property('transform').property("scale").setValue([80,80])
        }else if (screenSpan == 35){
            mapControl.property('transform').property("position").setValue([275,1080])
            mapControl.property('transform').property("scale").setValue([80,80])
        }
        app.endUndoGroup();
    }
    catch(e){hubError(e)}
};
function generateAgentIcon(agentIconMenu1,agentIconMenu2,agentIconCheckbox1)
{
    try
    {
        app.beginUndoGroup('Generate Agent Icon');
        var templateName = 'Agent Icon';
        var commentTag = "animHub_template_[AI]";
        var templateTag = '[AI]';
        var saveName = "Agent Icon.aep";
        var compArray = ['M.A.I. Agents'];
        generateTemplate(templateName,commentTag,templateTag,saveName,DropBoxPath.template.agentIcon,UriManager.template.agentIcon,true,true,false,compArray);
        var attackDefense = new EgParameter('Attack/Defense',agentIconMenu2.selection.index,'menuControl',templateName,undefined,undefined);
        var agent = new EgParameter('Agent',agentIconMenu1.selection.index,'menuControl',templateName,undefined,undefined);
        var death = new EgParameter('Death',agentIconCheckbox1.value,'checkbox',templateName,undefined,undefined);
        attackDefense.setEgValue();
        agent.setEgValue();
        death.setEgValue();
        var myLayer = app.project.activeItem.layer('Map [ND]');
        if(myLayer!= null)
        {
            app.project.activeItem.selectedLayers[0].parent = myLayer
            app.project.activeItem.selectedLayers[0].property('Transform').property('Scale').setValue([4,4]);
        };
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
        generateTemplate(templateName,commentTag,templateTag,saveName,DropBoxPath.template.topBanner,UriManager.template.topBanner,true,true,false,compArray);
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
function placeIntroScreen()
{
    try
    {
        app.beginUndoGroup('Place Intro Screen');
        var templateName = 'Intro Screen';
        var commentTag = "animHub_template_[IS]";
        var templateTag = '[IS]';
        var saveName = "Intro Screen.aep";
        var compArray = ['Intro Screen'];
        generateTemplate(templateName,commentTag,templateTag,saveName,DropBoxPath.template.introScreen,UriManager.template.introScreen,true,true,true,compArray);
        app.project.activeItem.selectedLayers[0].source.openInViewer();
        app.project.toolType = 9029;
        app.endUndoGroup();
    }catch(e){errorCode(16)}
}
function placeOutroScreen(outroScreenManagement,outroScreenContentCreation,outroScreenVoice,outroScreenArtDirection,outroScreenClipping,outroScreenEditing,outroScreenAnimation)
{
    try
    {
        app.beginUndoGroup('Place Outro Screen');
        var templateName = 'Outro Screen';
        var commentTag = "animHub_template_[OS]";
        var templateTag = '[OS]';
        var saveName = "Outro Screen.aep";
        var compArray = ['Outro Screen','Credits'];
        generateTemplate(templateName,commentTag,templateTag,saveName,DropBoxPath.template.outroScreen,UriManager.template.outroScreen,true,true,false,compArray)
        var management = new EgParameter('Management',String(outroScreenManagement.selection),'textInput',templateName,undefined,undefined);
        var contentCreation = new EgParameter('Content Creation',String(outroScreenContentCreation.selection),'textInput',templateName,undefined,undefined);
        var voice = new EgParameter('Voice-Over',String(outroScreenVoice.selection),'textInput',templateName,undefined,undefined);
        var artDirection = new EgParameter('Art Direction',String(outroScreenArtDirection.selection),'textInput',templateName,undefined,undefined);
        var clipping = new EgParameter('Clipping',String(outroScreenClipping.selection),'textInput',templateName,undefined,undefined);
        var videoDirection = new EgParameter('Video Direction',String(outroScreenEditing.selection),'textInput',templateName,undefined,undefined);
        var animation = new EgParameter('Animation',String(outroScreenAnimation.selection),'textInput',templateName,undefined,undefined);
        management.setEgValue();
        contentCreation.setEgValue();
        voice.setEgValue();
        artDirection.setEgValue();
        clipping.setEgValue();
        videoDirection.setEgValue();
        animation.setEgValue();
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
    } catch(e){var selection = undefined}
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
            generateTemplate(templateName,commentTag,templateTag,saveName,DropBoxPath.template.topicTitle,UriManager.template.topicTitle,true,true,true,compArray);
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
        app.beginUndoGroup('Place Topic Display');
        var templateName = 'Topic Display';
        var commentTag = "animHub_template_[TD]";
        var templateTag = '[TD]';
        var saveName = "Topic Display.aep";
        var compArray = ["Topic Display"];
        generateTemplate(templateName,commentTag,templateTag,saveName,DropBoxPath.template.topicDisplay,UriManager.template.topicDisplay,true,true,false,compArray)
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
    generateTemplate(templateName,commentTag,templateTag,saveName,DropBoxPath.template.creatorTag,UriManager.template.creatorTag,true,true,true,compArray);
    var socialMediaLibrary =
    {
        CaseyKing : [true,true,true],
        Teets : [false,true,true],
        DrZora : [true,true,false],
        LukasBylsma : [true,false,false],
        Jitterz : [true,false,false],
        xtr : [true,false,false],
        Rem : [false,false,false],
        CoachMills :[true,false,false]
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
function placeWaterMark()
{
    var templateName = 'SC Watermark';
    var commentTag = "animHub_template_[WM]";
    var templateTag = '[WM]';
    var saveName = "SC_Watermark.aep";
    var compArray = ['SC Watermark'];
    generateTemplate(templateName,commentTag,templateTag,saveName,DropBoxPath.template.waterMark,UriManager.template.waterMark,true,false,false,compArray);
    app.activeViewer.setActive();
    var animPath = app.project.activeItem.selectedLayers[0].property('Essential Properties').property('Animation');
    var outTime = app.project.activeItem.duration;
    IOanimKeySetter(animPath,0,outTime)
};
function resolveResource(selection,placeInComp)
{
    AccessToken()
    var resourceArray = [];
    treeView2Resourcearray(selection);
    deselectAll();
    for(var i = 0; i < resourceArray.length; i++)
    {
        var targetItem = new ItemObject('fileObject',File(resourceArray[i].uri));
        if (targetItem.object != undefined)
        {
            if (targetItem.object.parentFolder.comment != resourceArray[i].resourceFolderComment)
            {
                targetItem.object.parentfolder = resourceFolder(resourceArray[i]);
            }
        }
        else
        {
            var file = File(resourceArray[i].uri);
            if(file.exists == true)
            {
                targetItem = new ItemObject("object",importFileToProject(file));
                targetItem.object.parentFolder = resourceFolder(resourceArray[i]).object
            }
            else
            {
                var saveName = resourceArray[i].saveName;
                var dbPath = resourceArray[i].dropboxPath;
                var uri = resourceArray[i].uri
                targetItem = new ItemObject("object",downloadImportResource(saveName,dbPath,uri));
                targetItem.object.parentFolder = resourceFolder(resourceArray[i]).object
            };
        };
        targetItem.object.selected = true;
        if(placeInComp == true)
        {
            app.activeViewer.setActive();
            var sel = app.project.activeItem.selectedLayers
            var newLayer = app.project.activeItem.layers.add(targetItem.object);
            if(sel[0] == undefined || selection.type == "node"){continue};
            var index;
            for(var i = 0; i < sel.length; i++)
            {
                if (i == 0){index = sel[i].index; continue};
                if(sel[i].index < index){index = sel[i].index};
            };
            newLayer.moveBefore(app.project.activeItem.layer(index));
        };
    };
    function treeView2Resourcearray(selection)
    {
        if(selection.type == "node")
        {
            for(var i = 0; i < selection.items.length; i++)
            {
                treeView2Resourcearray(selection.items[i])
            };
        }
        else
        {
            resourceArray.push(new ResourceFile({name:selection.text}));
        }
    };
};
function guessGuideName(guideName)
{
    var introScreen = new ItemObject("comment","animHub_template_[IS]")
    if (introScreen.object != undefined)
    {
        var text = introScreen.object.layer(2).sourceText.value.toString().replace(/\r/g," ");
        guideName.text = text;
    }
    else{reportCo
        de(10)}
}
function generateCTA1(guideName,progressBar)
{
    var templateName = 'Call To Action';
    var commentTag = "animHub_template_[CTA]";
    var templateTag = '[CTA]';
    var saveName = "callToAction1.aep";
    var compArray = ["Call To Action","Youtube Layout"];
    generateTemplate(templateName,commentTag,templateTag,saveName,DropBoxPath.template.callToAction1,UriManager.template.callToAction1,true,true,false,compArray);
    var guideNameProp = new EgParameter("Guide Name",guideName,"textInput",templateName,undefined,undefined);
    guideNameProp.setEgValue();

    var progressBarProp = new EgParameter("Progress Bar",progressBar,"slider",templateName,undefined,undefined);
    progressBarProp.setEgValue();

    app.activeViewer.setActive();
    var layers = [];
    for(var i = 2; i <= app.project.activeItem.numLayers; i++)
    {
        var layer = app.project.activeItem.layer(i);
        layers.push(layer.index)
    };
    if(layers.length > 0)
    {
        var precomp = app.project.activeItem.layers.precompose(layers,"CTA background",true);
        precomp.comment = "animHub_temp_[CTA]";
    } else {return report(9)};
    var background = new EgParameter("Background Clip",precomp,"footage",templateName,undefined,undefined);
    background.setEgValue()
    app.project.activeItem.layer(precomp.name).enabled = false;
    app.project.activeItem.layer(precomp.name).shy = true;
    app.project.activeItem.hideShyLayers = true;
}