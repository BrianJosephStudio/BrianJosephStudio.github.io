function myScript(thisObj){
    function myScript_buildUI(thisObj){
        var hub = (thisObj instanceof Panel) ? thisObj : new Window("palette", "SC Animator Hub", undefined, {resizeable:true, closeButton: true});
            hub.main = hub.add ('group {preferredSize: [1200, 500], alignChildren: ["left","top"]}');
            hub.main.orientation = "column";
                hub.main.add('statictext{text:"Select a Workspace"}')
                hub.stubs = hub.main.add ('dropdownlist', undefined, ['Editing Tools','Titles','Map Overviews','Agent Stats','Updates & Patch Notes']);
                hub.stubs.alignment = "fill";
                hub.tabGroup = hub.main.add ('group {alignment: ["fill","fill"], orientation: "stack"}');
                        //Mode Tabs
                        hub.tabs = [];
                        // Editing Tools Workspace //**********************************************************************************/
                            var editingTools = hub.tabs[0] = hub.tabGroup.add('group');
                            colorPalette = editingTools.add('image',undefined,colorPaletteBin)
                            var etGroup1 = editingTools.add('group'); etGroup1.alignChildren = ['fill','fill']; etGroup1.orientation = 'row';
                            var blurBGButton = etGroup1.add('button',undefined,'Blur Background');
                            var vodModeButton = etGroup1.add('button',undefined,'VoD Mode');
                            
                        // Topic Titles Tabbed Panel //********************************************************************************/

                            var titlesTabbedPanel = hub.tabs[1] = hub.tabGroup.add ('tabbedpanel');
                            //Topic Titles Tab //
                            var topicTitleTab = titlesTabbedPanel.add ('tab',undefined,'Topic Titles');
                            titlesTabbedPanel.selection = 0;
                            topicTitleTab.add ('panel {preferredSize: [-1, -10]}');
                            topicTitleTab.alignChildren = ['fill','fill'];
                                //Text Editor
                                //topicTitleTab.add('statictext',[0,5,110,35],'Target Title');
                                var titleMenuGroup = topicTitleTab.add('group');
                                titleMenuGroup.preferredWidth = 300;
                                titleMenuGroup.orientation = 'row';
                                titleMenuGroup.alignChildren = ["fill","fill"];
                                var topicID = titleMenuGroup.add('dropdownlist',[0,0,90,30],gtrTitleArray);
                                topicID.selection = 0;
                                var styleMenu = titleMenuGroup.add("dropdownlist",[90,0,180,30],["Default","Reversed"])
                                styleMenu.selection = 0;
                                var titleTextBox = topicTitleTab.add('edittext',[0,0,250,60],'Insert Title Text',{multiline : true});
                                    //Topic Title Screen
                                var titleOptionsGroup = topicTitleTab.add("group");
                                titleOptionsGroup.alignChildren = ["fill","fill"]; 
                                    var topicTitleButton = titleOptionsGroup.add('button',[0,0,150,30],'Generate Topic Title');
                                    //Topic Display
                                    var generateTopicDisplayButton = titleOptionsGroup.add('button',[150,0,300,30],'Generate Topic Display');
                                //Global Topic Reference
                                var GTRtools = topicTitleTab.add('group');
                                GTRtools.alignChildren = ['fill','fill'];
                                GTRtools.orientation = 'column';
                                var declareTitleButton = GTRtools.add('button',[0,0,300,30],'Declare Title')
                                var GTRtools2 = GTRtools.add('group')
                                GTRtools2.orientation = "row";
                                GTRtools2.alignChildren = ["fill","fill"];
                                        var openGTR = GTRtools2.add ('button',[0,0,150,30],"Open GTR");
                                        var resetTitles = GTRtools2.add ('button',[150,0,300,30],"Reset GTR Titles");
                                // Top Banner Tab //
                                var topBannerTab = titlesTabbedPanel.add ('tab',undefined,'Top Banner');
                                topBannerTab.add ('panel {preferredSize: [-1, -10]}');
                                topBannerTab.alignChildren = ['fill','top'];
                                    //Top Banner
                                    var topBannerPanel = topBannerTab.add('panel');
                                    topBannerPanel.orientation = 'row';
                                    topBannerPanel.alignChildren = ['fill','fill']
                                        var topBannerSettingsGroup = topBannerPanel.add('group');
                                        topBannerSettingsGroup.orientation = 'column';
                                        topBannerSettingsGroup.alignChildren = ['fill','fill'];
                                        topBannerSettingsGroup.add('statictext',[0,0,100,10],'Mode:');
                                        var topBannerMenuGroup = topBannerSettingsGroup.add('group');
                                        topBannerMenuGroup.orientation = 'row';
                                        var topBannerMode = topBannerMenuGroup.add('dropdownlist',[0,0,200,30],['Titles','Agents','Guns']);
                                        topBannerMode.selection = 0;
                                            var topBannerModeTabs = [];
                                            var topBannerAgentMenu = topBannerModeTabs[1];// = topBannerMenuGroup.add('dropdownlist',[0,0,-10,0],agentsArray);
                                            /*topBannerAgentMenu.visible = false;
                                            topBannerAgentMenu.selection = 0;*/
                                            var topBannerGunMenu = topBannerModeTabs[2];//= topBannerMenuGroup.add('dropdownlist',[0,0,-10,0],gunsArray);
                                            /*topBannerGunMenu.visible = false;
                                            topBannerGunMenu.selection = 0;*/
                                        var topBannerAutoNaming = topBannerSettingsGroup.add('checkbox',undefined,'Auto-Naming');
                                        var topBannerText = topBannerSettingsGroup.add('edittext',undefined,'Top Banner Text');
                                        var topBannerAttachedFloating = topBannerSettingsGroup.add('dropdownlist',undefined,['Attached','Floating']);
                                        topBannerAttachedFloating.selection = 0
                                        var topBannerSide = topBannerSettingsGroup.add('dropdownlist',undefined,['Left','Right']);
                                        topBannerSide.selection = 0;
                                        var generateTopBannerButton = topBannerPanel.add('button',undefined,'Generate');
                                    // Intro/Outro Tab //
                                    var introOutroTab = titlesTabbedPanel.add('tab',undefined,'Intro/Outro');
                                    introOutroTab.add('panel {preferredSize: [-1, -10]}');
                                    introOutroTab.alignChildren = ['fill','fill'];
                                        //Outro Screen
                                        var outroPanel = introOutroTab.add('panel',undefined,'Outro Screen');
                                        outroPanel.orientation = 'row';
                                            var outroScreenMenuGroup = outroPanel.add('group');
                                            outroScreenMenuGroup.orientation = 'column';
                                            outroScreenMenuGroup.alignChildren = 'right';
                                                var outroScreenMenu1 = outroScreenMenuGroup.add('group');
                                                outroScreenMenu1.orientation = 'row';
                                                    outroScreenMenu1.add('statictext',undefined,'Management');
                                                    var outroScreenManagement = outroScreenMenu1.add('dropdownlist',undefined,scData.management);
                                                    outroScreenManagement.selection = 0;
                                                var outroScreenMenu2 = outroScreenMenuGroup.add('group');
                                                outroScreenMenu2.orientation = 'row';
                                                    outroScreenMenu2.add('statictext',undefined,'Content Creator');
                                                    var outroScreenContentCreator = outroScreenMenu2.add('dropdownlist',undefined,scData.contentCreator);
                                                    outroScreenContentCreator.selection = 0;
                                                var outroScreenMenu3 = outroScreenMenuGroup.add('group');
                                                outroScreenMenu3.orientation = 'row';
                                                    outroScreenMenu3.add('statictext',undefined,'Voice-Over');
                                                    var outroScreenVoiceOver = outroScreenMenu3.add('dropdownlist',undefined,scData.voiceOver);
                                                    outroScreenVoiceOver.selection = 0;
                                                var outroScreenMenu4 = outroScreenMenuGroup.add('group');
                                                outroScreenMenu4.orientation = 'row';
                                                    outroScreenMenu4.add('statictext',undefined,'Art Direction');
                                                    var outroScreenArtDirection = outroScreenMenu4.add('dropdownlist',undefined,scData.artDirection);
                                                    outroScreenArtDirection.selection = 0;
                                                var outroScreenMenu5 = outroScreenMenuGroup.add('group');
                                                outroScreenMenu5.orientation = 'row';
                                                    outroScreenMenu5.add('statictext',undefined,'Piecer');
                                                    var outroScreenPiecer = outroScreenMenu5.add('dropdownlist',undefined,scData.piecer);
                                                    outroScreenPiecer.selection = 0;
                                                var outroScreenMenu6 = outroScreenMenuGroup.add('group');
                                                outroScreenMenu6.orientation = 'row';
                                                    outroScreenMenu6.add('statictext',undefined,'Editor');
                                                    var outroScreenEditor = outroScreenMenu6.add('dropdownlist',undefined,scData.editor);
                                                    outroScreenEditor.selection = 0;
                                            var outroScreenButton = outroPanel.add('button',undefined,'Place');
                                            outroScreenButton.alignment = ['fill','fill'];


                            // Map Overviews //**************************************************************************************/
                            var mapOverviews = hub.tabs[2] = hub.tabGroup.add ("group");
                                mapOverviews.add ('panel {preferredSize: [-1, -10]}');
                                mapOverviews.orientation = "column";
                                    //Map Overviews
                                    var mapOvPanel1 = mapOverviews.add('panel',undefined,'Map Overviews');
                                    mapOvPanel1.orientation = 'row';
                                        var mapOvGroup2 = mapOvPanel1.add('group');
                                        mapOvGroup2.orientation = 'column';
                                        //mapOvGroup2.alignChildren = ['fill','fill'];
                                        var mapOvScreenSpan = mapOvGroup2.add('statictext',undefined,'Map Aperture:')
                                        mapOvScreenSpan.bounds = [0,15,90,50];
                                        //mapOvScreenSpan.alignment = ['right','fill']
                                        var mapOvMenu1 = mapOvGroup2.add('dropdownlist',[0,40,100,70],mapsArray);
                                        mapOvMenu1.selection = 0;
                                        mapOvMenu1.alignment = 'fill';
                                        var mapOvGroup1 = mapOvPanel1.add('group');
                                        mapOvGroup1.orientation = 'column';
                                        mapOvGroup1.alignChildren = 'fill';
                                            var mapOvTextbox1 = mapOvGroup1.add('edittext',[0,0,110,30],'100');
                                            var mapOvCb1 = mapOvGroup1.add('checkbox',undefined,'Manage Footage');
                                            mapOvCb1.value = 1;
                                            mapOvCb1.bounds = [0,50,110,65];
                                        var generateMapB = mapOvPanel1.add('button',undefined,'Generate Map');
                                        generateMapB.alignment = 'fill';
                                    //Agent Icon
                                    var agentIconPanel1 = mapOverviews.add('panel',undefined,'Agent Icon');
                                    agentIconPanel1.orientation = 'row';
                                    agentIconPanel1.alignment = 'fill';
                                        var agentIconPanel1Group1 = agentIconPanel1.add('group');
                                        agentIconPanel1Group1.orientation = 'column';
                                            var agentIconMenu1 = agentIconPanel1Group1.add('dropdownlist',[0,0,150,30],agentIconArray);
                                            agentIconMenu1.selection = 0;
                                            var agentIconMenu2 = agentIconPanel1Group1.add('dropdownlist',[0,0,150,30],['Defender','Attacker']);
                                            agentIconMenu2.selection = 0;
                                        var agentIconCheckbox1 = agentIconPanel1.add('checkbox',undefined,'Death');
                                        var placeAgent = agentIconPanel1.add('button',[0,0,100,60],'Place Agent');
                                        placeAgent.alignment = ["right",'fill'];
                                
                            // Agents Stats //********************************************************************************************/
                            var agentStats = hub.tabs[3] = hub.tabGroup.add ("group");
                                agentStats.add ('panel {preferredSize: [-1, -10]}');
                                agentStats.orientation = "column";
                                var agentStatsPanel = agentStats.add("Panel",undefined,"Agent Stats Table");
                                agentStatsPanel.orientation = "row";
                                agentStatsPanel.alignment = "fill";
                                    var statCBgroup = agentStatsPanel.add('group',undefined,'');
                                    statCBgroup.orientation = "column";
                                    statCBgroup.alignChildren = "fill";
                                        var rsCB = statCBgroup.add('checkbox',undefined,'Sorted by Rank');
                                        rsCB.value = true;
                                        var wrCB = statCBgroup.add('checkbox',undefined,'Win Rate');
                                        wrCB.value = true;
                                        var prCB = statCBgroup.add('checkbox',undefined,'Pick Rate');
                                        prCB.value = true;
                                        prCB.location = [0,20];
                                        var msCB = statCBgroup.add('checkbox',undefined,'Sorted by Map');
                                    var statsGroup = agentStatsPanel.add("group");
                                    statsGroup.orientation = "column";
                                    statsGroup.alignment = ["fill","fill"];
                                    statsGroup.alignChildren = "fill";
                                    var agentStatDropdown = statsGroup.add ("dropdownlist",undefined,(agentsArray));
                                    agentStatDropdown.selection = 0;
                                    agentStatDropdown.helpTip = "Select your Agent";
                                    var generateTable = statsGroup.add("button",undefined,"Generate");
                                    generateTable.alignment = ['fill','fill'];

                            //Patch notes //********************************************************************************************************/
                            var patchNotes = hub.tabs[4] = hub.tabGroup.add ("group");
                                patchNotes.add ('panel {preferredSize: [-1, -10]}');
                                patchNotes.orientation = "column";
                                /*updateTabGroup = patchNotes.add("group",undefined,"");
                                updateTabGroup.orientation = "row";
                                updateTabGroup.alignment = "right";
                                updateTabGroup.add ("statictext",undefined,"Current Version: "+currentVersion);
                                updateButton = updateTabGroup.add("button",undefined,"Search for Updates");*/
                                var patchNotesPanel = patchNotes.add("panel");
                                patchNotesPanel.orientation = "column";
                                patchNotesPanel.alignment = "fill";
                                    var patchNotesBody = patchNotesPanel.add("staticText",undefined,patchNotesBodyText,{multiline:true,scrolling:true});
                                    patchNotesBody.alignment = "left";
                                    patchNotesBody.preferredSize = [300,250];
                        //
            for (var i = 0; i < hub.tabs.length; i++) {
                hub.tabs[i].orientation = 'column';
                hub.tabs[i].alignChildren = 'fill';
                hub.tabs[i].alignment = ['fill','fill'];
                hub.tabs[i].visible = false;
            }
            //Layout Changes
            hub.stubs.onChange = showTab;
            topBannerMode.onChange = function(){showMode();};
            topBannerAutoNaming.onClick = autoNameCb;
            titlesTabbedPanel.onChange = function()
            {
                topBannerAgentMenu = topBannerModeTabs[1] = topBannerMenuGroup.add('dropdownlist',[0,0,0,0],agentsArray);
                topBannerAgentMenu.selection = 0;
                //topBannerAgentMenu.bounds = [0,0,0,0];
                topBannerAgentMenu.visible = false;
                topBannerGunMenu = topBannerModeTabs[2] = topBannerMenuGroup.add('dropdownlist',[0,0,0,0],gunsArray);
                topBannerGunMenu.selection = 0;
                //topBannerGunMenu.bounds = [0,0,0,0];
                topBannerGunMenu.visible = false;
                showMode();
            };
            //UI Functions //************************/
            function showTab () {
                if (hub.stubs.selection !== null) {
                    for (var i = hub.tabs.length-1; i >= 0; i--) {
                        hub.tabs[i].visible = false;
                    }
                    hub.tabs[hub.stubs.selection.index].visible = true;
                };
                if (titlesTabbedPanel.selection == null) {titlesTabbedPanel.selection = 0;}
            }
            function showMode()
            {
                try
                {
                    if (topBannerMode.selection !== null||topBannerMode.selection== null)
                    {
                        //for (var i= 1; i<topBannerModeTabs.length;i++)
                        {
                            //topBannerModeTabs[i].bounds = [0,0,0,0];
                            //topBannerModeTabs[i].visible = false;
                            //topBannerModeTabs[i].selection = 0;
                        }
                        topBannerAgentMenu.bounds = [0,0,0,0];
                        topBannerAgentMenu.visible = false;
                        topBannerGunMenu.bounds = [0,0,0,0];
                        topBannerGunMenu.visible = false;
                        if (topBannerMode.selection.index == 1)
                        {
                            topBannerMode.bounds = [0,0,100,30]
                            /*topBannerAgentMenu = topBannerModeTabs[1] = topBannerMenuGroup.add('dropdownlist',[0,0,0,0],agentsArray);
                            topBannerAgentMenu.selection = 0;*/
                            topBannerAgentMenu.bounds = [100,0,200,30];
                            topBannerAgentMenu.visible = true;
                            
                        }
                        else if(topBannerMode.selection.index == 2)
                        {
                            topBannerMode.bounds = [0,0,100,30]
                            /*topBannerGunMenu = topBannerModeTabs[2] = topBannerMenuGroup.add('dropdownlist',[0,0,0,0],gunsArray);
                            topBannerGunMenu.selection = 0;*/
                            topBannerGunMenu.bounds = [100,0,200,30];
                            topBannerGunMenu.visible = true;
                        }
                        else if (topBannerMode.selection.index==0)
                        {
                            topBannerMode.bounds = [0,0,200,30];
                            //topBannerAgentMenu = topBannerModeTabs[1] = topBannerMenuGroup.add('dropdownlist',[0,0,0,0],agentsArray);
                            //topBannerAgentMenu.selection = 0;
                            topBannerAgentMenu.bounds = [0,0,0,0];
                            topBannerAgentMenu.visible = false;
                            //topBannerGunMenu = topBannerModeTabs[2] = topBannerMenuGroup.add('dropdownlist',[0,0,0,0],gunsArray);
                            //topBannerGunMenu.selection = 0;
                            topBannerGunMenu.bounds = [0,0,0,0];
                            topBannerGunMenu.visible = false;
                            
                        };
                        

                    };
                } catch(e){return errorCode(10)}
            }
            function autoNameCb()
            {
                if(topBannerAutoNaming.value==false){topBannerText.enabled = true}
                else{topBannerText.enabled = false}
            }
        hub.onShow = function () {
            hub.stubs.selection = 0;
            topBannerMode.selection = 0;
            showTab();
            //showMode();
        };
        //Start Functionality
        resetTitles.onClick = function() {resetTopicTitles()};
        openGTR.onClick = function () {goToGTR()};
        //updateButton.onClick = function() {updateScript()};
        generateTable.onClick = function(){generateAgentStatsTable(rsCB,wrCB,prCB,msCB,agentStatDropdown)}
        generateMapB.onClick = function(){generateMap('Map Overviews.aep',UrlManager.template.mapOverviews,UriManager.template.mapOverviews,mapOvMenu1,mapOvTextbox1,mapOvCb1)};
        placeAgent.onClick = function(){generateAgentIcon(agentIconMenu1,agentIconMenu2,agentIconCheckbox1)};
        generateTopBannerButton.onClick = function(){generateTopBanner(topBannerMode,topBannerAgentMenu,topBannerGunMenu,topBannerAutoNaming,topBannerText,topBannerAttachedFloating,topBannerSide)};
        outroScreenButton.onClick = function(){placeOutroScreen(outroScreenManagement,outroScreenContentCreator,outroScreenVoiceOver,outroScreenArtDirection,outroScreenPiecer,outroScreenEditor)};
        topicTitleButton.onClick = function(){generateTopicTitle(titleTextBox,styleMenu,topicID)};
        generateTopicDisplayButton.onClick = function(){generateTopicDisplay(topicID)};
        declareTitleButton.onClick = function(){declareTitle(titleTextBox,topicID)};
        blurBGButton.onClick = function(){blurBackground(true,true)};
        vodModeButton.onClick = function(){vodMode()}
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
