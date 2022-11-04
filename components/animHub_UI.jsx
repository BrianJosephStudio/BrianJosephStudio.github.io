function myScript(thisObj){
    function myScript_buildUI(thisObj){
        var hub = (thisObj instanceof Panel) ? thisObj : new Window("palette", "SC Animator Hub", undefined, {resizeable:true, closeButton: true});
        var bgColor = hub.graphics.newBrush(hub.graphics.BrushType.SOLID_COLOR,[0.138,0.138,0.138,1]);
            hub.graphics.backgroundColor = bgColor;
            hub.main = hub.add ('group {preferredSize: [1200, 500], alignChildren: ["left","top"]}');
            hub.main.orientation = "column";
                hub.main.header = hub.main.add('group'); hub.main.header.orientation = 'row';
                hub.main.header.add('image',[0,0,200,30],UIImagePaths.animHub_header);
                hub.main.header.add('image',[0,0,140,30],UIImagePaths.colorPalette);
                // WorkSpaces //*******************************************************************************************************/
                var workspaces = hub.main.add('group'); workspaces.orientation = 'row';
                    workspaces.projectUtil = workspaces.add('iconbutton',[0,0,70,30],projectUtilIcon,{style : 'toolbutton',toggle : true})
                        workspaces.projectUtil.value = true; workspaces.projectUtil.helpTip = 'Project Utilities';
                    workspaces.editingTools = workspaces.add('iconbutton',[0,0,70,30],editingToolsIcon,{style : 'toolbutton',toggle : true})
                        workspaces.editingTools.helpTip = 'Editing Tools';
                    workspaces.titles = workspaces.add('iconbutton',[0,0,70,30],titlesIcon,{style : 'toolbutton',toggle : true})
                        workspaces.titles.helpTip = 'Title Templates';
                    workspaces.mapOverviews = workspaces.add('iconbutton',[0,0,70,30],mapOverviewsIcon,{style : 'toolbutton',toggle : true})
                        workspaces.mapOverviews.helpTip = 'Map Overviews';
                    workspaces.agentTemplates = workspaces.add('iconbutton',[0,0,70,30],agentTemplatesIcon,{style : 'toolbutton',toggle : true})
                        workspaces.agentTemplates.helpTip = 'Agent Related templates';
                    workspaces.patchNotes = hub.main.header.add('iconbutton',[0,0,40,30],patchNotesIcon,{style : 'toolbutton',toggle : true})
                        workspaces.patchNotes.helpTip = 'Patch Notes';
                workspaces.array = [workspaces.projectUtil,workspaces.editingTools,workspaces.titles,workspaces.mapOverviews,workspaces.agentTemplates,workspaces.patchNotes];
                var separator = hub.main.add('panel {preferredSize: [-1, -10]}'); separator.alignment = ['fill','fill'];
                //*********************************************************************************************************************/
                hub.tabGroup = hub.main.add ('group {alignment: ["fill","fill"], orientation: "stack"}');
                        //Mode Tabs
                        hub.tabs = [];
                        // Project Utilities Workspace //******************************************************************************/
                        var projectUtil = hub.tabs[0] = hub.tabGroup.add('group'); projectUtil.orientation = 'row';
                        projectUtil.group1 = projectUtil.add('group'); projectUtil.group1.orientation = 'column';
                        projectUtil.group1.alignment = ["left","top"];
                        projectUtil.separator = projectUtil.add('panel',[0,0,-1,100]); projectUtil.separator.alignment = ['left','fill'];
                        projectUtil.group2 = projectUtil.add('group'); projectUtil.group2.orientation = 'column';
                        projectUtil.group2.alignment = ["fill","top"];
                        projectUtil.group2.group1 = projectUtil.group2.add("group"); projectUtil.group2.group1.orientation = 'column';

                        var resourcesTitle = projectUtil.group1.add('image',[0,0,81,18],resourcesTitleIcon);
                                resourcesTitle.alignment = ["left","bottom"];
                        var resourceTreeView = projectUtil.group1.add('treeview',[0,0,176,270]);
                                resourceTreeView.alignment = ["left","top"]
                        
                        projectUtil.group3 = projectUtil.group1.add('group'); projectUtil.group3.alignment = ["fill","fill"]
                        projectUtil.group3.orientation = 'row'
                        createItemTree(resourceTreeView,DropBoxPath.resources);
                        var importResourceButton = projectUtil.group3.add('iconButton',[0,0,88,27],importButtonIcon,{style: 'toolButton'});
                        importResourceButton.helpTip = 'Import resource to project';
                        var placeResourceButton = projectUtil.group3.add('iconButton',[0,0,88,27],placeButtonIcon,{style: 'toolButton'});
                        placeResourceButton.helpTip = "Place resource in active comp";

                        projectUtil.group4 = projectUtil.group2.group1.add("group");
                        projectUtil.panel1 = projectUtil.group4.add('panel',undefined,'File Types'); projectUtil.panel1.orientation = 'column'; projectUtil.panel1.alignment = ["fill","top"];
                        //projectUtil.panel1.graphics.backgroundColor = brush;
                        //Sort Target Buttons
                        projectUtil.panel1.group1 = projectUtil.panel1.add("group"); projectUtil.panel1.group1.orientation = 'row'; projectUtil.panel1.group1.alignment = ["fill","top"];
                        projectUtil.panel1.group2 = projectUtil.panel1.add("group"); projectUtil.panel1.group2.orientation = 'row'; projectUtil.panel1.group2.alignment = ["left","top"];
                        var compsButton = projectUtil.panel1.group1.add('iconbutton',[0,0,34,40],compsIcon,{style : 'toolbutton',toggle:true});
                                compsButton.value = true;
                                compsButton.helpTip = 'Compositions';
                        var linkedComps = projectUtil.panel1.group1.add('iconbutton',[0,0,34,40],linkedCompsIcon,{style:'toolbutton',toggle:true});
                                linkedComps.value = true;
                                linkedComps.helpTip = 'Dynamic Linked Comps';
                        var templatesButton = projectUtil.panel1.group1.add('iconbutton',[0,0,34,40],templatesIcon,{style:'toolbutton',toggle:true});
                                templatesButton.value = true;
                                templatesButton.helpTip = 'Animator Hub Templates';
                        var videoFilesButton = projectUtil.panel1.group1.add('iconbutton',[0,0,34,40],videoFilesIcon,{style:'toolbutton',toggle:true});
                                videoFilesButton.value = true;
                                videoFilesButton.helpTip = 'Video Files';
                        var imageFilesButton = projectUtil.panel1.group2.add('iconbutton',[0,0,34,40],imageFilesIcon,{style:'toolbutton',toggle:true});
                                imageFilesButton.value = true;
                                imageFilesButton.helpTip = 'Image Files';
                        var audioFilesButton = projectUtil.panel1.group2.add('iconbutton',[0,0,34,40],audioFilesIcon,{style:'toolbutton',toggle:true});
                                audioFilesButton.value = true;
                                audioFilesButton.helpTip = 'Audio Files';
                        var solidsButton = projectUtil.panel1.group2.add('iconbutton',[0,0,34,40],solidsIcon,{style:'toolbutton',toggle:true});
                                solidsButton.value = true;
                                solidsButton.helpTip = 'Solids';
                        var otherFilesButton = projectUtil.panel1.group2.add('iconbutton',[0,0,34,40],otherFilesIcon,{style:'toolbutton',toggle:true});
                                otherFilesButton.value = true;
                                otherFilesButton.helpTip = 'Other Files';
                        //
                        projectUtil.group5 = projectUtil.group2.group1.add('group',[0,0,500,40]); projectUtil.group5.orientation = 'row'; projectUtil.group5.alignment = 'left';
                        projectUtil.panel2 = projectUtil.group5.add('panel',[0,0,102,40],'Target Pool',{borderStyle:'raised'});
                            projectUtil.panel2.orientation = 'row'; projectUtil.panel2.alignment = 'left';
                        var targetPool = {};
                            targetPool.project = projectUtil.panel2.add('iconButton',[0,0,34,40],targetPoolProjectIcon,{style:'toolButton',toggle:true});
                                targetPool.project.value = true;
                                targetPool.project.helpTip = 'Sort Entire Project'; 
                            targetPool.onlySel = projectUtil.panel2.add('iconbutton',[0,0,34,40],targetPoolOnlySelIcon,{style:'toolButton',toggle:true});
                                targetPool.onlySel.helpTip = 'Sort Selection Only';
                            targetPool.excludeSel = projectUtil.panel2.add('iconbutton',[0,0,34,40],targetPoolExcludeSelIcon,{style:'toolButton',toggle:true});
                                targetPool.excludeSel.helpTip = 'Exclude Selection'
                        var rootFolderButton = projectUtil.group5.add('iconButton',[0,0,40,60],rootFolderIcon,{style : 'toolbutton',toggle : true})
                                rootFolderButton.value = true;
                                rootFolderButton.helpTip = 'Create Project Root Folder';
                        var sortFilesButton = projectUtil.group2.group1.add('iconbutton',[0,0,190,27],sortFilesButtonIcon,{style: 'toolButton'});
                        sortFilesButton.helpTip = 'Sort Project Files';
                        sortFilesButton.alignment = ['center','top'];

                        // Editing Tools Workspace //**********************************************************************************/
                            var editingTools = hub.tabs[1] = hub.tabGroup.add('group'); editingTools.orientation = 'row';
                            editingTools.leftGroup = editingTools.add('group'); editingTools.leftGroup.alignment = ['left','fill']; editingTools.leftGroup.orientation = 'column'
                                editingTools.leftGroup.add('image',[0,0,65,15],UIImagePaths.generalTab)
                                var waterMarkButton = editingTools.leftGroup.add('iconbutton',[0,0,55,55],waterMarkIcon); waterMarkButton.helpTip = "Place Watermark";

                            editingTools.separator = editingTools.add('panel',[0,0,-1,100]); editingTools.separator.alignment = ['left','fill'];
                            editingTools.rightGroup = editingTools.add('group'); editingTools.rightGroup. alignment = ['left','top']; editingTools.rightGroup.orientation = 'column';
                                editingTools.rightGroup.add('image',[0,0,180,15],UIImagePaths.blurModeTab);
                                var blurButtonGroup = editingTools.rightGroup.add('group'); blurButtonGroup.orientation = 'row'; blurButtonGroup.alignment = 'left'
                                    var blurBGButton = blurButtonGroup.add('iconbutton',[0,0,55,55],blurBackgroundIcon); blurBGButton.helpTip = "Blur background";
                                    var blurHighlightButton = blurButtonGroup.add('iconbutton',[0,0,55,55],blurHighlightIcon); blurHighlightButton.helpTip = "Blur Highlight";
                                    var blurItButton = blurButtonGroup.add('iconbutton',[0,0,55,55],blurItIcon); blurItButton.helpTip = "Blur Shape";
                                editingTools.rightGroup.add('image',[0,0,180,15],UIImagePaths.clipModeTab);
                                var clipModeButtonGroup = editingTools.rightGroup.add('group'); clipModeButtonGroup.alignment = 'left'; clipModeButtonGroup.orientation = 'row';
                                    var vodModeButton = clipModeButtonGroup.add('iconbutton',[0,0,55,55],vodModeIcon);vodModeButton.helpTip = "VoD Mode";
                                    //var splitScreenButton = clipModeButtonGroup.add('iconbutton',[0,0,55,55],splitScreenIcon); splitScreenButton.helpTip = "Split Screen";

                                //editingTools.rightGroup.add('image',[0,0,180,15],UIImagePaths.materialsTab);
                                //var materialsButtonGroup = editingTools.rightGroup.add('group'); materialsButtonGroup.alignment = 'left'; materialsButtonGroup.orientation = 'row';
                            
                        // Topic Titles Tabbed Panel //********************************************************************************/

                            var titlesTabbedPanel = hub.tabs[2] = hub.tabGroup.add ('tabbedpanel',[0,0,300,400]);
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
                                        //Intro Screen
                                        var introPanel = introOutroTab.add('panel',undefined,'Intro Screen');
                                        introPanel.orientation = 'row';
                                            var introScreenButton = introPanel.add('button',undefined,'Place Intro Screen');
                                            introScreenButton.alignment = ['fill','fill'];
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
                                // Content Creator Tag tab //
                                var tagTab = titlesTabbedPanel.add('tab',undefined,'Creator Tags');
                                tagTab.add ('panel {preferredSize: [-1, -10]}');
                                    var cctPanel = tagTab.add('panel',[0,0,300,150],'Content Creator Tag');
                                    cctPanel.orientation = 'row';
                                    cctPanel.alignment = 'fill';
                                    cctPanel.alignChildren = ['fill','fill'];
                                        var ccMenu = cctPanel.add('dropdownlist',undefined,scData.contentCreator);
                                        ccMenu.selection = 0;
                                        var generateCCTButton = cctPanel.add('button',undefined,'Place');

                            // Map Overviews //**************************************************************************************/
                            var mapOverviews = hub.tabs[3] = hub.tabGroup.add ("group");
                                mapOverviews.add ('panel {preferredSize: [-1, -10]}');
                                mapOverviews.orientation = "column";
                                mapOverviews.alignChildren = ['fill','top'];
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
                                        generateMapB.alignment = ['right','fill'];
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
                            var agentStats = hub.tabs[4] = hub.tabGroup.add ("group");
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
                            var patchNotes = hub.tabs[5] = hub.tabGroup.add ("group");
                                patchNotes.add ('panel {preferredSize: [-1, -10]}');
                                patchNotes.orientation = "column";
                                var patchNotesPanel = patchNotes.add("panel");
                                patchNotesPanel.orientation = "column";
                                patchNotesPanel.alignment = "fill";
                                    var patchNotesBody = patchNotesPanel.add("editText",undefined,patchNotesBodyText,{multiline:true,scrolling:true});
                                    patchNotesBody.onChange = function(){patchNotesBody.text = patchNotesBodyText};
                                    patchNotesBody.alignment = "fill";
                                    patchNotesBody.preferredSize = [350,300];
                        //
            for (var i = 0; i < hub.tabs.length; i++)
            {
                //hub.tabs[i].orientation = 'column';
                //hub.tabs[i].alignChildren = 'fill';
                hub.tabs[i].alignment = ['fill','fill'];
                hub.tabs[i].visible = false;
            }
            hub.tabs[0].visible = true;
            hub.tabs[0]
            // Callback Handlers //*****************************************************************************************************/
            workspaces.projectUtil.onClick = function(){showTab(workspaces.array,0)}
            workspaces.editingTools.onClick = function(){showTab(workspaces.array,1)}
            workspaces.titles.onClick = function(){showTab(workspaces.array,2)}
            workspaces.mapOverviews.onClick = function(){showTab(workspaces.array,3)}
            workspaces.agentTemplates.onClick = function(){showTab(workspaces.array,4)}
            workspaces.patchNotes.onClick = function(){showTab(workspaces.array,5)}
            topBannerMode.onChange = function(){showMode()};
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
            targetPool.project.onClick = function(){targetPoolSel(targetPool.project)};
            targetPool.onlySel.onClick = function(){targetPoolSel(targetPool.onlySel)};
            targetPool.excludeSel.onClick = function(){targetPoolSel(targetPool.excludeSel)};
            compsButton.onClick = function(){fileTypeModifier(compsButton,compsButton,linkedComps,templatesButton,videoFilesButton,imageFilesButton,audioFilesButton,solidsButton,otherFilesButton)}
            linkedComps.onClick = function(){fileTypeModifier(linkedComps,compsButton,linkedComps,templatesButton,videoFilesButton,imageFilesButton,audioFilesButton,solidsButton,otherFilesButton)}
            templatesButton.onClick = function(){fileTypeModifier(templatesButton,compsButton,linkedComps,templatesButton,videoFilesButton,imageFilesButton,audioFilesButton,solidsButton,otherFilesButton)}
            videoFilesButton.onClick = function(){fileTypeModifier(videoFilesButton,compsButton,linkedComps,templatesButton,videoFilesButton,imageFilesButton,audioFilesButton,solidsButton,otherFilesButton)}
            imageFilesButton.onClick = function(){fileTypeModifier(imageFilesButton,compsButton,linkedComps,templatesButton,videoFilesButton,imageFilesButton,audioFilesButton,solidsButton,otherFilesButton)}
            audioFilesButton.onClick = function(){fileTypeModifier(audioFilesButton,compsButton,linkedComps,templatesButton,videoFilesButton,imageFilesButton,audioFilesButton,solidsButton,otherFilesButton)}
            solidsButton.onClick = function(){fileTypeModifier(solidsButton,compsButton,linkedComps,templatesButton,videoFilesButton,imageFilesButton,audioFilesButton,solidsButton,otherFilesButton)}
            otherFilesButton.onClick = function(){fileTypeModifier(otherFilesButton,compsButton,linkedComps,templatesButton,videoFilesButton,imageFilesButton,audioFilesButton,solidsButton,otherFilesButton)}
            //UI Functions //**********************************************************************************************************/
            function showTab(buttonArray,buttonNumber)
            {    
                if(buttonArray[buttonNumber].value == false){buttonArray[buttonNumber].value = true};
                for(var i = 0; i < buttonArray.length;i++)
                {
                    if (i == buttonNumber){continue};
                    buttonArray[i].value = false;
                }
                for (var i = 0; i < hub.tabs.length; i++) {
                        hub.tabs[i].visible = false;
                    }
                    hub.tabs[buttonNumber].visible = true;
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
            function targetPoolSel(button)
            {
                targets = [targetPool.project,targetPool.onlySel,targetPool.excludeSel];
                for(var i = 0 ; i < targets.length; i++)
                {
                    if (targets[i] == button){continue};
                    targets[i].value = false
                };
                if(targetPool.project.value == false && targetPool.onlySel.value == false && targetPool.excludeSel.value == false)
                {
                    targetPool.project.value = true
                }
            }
            function fileTypeModifier(button,compsButton,linkedComps,templatesButton,videoFilesButton,imageFilesButton,audioFilesButton,solidsButton,otherFilesButton)
            {
                var buttons = [compsButton,linkedComps,templatesButton,videoFilesButton,imageFilesButton,audioFilesButton,solidsButton,otherFilesButton];
                if(ScriptUI.environment.keyboardState.altKey == true)
                {
                    for (var i = 0; i < buttons.length; i++)
                    {
                        if(buttons[i] == button){continue};
                        buttons[i].value = false;
                    };
                    button.value = true;
                }
                else if(ScriptUI.environment.keyboardState.ctrlKey == true)
                {
                    for (var i = 0; i < buttons.length; i++)
                    {
                        if(buttons[i] == button){continue};
                        buttons[i].value = true;
                    };
                    button.value = true;
                }
            }
            function createItemTree(treeView,resourcePaths)
            {
                for(var prop in resourcePaths)
                {
                    if(typeof(resourcePaths[prop]) == "string")
                    {
                        var path = resourcePaths[prop]
                        var fileName =  path.split("/");
                        var itemName = fileName[fileName.length-1];
                        var itemList = treeView.add("item",itemName);
                        var itemIcon = File("~/documents/animator hub/resources/animHubUI/item icons/"+ itemName.split(".")[0] + ".png");
                        if(itemIcon.exists == true)
                        {
                            itemList.image = itemIcon;
                        }
                        else if(itemName.slice(-3,itemName.length) == "mp4" || itemName.slice(-3,itemName.length) == "mov")
                        {
                            itemList.image = UIImagePaths.listItemIcons.videoFiles_icon
                        }
                        //itemList.resource = new ResourceFile({name:itemName});
                    }
                    else
                    {
                        var nodeName = prop.slice(0,1).toUpperCase() + prop.slice(1,prop.length);
                        var itemList = treeView.add('node',nodeName);
                        itemList.image = UIImagePaths.listItemIcons.folder_icon
                        createItemTree(itemList,resourcePaths[prop]);
                    }
                }
            }
            
            //*************************************************************************************************************************/
        hub.onShow = function () {
            hub.tabs[0].visible = true;
            topBannerMode.selection = 0;
            //showMode();
        };
        // Functionality //************************************************************************************************************/
        resetTitles.onClick = function() {resetTopicTitles()};
        openGTR.onClick = function () {goToGTR()};
        generateMapB.onClick = function(){generateMap('Map Overviews.aep',UrlManager.template.mapOverviews,UriManager.template.mapOverviews,mapOvMenu1,mapOvTextbox1,mapOvCb1)};
        placeAgent.onClick = function(){generateAgentIcon(agentIconMenu1,agentIconMenu2,agentIconCheckbox1)};
        generateTopBannerButton.onClick = function(){generateTopBanner(topBannerMode,topBannerAgentMenu,topBannerGunMenu,topBannerAutoNaming,topBannerText,topBannerAttachedFloating,topBannerSide)};
        generateTable.onClick = function(){generateAgentStatsTable(rsCB,wrCB,prCB,msCB,agentStatDropdown)}
        introScreenButton.onClick = function(){placeIntroScreen()}
        outroScreenButton.onClick = function(){placeOutroScreen(outroScreenManagement,outroScreenContentCreator,outroScreenVoiceOver,outroScreenArtDirection,outroScreenPiecer,outroScreenEditor)};
        topicTitleButton.onClick = function(){generateTopicTitle(titleTextBox,styleMenu,topicID)};
        generateTopicDisplayButton.onClick = function(){generateTopicDisplay(topicID)};
        declareTitleButton.onClick = function(){declareTitle(titleTextBox,topicID)};
        blurBGButton.onClick = function(){blurBackground(true,true)};
        vodModeButton.onClick = function(){vodMode()}
        blurHighlightButton.onClick = function(){blurHighlight()}
        generateCCTButton.onClick = function(){generateCCT(ccMenu)}
        blurItButton.onClick = function(){blurIt()};
        sortFilesButton.onClick = function(){app.beginUndoGroup('Sort Files');sortFiles(
            compsButton.value,linkedComps.value,
            templatesButton.value,
            videoFilesButton.value,
            imageFilesButton.value,
            audioFilesButton.value,
            solidsButton.value,
            otherFilesButton.value,
            targetPool.project.value,
            targetPool.onlySel.value,
            targetPool.excludeSel.value,
            rootFolderButton.value
            ); app.endUndoGroup()}
        waterMarkButton.onClick = function(){placeWaterMark()}
        importResourceButton.onClick = function(){resolveResource(resourceTreeView.selection,false)}
        placeResourceButton.onClick = function(){resolveResource(resourceTreeView.selection,true)}
        /******************************************************************************************************************************/                    
        hub.layout.layout(true);
        return hub;
    }
    var myScriptPal = myScript_buildUI(thisObj); 
    if (myScriptPal != null && myScriptPal instanceof Window){
        myScriptPal.center();
        myScriptPal.show();
    }
}
