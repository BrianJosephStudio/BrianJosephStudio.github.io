function myScript(thisObj){
    function myScript_buildUI(thisObj){
        var hub = (thisObj instanceof Panel) ? thisObj : new Window("palette", "SC Animator Hub", undefined, {resizeable:true, closeButton: true});                          
            hub.main = hub.add ('group {preferredSize: [1200, 500], alignChildren: ["left","top"]}');
            hub.main.orientation = "column";
                hub.main.add('statictext{text:"Select a Workspace"}')
                hub.stubs = hub.main.add ('dropdownlist', undefined, ['Titles','Map Overviews','Agent Stats','Updates & Patch Notes']);
                hub.stubs.alignment = "fill";
                hub.tabGroup = hub.main.add ('group {alignment: ["fill","fill"], orientation: "stack"}');
                        //Mode Tabs
                        hub.tabs = [];
                        
                        // Topic Titles Tabbed Panel //********************************************************************************/

                            var titlesTabbedPanel = hub.tabs[0] = hub.tabGroup.add ('tabbedpanel');
                            //Topic Titles Tab //
                            var topicTitleTab = titlesTabbedPanel.add ('tab',undefined,'Topic Titles');
                            titlesTabbedPanel.selection = 0;
                            topicTitleTab.add ('panel {preferredSize: [-1, -10]}');
                            topicTitleTab.alignChildren = ['fill','fill'];
                                //Global Topic Reference
                                var GTRtools = topicTitleTab.add('panel',undefined,"Global Topic Reference");
                                GTRtools.orientation = "column";
                                GTRtools.alignChildren = "right";
                                    var openGTRgroup = GTRtools.add("group",undefined,"");
                                    openGTRgroup.orientation = "row";
                                        openGTRgroup.add ('statictext',undefined,"Open Global Topic Reference");
                                        var openGTR = openGTRgroup.add ('button',undefined,"Open");
                                    var titleResetGroup = GTRtools.add('group',undefined,"");
                                    titleResetGroup.alignment = "right";
                                    titleResetGroup.orientation = "row";
                                        titleResetGroup.add ('statictext',undefined,"Reset All Topic Titles To Default");
                                        var resetTitles = titleResetGroup.add ('button',undefined,"Reset");
                                        resetTitles.alignment = undefined, {resizeable:true, closeButton: true}
                                //Topic Title Screen
                                /*var topicTitlePanel = topicTitleTab.add('panel',undefined,'Topic Title Screen');
                                var topicTitleMenu = topicTitlePanel.add('dropdownlist',undefined,[gtrTitleArray])*/
                                //Topic Display
                                /*var topicDisplayPanel = topicTitleTab.add('panel',undefined,'Topic Display');
                                topicDisplayPanel.orientation = 'row';
                                topicDisplayPanel.alignChildren = 'right';
                                    var topicIdGroup1 = topicDisplayPanel.add('group');
                                        topicIdGroup1.orientation = 'column';
                                        topicIdGroup1.bounds = [25,0,100,50];
                                        topicIdGroup1.add('statictext',[0,5,110,35],'Choose Title Number');
                                        topicIdGroup1.add('statictext',[0,30,110,60],'Coming Up Visibility');
                                    var topicIdGroup2 = topicDisplayPanel.add('group');
                                        topicIdGroup2.orientation = 'column';
                                        topicIdGroup2.alignChildren = ['right','fill']
                                        var topicID = topicIdGroup2.add('dropdownlist',undefined,gtrTitleArray);
                                        topicID.selection = 0;
                                        topicID.bounds = [0,0,90,30]
                                        var cuVisibility = topicIdGroup2.add('dropdownlist',undefined,['Visible','Not Visible']);
                                        cuVisibility.bounds = [0,30,90,60]
                                        cuVisibility.selection = 0;
                                    var generateTopicDisplay = topicDisplayPanel.add('button',undefined,'Generate');
                                    generateTopicDisplay.alignment = ["right",'fill'];*/
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

                            // Map Overviews //**************************************************************************************/
                            hub.tabs[1] = hub.tabGroup.add ("group");
                                hub.tabs[1].add ('panel {preferredSize: [-1, -10]}');
                                hub.tabs[1].orientation = "column";
                                    //Map Overviews
                                    var mapOvPanel1 = hub.tabs[1].add('panel',undefined,'Map Overviews');
                                    mapOvPanel1.orientation = 'row';
                                        var mapOvGroup2 = mapOvPanel1.add('group');
                                        mapOvGroup2.orientation = 'column';
                                        //mapOvGroup2.alignChildren = ['fill','fill'];
                                        var mapOvScreenSpan = mapOvGroup2.add('statictext',undefined,'Map Aperture:')
                                        mapOvScreenSpan.bounds = [0,15,90,40];
                                        //mapOvScreenSpan.alignment = ['right','fill']
                                        var mapOvMenu1 = mapOvGroup2.add('dropdownlist',[0,40,90,70],mapsArray);
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
                                    var agentIconPanel1 = hub.tabs[1].add('panel',undefined,'Agent Icon');
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
                            hub.tabs[2] = hub.tabGroup.add ("group");
                                hub.tabs[2].add ('panel {preferredSize: [-1, -10]}');
                                hub.tabs[2].orientation = "column";
                                var agentStatspanel = hub.tabs[2].add("Panel",undefined,"Agent Stats Table");
                                agentStatspanel.orientation = "row";
                                agentStatspanel.alignment = "fill";
                                    var agentStatDropdown = agentStatspanel.add ("dropdownlist",undefined,(agentsArray));
                                    agentStatDropdown.selection = 0;
                                    agentStatDropdown.helpTip = "Select your Agent";
                                    var statCBgroup = agentStatspanel.add('group',undefined,'');
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
                                    var generateTable = agentStatspanel.add("button",undefined,"Generate");
                                    generateTable.alignment = ['fill','fill'];

                            //Patch notes //********************************************************************************************************/
                            hub.tabs[3] = hub.tabGroup.add ("group");
                                hub.tabs[3].add ('panel {preferredSize: [-1, -10]}');
                                hub.tabs[3].orientation = "column";
                                /*updateTabGroup = hub.tabs[3].add("group",undefined,"");
                                updateTabGroup.orientation = "row";
                                updateTabGroup.alignment = "right";
                                updateTabGroup.add ("statictext",undefined,"Current Version: "+currentVersion);
                                updateButton = updateTabGroup.add("button",undefined,"Search for Updates");*/
                                var patchNotes = hub.tabs[3].add("panel",undefined,"Patch Notes 2.1.0");
                                patchNotes.orientation = "column";
                                patchNotes.alignment = "fill";
                                    var patchNotesBody = patchNotes.add("staticText",undefined,patchNotesBodyText,{multiline:true,scrolling:true});
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
        generateMapB.onClick = function(){generateMap('Map Overviews.aep',UrlManager.template.mapOverviews,mapOvMenu1,mapOvTextbox1,mapOvCb1)};
        placeAgent.onClick = function(){generateAgentIcon(agentIconMenu1,agentIconMenu2,agentIconCheckbox1)};
        generateTopBannerButton.onClick = function(){generateTopBanner(topBannerMode,topBannerAgentMenu,topBannerGunMenu,topBannerAutoNaming,topBannerText,topBannerAttachedFloating,topBannerSide)};
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
