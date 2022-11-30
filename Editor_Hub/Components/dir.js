const homedir = require('os').homedir();
/*
    *EDITOR HUB SYSTEM PATHS
*/
const editorHub =
{
    root : editorHub_dir,
    folder :
    {
        components : `${homedir}/DOCUMENTS/Editor Hub/components`,
        jsonFiles : `${homedir}/DOCUMENTS/Editor Hub/jsonFiles`,
        templates : `${homedir}/DOCUMENTS/Editor Hub/templates`,
        resources : `${homedir}/DOCUMENTS/Editor Hub/resources`,
        styles : `${homedir}/DOCUMENTS/Editor Hub/styles`
    },
    component :
    {
        ui : `${homedir}/DOCUMENTS/Editor Hub/components/UI.js`,
        htmlBody : `${homedir}/DOCUMENTS/Editor Hub/components/editorHub_body.html`
    },
    jsonFiles :
    {
        localVersion : `${homedir}/DOCUMENTS/Editor Hub/jsonFiles/localVersion.json`
    },
    style :
    {
        base_style : `${homedir}/DOCUMENTS/Editor Hub/styles/base_style.css`,
        wp_style : `${homedir}/DOCUMENTS/Editor Hub/styles/wp_style.css`
    },
    appData : `${homedir}/AppData/Local/Editor Hub`
};
/*
    *ANIMATOR HUB SYSTEM PATHS
*/
const animHub =
{
    root : animHub_dir,
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
module.exports = {editorHub,animHub}