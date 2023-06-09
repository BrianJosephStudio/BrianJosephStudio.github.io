const homedir = require('os').homedir().replace(/\\/g,'/');
/*
    *EDITOR HUB SYSTEM PATHS
*/
const editorHub =
{
    root : `${homedir}/DOCUMENTS/Editor Hub`,
    folder :
    {
        modules : 
        {
            root : `${homedir}/DOCUMENTS/Editor Hub/modules`,
            wp_audioTools : `${homedir}/DOCUMENTS/Editor Hub/modules/wp_audioTools`,
            wp_footageManager : `${homedir}/DOCUMENTS/Editor Hub/modules/wp_footageManager`,
            wp_patchNotes : `${homedir}/DOCUMENTS/Editor Hub/modules/wp_patchNotes`
        },
        jsonFiles : `${homedir}/DOCUMENTS/Editor Hub/jsonFiles`,
        templates : `${homedir}/DOCUMENTS/Editor Hub/templates`,
        resources : 
        {
            root : `${homedir}/DOCUMENTS/Editor Hub/resources`,
            image : `${homedir}/DOCUMENTS/Editor Hub/resources/image`,
            video : `${homedir}/DOCUMENTS/Editor Hub/resources/video`,
            music : `${homedir}/DOCUMENTS/Editor Hub/resources/music/music`,
            sfx : `${homedir}/DOCUMENTS/Editor Hub/resources/sfx`,
            ui : `${homedir}/DOCUMENTS/Editor Hub/resources/ui`
        },
        styles : `${homedir}/DOCUMENTS/Editor Hub/modules/styles`,
        appData : `${homedir}/AppData/Local/Editor Hub`
    },
    module :
    {
        ui : `${homedir}/DOCUMENTS/Editor Hub/modules/UI.js`,
        htmlBody : `${homedir}/DOCUMENTS/Editor Hub/modules/editorHub_body.html`,
        resourceAPI : `${homedir}/DOCUMENTS/Editor Hub/modules/resourceAPI.js`,
        resourceAPIjsx : `${homedir}/DOCUMENTS/Editor Hub/modules/resourceAPI.jsx`,
        dropboxAPI : `${homedir}/DOCUMENTS/Editor Hub/modules/dropboxAPI.js`,
        valAPI : `${homedir}/DOCUMENTS/Editor Hub/modules/valAPI.js`,
        resourceLibrary : `${homedir}/DOCUMENTS/Editor Hub/modules/resourceLibrary.js`,
        resourceUpdates : `${homedir}/DOCUMENTS/Editor Hub/modules/resourceUpdates.js`,
        audioTools :
            {
                trackList : `${homedir}/DOCUMENTS/Editor Hub/modules/wp_audioTools/trackList.js`
            },
        JSON : `${homedir}/DOCUMENTS/Editor Hub/modules/JSON.js`
    },
    jsonFiles :
    {
        localVersion : `${homedir}/DOCUMENTS/Editor Hub/jsonFiles/localVersion.json`,
        accTk : `${homedir}/DOCUMENTS/Editor Hub/jsonFiles/accTk.json`
    },
    style :
    {
        base_style : `${homedir}/DOCUMENTS/Editor Hub/modules/styles/base_styles.css`,
        wp_style : `${homedir}/DOCUMENTS/Editor Hub/modules/styles/wp_styles.css`,
        audioTools_style : `${homedir}/DOCUMENTS/Editor Hub/modules/wp_audioTools/audioTools_styles.css`,
        patchNotes_style: `${homedir}/DOCUMENTS/Editor Hub/modules/wp_PatchNotes/patchNotes_styles.css`,
        footageManager_style: `${homedir}/DOCUMENTS/Editor Hub/modules/wp_footageManager/footageManager_styles.css`
    },
    appData : {
        updateLogs : `${homedir}/AppData/Local/Editor Hub/updateLogs.json`
    }
};
/*
    *ANIMATOR HUB SYSTEM PATHS
*/
const animHub =
{
    root : `${homedir}/DOCUMENTS/Animator Hub`,
    folder :
    {
        components : `${homedir}/DOCUMENTS/Animator HUb/components`,
        templates : `${homedir}/DOCUMENTS/Animator HUb/templates`,
        resources : `${homedir}/DOCUMENTS/Animator HUb/resources`,
        jsonFiles : `${homedir}/DOCUMENTS/Animator HUb/jsonFiles`
    },
    localVersion : `${homedir}/DOCUMENTS/Animator HUb/jsonFiles/localVersion.txt`,
    appData : `${homedir}/AppData/Local/Animator Hub`
};
const tutorial = {
    editorHub : {
        songManager : 'https://youtu.be/iOiG81SkjSk'
    }
}
module.exports = {editorHub,animHub,tutorial}