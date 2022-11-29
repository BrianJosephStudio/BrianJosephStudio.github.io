Component = function()
{
    this.initializer =
    {
        saveName : "animHub_Initializer.jsx",
        name:"animHub_Initializer",
        url:"https://brianjosephstudio.github.io/Animator_Hub/components/animHub_Initializer.jsx",
        uri:"~/DOCUMENTS/Animator Hub/Components/animHub_Initializer.jsx",
        resolveIt: function(){return searchComponent(this.url,this.uri)},
        updateIt: function(){return searchUpdateComponent(this.url,this.uri)},
        valid : function(){return valid(this.uri);}
    }
};
/*************************************************************************************************/
function primitiveAlert(codeNumber)
{
    var alertList = 
    [
        "File Object is not valid in function 'includeComponent()'. Alert(0)",
        "something failed while trying to download components in function 'downloadComponent()'.",
        "something failed while trying to execute function 'resolveLocalDir()'.",
        "Something went wrong when trying to check for updates in function 'isUpdated()'. Check your internet connection.",
        "Initializer is missing on this device and need to be downloaded, the Animator Hub can't run until an internet connection is established.",
        "There are missing components on this device and it's adviced not to use the Animator Hub even if it opens, as it may cause run errors.",
        "There are missing components on this device and there's no internet connection. The Animator Hub will not open."

    ]
    var messageTag = 'Animator Hub:\n\n    ';
    return alert(messageTag+alertList[codeNumber])
};
/*************************************************************************************************/
function resolveLocalDir()
{
    function ensureFolder(uri)
    {
        var mainFolder = new Folder(uri);
        if(mainFolder.exists==false)
        {
            if(mainFolder.create()==false){return false};
        }
        return true
    };
    if(
        ensureFolder("~/DOCUMENTS/Animator Hub/Components") == false ||
        ensureFolder("~/DOCUMENTS/Animator Hub/Templates") == false ||
        ensureFolder("~/DOCUMENTS/Animator Hub/Json Files") == false ||
        ensureFolder("~/DOCUMENTS/Animator Hub/Resources") == false
    )
    {return primitiveAlert(2)};
};
/*Returns true if the file exists.****************************************************************/
function valid(uri)
{
    var newFile = new File(uri);
    return newFile.exists
};
/*************************************************************************************************/
function latestVersionCheck()
{
    //return true
    var latestVersion = system.callSystem('curl -s --max-time 5 "https://brianjosephstudio.github.io/Animator_Hub/jsonFiles/versionCheck.txt"');
    try
    {
        return latestVersion;
    } catch(e){return undefined}
};
/*************************************************************************************************/
function downloadComponent(url,uri)
{
    var componentContent = system.callSystem("curl -s  --max-time 5 "+url);
    var component = new File(uri);
    component.open('w');
    component.write(componentContent);
    component.close();
    return true
};
/*Returns a File Object.**************************************************************************/
function searchComponent(url,uri)
{
    var newFile = new File(uri);
    if(newFile.exists == false)
    {
        var myDownload = downloadComponent(url,uri);
        if(myDownload==true) {return true}
        else{primitiveAlert(1);return false;} 
    }
    else {return true};
};
function searchUpdateComponent(url,uri)
{
    var myDownload = downloadComponent(url,uri);
    if(myDownload==true) {return true}
    else{primitiveAlert(1);return false}
}
/************************************************************************************************/
var hubComponents = new Component();
resolveLocalDir();
var myInit = hubComponents.initializer.resolveIt();
var latestVersion = latestVersionCheck();
if(myInit==false){primitiveAlert(4)}
else
{
    eval("#include '"+hubComponents.initializer.uri+"'");
    {initializeHub(this)};
};