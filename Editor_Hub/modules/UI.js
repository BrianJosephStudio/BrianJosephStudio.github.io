const { readFileSync } = require('fs')
const trackList = require(global.dir.editorHub.module.audioTools.trackList)

async function buildUI()
{
    //CONSTRUCT HTML HEAD
        //Create head elements
        let charset = document.createElement('meta');
        charset.setAttribute('charset','utf-8');
        /* Import Base Global Styles */
        let base_style = document.createElement('link')
        base_style.setAttribute('id','base_style')
        base_style.setAttribute('rel','stylesheet')
        base_style.setAttribute('href',dir.editorHub.style.base_style)
        /* Import Workspace Layout Styles */
        let wp_style = document.createElement('link')
        wp_style.setAttribute('id','wp_style')
        wp_style.setAttribute('rel','stylesheet')
        wp_style.setAttribute('href',dir.editorHub.style.wp_style)
        /* Import Audio Tools Workspace Styles */
        let audioTools_style = document.createElement('link')
        audioTools_style.setAttribute('id','audioTools_style')
        audioTools_style.setAttribute('rel','stylesheet')
        audioTools_style.setAttribute('href',dir.editorHub.style.audioTools_style)
        /* Import Patch Notes Styles */
        let patchNotes_style = document.createElement('link')
        patchNotes_style.setAttribute('id', 'patchNotes_style')
        patchNotes_style.setAttribute('rel','stylesheet')
        patchNotes_style.setAttribute('href',dir.editorHub.style.patchNotes_style)
        /* Import footageManager Styles */
        let footageManager_style = document.createElement('link')
        footageManager_style.setAttribute('id', 'footageManager_style')
        footageManager_style.setAttribute('rel','stylesheet')
        footageManager_style.setAttribute('href',dir.editorHub.style.footageManager_style)
        //Append head elements to head
        let headElement = document.getElementsByTagName('head')[0];
        headElement.appendChild(charset)
        headElement.appendChild(base_style)
        headElement.appendChild(wp_style)
        headElement.appendChild(audioTools_style)
        headElement.appendChild(patchNotes_style)
        headElement.appendChild(footageManager_style)
    //CREATE HTML BODY
    let bodyContent = readFileSync(dir.editorHub.module.htmlBody,{encoding:'utf-8'});
    let body = document.getElementById('editorHub');
    body.innerHTML = bodyContent;

    // AUDIO TOOLS WORKSPACE
        //POPULATE TRACKLIST
        await createTrackList()
        .catch(e => global.hubException(e))
}
function change_wpTab(event)
{
    //Reset all classes to inactive
    var wp_tabs = document.getElementsByClassName("wp_tab")
    for(var i = 0; i < wp_tabs.length; i++)
    {
        let tab = wp_tabs[i].getElementsByTagName('div')[1]
        tab.classList.remove(`${tab.classList[1]}_active`)

        wp_tabs[i].getElementsByTagName('div')[0].classList.remove('select_glow_active')
    }
    let targetElem = event.currentTarget.getElementsByTagName('div')
    targetElem[1].classList.add(`${targetElem[1].classList[1]}_active`)
    targetElem[0].classList.add('select_glow_active');

    //Make all containers invisible
    var wp_panels = document.getElementsByClassName("wp_container");
    for (var i = 0; i < wp_panels.length; i++)
    {
        wp_panels[i].style.display = "none";
    }
    //Set the active panel visible
    var buttonName  = event.currentTarget.getElementsByTagName('div')[1].classList;
    for(var i = 0; i < wp_panels.length; i++)
    { 
        var panelName = wp_panels[i].id;
        if(panelName.split("_")[1] == buttonName[1])
        {
            wp_panels[i].style.display = "block";
            break;
        }
    }
};
async function createTrackList()
{
    await trackList.populateTrackList()
    .then(elementArray =>
        {
            let trackListDiv = document.getElementById('trackListDiv');
            for(var element of elementArray)
            {
                trackListDiv.appendChild(element)
            }
        })
    .catch(e => global.hubException(e))
}
function handleClick(event,tutorial,callback){
    if (event.getModifierState('Alt')){
        cep.util.openURLInDefaultBrowser(tutorial)
    }
    else{
        callback()
    }
}
function itemSelection(event,multiSelect,active,inactive)
{
    document.getSelection().removeAllRanges();
    event.currentTarget.focus()
    let itemList = event.currentTarget.parentElement.children;
    // NO KEY MODIFIERS
    if (!event.getModifierState("Control") && !event.getModifierState("Shift") || multiSelect == false)
    {
        for (let item of itemList)
        {
            item.className = inactive
        };
        event.currentTarget.className = active
    };
    // KEY MODIFIERS
    if(multiSelect == true && event.getModifierState("Shift"))
    {
        let activeTracks = [];
        let trackListArray = Array.from(itemList);
        for(let item of itemList)
        {
            if(item.className.split('_').length <= 1){continue}
            activeTracks.push(trackListArray.indexOf(item))
        }
        let currentIndex = trackListArray.indexOf(event.currentTarget)
        if(activeTracks.length > 0)
        {
            let target1,target2;
            if(currentIndex < activeTracks[0]){target1 = currentIndex; target2 = activeTracks[0]}
            else if(currentIndex > activeTracks[0] && currentIndex < activeTracks[activeTracks.length -1]){target1 = activeTracks[0]; target2 = currentIndex}
            else if(currentIndex > activeTracks[activeTracks.length -1]){target1 = activeTracks[activeTracks.length -1];target2 = currentIndex}
            for(let i = 0; i < itemList.length; i++)
            {
                if (trackListArray.indexOf(itemList[i]) >= target1 && trackListArray.indexOf(itemList[i]) <= target2)
                {
                    itemList[i].className = active
                }
            }
        };
    }
    else if(multiSelect == true && event.getModifierState("Control"))
    {
        if(event.currentTarget.className.split('_').length <= 1){event.currentTarget.className = active}
        else {event.currentTarget.className = inactive}
    };
    event.cancelBubble = true;
    event.stopPropagation();
};
function deselectAll(event,inactive)
{
    let itemList = event.currentTarget.children;
    for (let item of itemList)
        {
            item.className = inactive
        };
}
module.exports = {buildUI,change_wpTab,itemSelection,deselectAll,handleClick}
