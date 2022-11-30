/**
 * DEPENDENCIES
 */
const homedir = require('os').homedir();
const path = require('path');
const { readFileSync , writeFileSync , statSync , mkdirSync} = require('fs');
const { spawnSync } = require('child_process');
/*
    *VERSION CHECK/RESOLVE MODULES
*/

/**
 * IMPORT EDITOR HUB MODULES
 */
global.dir = require(`${homedir}/Documents/Editor Hub/Components/dir.js`);
global.ui = require(dir.editorHub.component.ui)


async function hubInit()
{
    ui.buildUI()
};
hubInit().then(res =>
    {
        //var alertButton;
        //alertButton = document.getElementById("testButton1");
        //alertButton.addEventListener(placeTemplate)
    })

/**
 *  FUNCTIONS
 */
 async function versionCheck()
 {
     
 };
 async function fileExist(filePath)
 {
     try
     {
         readFileSync(filePath,{encoding:'utf-8'})
         return true
     }
     catch(e){return false}
 };
 async function resolveFolder(path)
{
    try
    {
        let isDir = statSync(path).isDirectory;
        if (isDir == false){return undefined}
        else if (isDir == true){return true}
    }
    catch(e)
    {
        if(e.code = "ENOENT")
        {
            try
            {
                let newDir = mkdirSync(path,{recursive:true});
                try
                {
                    return statSync(newDir).isDirectory
                }
                catch(e){throw e}
            }
            catch(e){throw e}
        }
        else{throw e}
    }
};
 async function downloadModule(module)
 {
     let cwd = path.dirname(module);
     let input = `curl -s -o "${path.basename(module)}" "https://brianjosephstudio.github.io/Editor_Hub/Components/${path.basename(module)}"\n`;

     spawnSync('cmd',undefined,{cwd:cwd,input:input})
     return module
 }