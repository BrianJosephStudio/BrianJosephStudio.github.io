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
                                    patchNotes = hub.tabs[3].add("panel",undefined,"Patch Notes 1.2.3");
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