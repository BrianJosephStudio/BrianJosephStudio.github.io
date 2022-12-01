const homedir = require('os').homedir();
/*
    *EDITOR HUB SYSTEM PATHS
*/
const editorHub =
{
    root : `${homedir}/DOCUMENTS/Editor Hub`,
    folder :
    {
        modules : `${homedir}/DOCUMENTS/Editor Hub/modules`,
        jsonFiles : `${homedir}/DOCUMENTS/Editor Hub/jsonFiles`,
        templates : `${homedir}/DOCUMENTS/Editor Hub/templates`,
        resources : `${homedir}/DOCUMENTS/Editor Hub/resources`,
        styles : `${homedir}/DOCUMENTS/Editor Hub/modules/styles`
    },
    module :
    {
        ui : `${homedir}/DOCUMENTS/Editor Hub/modules/UI.js`,
        htmlBody : `${homedir}/DOCUMENTS/Editor Hub/modules/editorHub_body.html`
    },
    jsonFiles :
    {
        localVersion : `${homedir}/DOCUMENTS/Editor Hub/jsonFiles/localVersion.json`
    },
    style :
    {
        base_style : `${homedir}/DOCUMENTS/Editor Hub/modules/styles/base_styles.css`,
        wp_style : `${homedir}/DOCUMENTS/Editor Hub/modules/styles/wp_styles.css`
    },
    appData : `${homedir}/AppData/Local/Editor Hub`
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
module.exports = {editorHub,animHub}