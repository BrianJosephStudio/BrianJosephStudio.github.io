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
    let bodyContent = readFileSync(dir.editorHub.component.htmlBody,{encoding:'utf-8'});
    let body = document.getElementById('editorHub');
    body.innerHTML = bodyContent;
}
function change_wpTab(event)
{
    var wp_tabs = document.getElementsByClassName("wp_tab")
    for(var i = 0; i < wp_tabs.length; i++)
    {
        wp_tabs[i].firstElementChild.className = wp_tabs[i].firstElementChild.className.replace("_active","")
    }

    event.currentTarget.firstElementChild.className += "_active";
    var wp_panels = document.getElementsByClassName("wp_container");
    for (var i = 0; i < wp_panels.length; i++)
    {
        wp_panels[i].style.display = "none";
    }
    var buttonName  = event.currentTarget.firstElementChild.className;
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