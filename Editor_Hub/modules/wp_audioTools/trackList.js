const dropbox = require(global.dir.editorHub.module.dropboxAPI);
const resourceAPI = require(global.dir.editorHub.module.resourceAPI);
async function populateTrackList()
{
    return await dropbox.AccessToken()
    .then(async () =>
        {
            return await dropbox.getFiles(dropbox.dropboxPath.editorHub.folder.resources.music)
        })
    .then(async trackList =>
        {
            let elementArray = [];
            for(var trackPath of trackList)
            {
                let res = await new resourceAPI.Resource(trackPath);
                let elem = document.createElement('div');
                elem.addEventListener('keydown',(event) =>
                {
                    if(event.code == 'Space')
                    {
                        previewTrack()
                    }
                })
                let content = document.createTextNode(res.saveName)
                elem.appendChild(content)
                elem.setAttribute('id',res.dropboxPath)
                elem.setAttribute('class','trackListItem')
                elem.setAttribute('onClick',"global.ui.itemSelection(event,false,'trackListItem_active','trackListItem')")
                elementArray.push(elem);
            };
            return elementArray;
        })
    .catch(e => global.hubException(e))
}
async function selectedtrack()
{
    let trackList = document.getElementById('trackListDiv');
    for(let item of trackList.children)
    {
        if (item.className.split('_').length > 1)
        {
            return item.id;
        }
    }
}
async function importTrack()
{
    let audioPlayer = document.getElementById('audioPlayer');
    let status = document.getElementById('statusAlert')
    status.textContent = 'Waiting...'
    let opacityLoop = setInterval(() => {
        let val = 0;
        if(status.style.opacity == 0){val = 1}
        status.style.opacity = val;
    },750)
    let activeItem = await selectedtrack()
    let resource = new resourceAPI.Resource(activeItem);
    await resourceAPI.importResource(resource,'dropbox').then(() => {if(audioPlayer.paused == false){audioPlayer.pause()}})
    clearInterval(opacityLoop)
    status.style.opacity = 0
    clearInterval(playInterval)
}
async function previewTrack()
{
    let activeItem = await selectedtrack()
    let resource = new resourceAPI.Resource(activeItem);
    let audioPlayer = document.getElementById('audioPlayer');
    let status = document.getElementById('statusAlert')
    status.textContent = 'Waiting...'
    let opacityLoop = setInterval(() => {
        let val = 0;
        if(status.style.opacity == 0){val = 1}
        status.style.opacity = val;
    },750)
    

    await resourceAPI.resolveResource(resource,'dropbox')
    .then(res => {
        let inter = 0;
        let playInterval = setInterval(() => {
        audioPlayer.src = resource.uri
        audioPlayer.play()
        inter++
        if(audioPlayer.paused == false || inter == 16)
        {
            clearInterval(opacityLoop)
            status.style.opacity = 0
            clearInterval(playInterval)
        }
        },500)
    })
}
async function getTrackList(){
    let output = []
    let elemCollection = document.getElementById("trackListDiv").children;
    for(elem in elemCollection){
        alert(elem.id)
        output.push(elem.id)
    }
}
module.exports = {populateTrackList,importTrack,previewTrack,getTrackList};