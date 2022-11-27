const homedir = require('os').homedir();
const dir = require(`${homedir}/Documents/Editor Hub/Components/dir.js`);
const localVersion = dir.editorHub.localVersion;
const errorCode = require('./errorCode.mjs');
/*
    *VERSION CHECK
*/
async function versionCheck(localVersion)
{
    const versionPrototype = JSON.stringify({currentVersion:'1.0.0'});
    var currentVersion;
    var latestVersion;
    await readFile(path,'utf-8')
        .then(result =>
            {
                currentVersion = JSON.parse(result);
            })
        .catch(error=>
            {
                writeFile(path,versionPrototype)
                .then(success=>
                    {
                        return readMyFile(path)
                    })
                .catch(err=>
                    {
                        errorCode(0)
                    })
            });
    var counter = 0;
    var cmd = spawn('cmd');
    cmd.stdout.on('data',(data)=> {
        counter++;
        if(counter==3)
        {
            latestVersion = data.toString('ascii');
        }
    })
    cmd.stderr.on('err',(err) => {alert(err)})
    cmd.stdin.write('curl "https://brianjosephstudio.github.io/jsonFiles/versionCheck.txt"\n')
    cmd.stdin.end();

    if(currentVersion == latestVersion){return dalse};
    return true;
}
versionCheck().then(requireUpdate => alert(requireUpdate))


var alertButton;
    alertButton = document.getElementById("testButton1");
alert(alertButton)
alertButton.addEventListener(placeTemplate)
alert('3')

function placeTemplate()
{
    var cmd = spawn('cmd',undefined,{cwd:dir.animHub.root})
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
}
alert('index.js')
async function hubInit()
{
    var myFile = path.resolve(editorHub_dir,'components/editorHub.html');
    await readFile(myFile)
    .then(data =>
        {
            var body = document.getElementById('editorHub');
            body.innerHTML = data;
        })
    .catch(e => alert(e));

};