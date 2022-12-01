const { readFileSync } = require('fs')
async function buildUI()
{
    //CONSTRUCT HTML HEAD
        //Create head elements
        let charset = document.createElement('meta');
        charset.setAttribute('charset','utf-8');

        let base_style = document.createElement('link')
        base_style.setAttribute('id','base_style')
        base_style.setAttribute('rel','stylesheet')
        base_style.setAttribute('href',dir.editorHub.style.base_style)
        
        let wp_style = document.createElement('link')
        wp_style.setAttribute('id','wp_style')
        wp_style.setAttribute('rel','stylesheet')
        wp_style.setAttribute('href',dir.editorHub.style.wp_style)
        //Append head elements to head
        let headElement = document.getElementsByTagName('head')[0];
        headElement.appendChild(charset)
        headElement.appendChild(base_style)
        headElement.appendChild(wp_style)
    //CREATE HTML BODY
    let bodyContent = readFileSync(dir.editorHub.module.htmlBody,{encoding:'utf-8'});
    let body = document.getElementById('editorHub');
    body.innerHTML = bodyContent;
}
function change_wpTab(event)
{
    //Reset all classes to inactive
    var wp_tabs = document.getElementsByClassName("wp_tab")
    for(var i = 0; i < wp_tabs.length; i++)
    {
        wp_tabs[i].getElementsByTagName('div')[1].className = wp_tabs[i].getElementsByTagName('div')[1].className.replace("_active","")

        wp_tabs[i].getElementsByTagName('div')[0].className = 'select_glow_inactive'
    }
    //Change style for selected button's icon
    event.currentTarget.getElementsByTagName('div')[1].className += "_active";
    event.currentTarget.getElementsByTagName('div')[0].className = 'select_glow_active';
    let tabWidth = event.currentTarget.style.width;
    let glowPos = event.currentTarget.getElementsByTagName('div')[1].getBoundingClientRect().left;
    let selectGlow = document.getElementsByClassName('select_glow')[0];
    selectGlow.style.left = `${glowPos - (tabWidth/2)}px`;

    //Make all containers invisible
    var wp_panels = document.getElementsByClassName("wp_container");
    for (var i = 0; i < wp_panels.length; i++)
    {
        wp_panels[i].style.display = "none";
    }
    //Set the active panel visible
    var buttonName  = event.currentTarget.getElementsByTagName('div')[1].className;
    for(var i = 0; i < wp_panels.length; i++)
    { 
        var panelName = wp_panels[i].id;
        if(panelName.split("_")[1] == buttonName.split("_")[1])
        {
            wp_panels[i].style.display = "block";
            break;
        }
    }
};
module.exports = {buildUI,change_wpTab}