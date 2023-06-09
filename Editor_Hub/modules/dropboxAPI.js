const { readFile, writeFile } = require("fs/promises");

const refreshToken = "URftscBcTpAAAAAAAAAAAWlpxlguHizvvF7xZd2aqYb4W9D9Xfp01QrBdayJIGpv";
async function generateToken(refreshToken)
{
    return await fetch(`https://api.dropbox.com/oauth2/token`,
    {
        method: "post",
        body: new URLSearchParams(
        {
            grant_type:"refresh_token",
            refresh_token: refreshToken,
            client_id: "ezvsqb5qklsy5h5",
            client_secret:"j5e4s5njjdpb8hl"
        })
    })
    .then(res => res.json())
    .then(json => {return JSON.stringify(json)})
};
async function AccessToken()
{
    await generateToken(refreshToken)
    .then(async accTk => {
        await writeFile(global.dir.editorHub.jsonFiles.accTk,accTk)
    })
    .catch(e => global.hubException(e))
};
async function download(uri,dropboxPath)
{
    return await readFile(global.dir.editorHub.jsonFiles.accTk,{encoding:'utf-8'})
    .then(async accTk => 
        {
            accTk = JSON.parse(accTk).access_token
            await fetch('https://content.dropboxapi.com/2/files/download',
                {
                    method: 'post',
                    headers: {
                        Authorization: `Bearer ${accTk}`,
                        "Dropbox-API-Arg" : `{"path":"${dropboxPath}"}`
                    },
                }
            )
            .then(res => res.arrayBuffer())
            .then(ab => Buffer.from(ab))
            .then(async file => 
                {
                    await writeFile(uri,file,null)
                })
             .catch(e => global.hubException(e))
        }
    )
}
/* Returns a readable stream */
async function streamAudio(dropboxPath){
    return await readFile(global.dir.editorHub.jsonFiles.accTk,{encoding:'utf-8'})
    .then(async accTk => 
        {
            accTk = JSON.parse(accTk).access_token
            return await fetch('https://content.dropboxapi.com/2/files/download',
                {
                    method: 'post',
                    headers: {
                        Authorization: `Bearer ${accTk}`,
                        "Dropbox-API-Arg" : `{"path":"${dropboxPath}"}`
                    },
                }
            )
            .then(res => {return res.body})
            .catch(e => global.hubException(e))
        }
    )
}
/**
 * 
 * @param {*} dropboxPath The dropbox path for the target folder 
 * @returns A list of dropbox paths for all files in the target folder
 */
async function getFiles(dropboxPath)
{
    return await readFile(global.dir.editorHub.jsonFiles.accTk,{encoding:'utf-8'})
    .then(content => JSON.parse(content))
    .then(json => json.access_token)
    .then(async accTk =>
        {
            return await fetch('https://api.dropboxapi.com/2/files/list_folder',
            {
                method:'post',
                headers:
                {
                    Authorization : `Bearer ${accTk}`,
                    "Content-Type" : 'application/json'
                },
                body: JSON.stringify(
                    {
                        include_deleted : false,
                        include_has_explicit_shared_members : false,
                        include_media_info : false,
                        include_mounted_folders : true,
                        include_non_downloadable_files : false,
                        path: dropboxPath,
                        recursive: false
                    }
                )
            })
            .then(res => res.json())
            .then(json => 
                {
                    let pathArray = [];
                    for(let i = 0; i < json.entries.length; i++)
                    {
                        pathArray.push(json.entries[i].path_display)
                    }
                    pathArray.sort((a, b) => {
                        const fileNameA = a.split('/').pop();
                        const fileNameB = b.split('/').pop();
                        return fileNameA.localeCompare(fileNameB);
                      })
                    return pathArray
                })
            .catch(e => global.hubException(e))
        }
    )
    
}
const dropboxPath =
{
    editorHub :
    {
        folder :
        {
            modules : 
            {
                root : `/BrianJosephStudio.github.io/Editor_Hub/modules`,
                wp_audioTools : `/BrianJosephStudio.github.io/Editor_Hub/modules/wp_audioTools`,
                wp_footageManager : `/BrianJosephStudio.github.io/Editor_Hub/modules/wp_footageManager`,
                wp_patchNotes : `/BrianJosephStudio.github.io/Editor_Hub/modules/wp_footageManager`
            },
            jsonFiles : `/BrianJosephStudio.github.io/Editor_Hub/jsonFiles`,
            templates : `/BrianJosephStudio.github.io/Editor_Hub/templates`,
            resources : 
            {
                root : `/BrianJosephStudio.github.io/Editor_Hub/resources`,
                image : `/BrianJosephStudio.github.io/Editor_Hub/resources/image`,
                video : `/BrianJosephStudio.github.io/Editor_Hub/resources/video`,
                music : `/BrianJosephStudio.github.io/Editor_Hub/resources/music/music`,
                sfx : `/BrianJosephStudio.github.io/Editor_Hub/resources/sfx`,
                ui : `/BrianJosephStudio.github.io/Editor_Hub/resources/ui`
            },
            styles : `/BrianJosephStudio.github.io/Editor_Hub/modules/styles`
        }
    }
}
module.exports = {AccessToken,download,getFiles,streamAudio,dropboxPath}
// console.log(y.length);