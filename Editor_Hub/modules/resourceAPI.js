const { readFile, mkdir } = require('fs/promises');
const path = require('path')
const cs = new CSInterface();
const dropbox = require(global.dir.editorHub.module.dropboxAPI);
// const valorant = require(global.dir.editorHub.module.valAPI);
// cs.evalScript(`$.evalFile('${global.dir.editorHub.module.resourceAPIjsx}')`)
/** RESOURCE CLASS
 * @param {string} dropboxPath The dropbox path for the target resource file.
 * @returns A Resource Object
 */
 class Resource
 {
     constructor(dropboxPath)
     {
         let pathSplit = dropboxPath.split('/');
         let pathUri = dropboxPath.split('Editor_Hub')[1];
 
         this.saveName = pathSplit[pathSplit.length-1];
         this.description = `animHub_resource_${pathSplit[pathSplit.length-2]}_${dropboxPath}`;
         this.targetBin = pathSplit[pathSplit.length-2];
         this.binDescription = `animHub_bin_${pathSplit[pathSplit.length-2]}`
         this.uri = `${global.dir.editorHub.root}${pathUri}`;
         this.dropboxPath = dropboxPath;
     }
 }
/**
 * Resolves a resource in the system, then checks if the resource already exists in the project, and finally imports it if it doesn't.
 * @param {resource_object} resource The resource object for the resource to be imported.
 * @param {string} API "valorant" | "dropbox" (The target API from which to download the resource)
 * @returns {projectItem} a projectItem Object
 */
async function importResource(resource,API)
{
    return await resolveResource(resource,API)
    .then(resolved =>
        {
            if(resolved == true)
            {
                let script = `importResource('${resource.uri}','${resource.targetBin}','${resource.binDescription}','${resource.description}')`;
                cs.evalScript(script)
                return 
            }
            else{return hubException('Error in resourceAPI.js Line:42')}
        })
    
}
/**
 * Seaarches a resource in the system and downloads it if it doesn't find it.
 * @param {resource_object} resource The resource object to be resolved.
 * @param {String} API "valorant" | "dropbox" (The target API from which to download the resource)
 * @returns {Boolean} true | false
 */
async function resolveResource(resource,API)
{
    return await readFile(resource.uri)
    .then(success => {return true})
    .catch( async e =>
        {
            if(e.code == 'ENOENT' && API == 'valorant')
            {
                // await valorant.download(resource.uri,resource.url);
                return true
            }
            else if(e.code == 'ENOENT' && API == 'dropbox')
            {
                await mkdir(path.dirname(resource.uri),{recursive: true})
                await dropbox.download(resource.uri,resource.dropboxPath)
                cs.evalScript(`setDescription(File('${resource.uri}'),'${resource.description}')`)
                return true
            }
            else {return false}
        })
};
module.exports = {Resource,importResource,resolveResource}