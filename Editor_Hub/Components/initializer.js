const homedir = require('os').homedir();
const path = require('path');
const {readFile} = require('fs/promises')
global.dir = require(`${homedir}/Documents/Editor Hub/Components/dir.js`);
//const localVersion = dir.editorHub.localVersion;
//const errorCode = require('./errorCode.mjs');
/*
    *VERSION CHECK
*/

function placeTemplate()
{
    var cmd = spawn('cmd',undefined,{cwd:dir.editorHub.root})
        cmd.stdout.on('output',(output) =>
        {
            alert(output);
        });
        cmd.stderr.on('err',(err) =>
        {
            alert(err)
        });
    cmd.stdin.write(`curl -o "myTemplate.aep" "https://brianjosephstudio.github.io/templates/SC_Watermark.aep"\n`);
    cmd.stdin.end();
};
/*
    Workspace tab functions
*/
global.change_wpTab = (event) =>
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
}
async function hubInit()
{
    let myFile = path.resolve(editorHub_dir,'components/editorHub.html');
    await readFile(myFile,undefined,{encoding:'utf-8'})
        .then(data =>
            {
                var body = document.getElementById('editorHub');
                body.innerHTML = data;
            })
        .catch(e => {throw e});

};
hubInit().then(res =>
    {
        var alertButton;
        alertButton = document.getElementById("testButton1");
        alertButton.addEventListener(placeTemplate)
    })