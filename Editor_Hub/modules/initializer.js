/**
 * DEPENDENCIES
 */
 const homedir = require('os').homedir();
 const path = require('path');
 const { writeFile } = require('fs/promises')
 const { readFileSync , writeFileSync , statSync , mkdirSync} = require('fs');
 const { spawnSync } = require('child_process');
 const cs = new CSInterface();
 
 /*
     *VERSION CHECK/RESOLVE MODULES
 */
 hubInit()
 
 
 async function hubInit()
 {
     let editorHub = `${homedir}/DOCUMENTS/Editor Hub`;
     await resolveFolder(`${editorHub}/modules/styles`)
     /**
      * PRIMITIVE PATHS
      */
     let modules =
     [
         `${editorHub}/modules/editorHub_body.html`,
         `${editorHub}/modules/dir.js`,
         `${editorHub}/modules/UI.js`,
         `${editorHub}/modules/JSON.js`,
         `${editorHub}/modules/resourceAPI.js`,
         `${editorHub}/modules/resourceAPI.jsx`,
         `${editorHub}/modules/wp_audioTools/trackList.js`,
         `${editorHub}/modules/styles/base_styles.css`,
         `${editorHub}/modules/styles/wp_styles.css`,
         `${editorHub}/modules/wp_audioTools/audioTools_styles.css`,
         `${editorHub}/modules/wp_patchNotes/patchNotes_styles.css`,

     ];
     /**
      * RESOLVE MODULES / UPDATE
      */
     if(global.updateRequired == true)
     {
         await updateModules(modules)
     }
     else if (global.updateRequired == false)
     {
         await resolveModules(modules)
     }
 
     /**
      * IMPORT EDITOR HUB MODULES
      */
        global.dir = require(`${homedir}/Documents/Editor Hub/Modules/dir.js`);
        global.ui = require(dir.editorHub.module.ui)
        global.trackList = require(dir.editorHub.module.audioTools.trackList);
        global.hubException = function(exception){alert(`Error:\n\n${exception}`,'Editor Hub')};
        cs.evalScript(`$.evalFile/${global.dir.editorHub.module.JSON}`)
     /**
      * BUILD UI
      */
     await ui.buildUI()
 }
 
 /**
  *  FUNCTIONS
  */
  async function fileExist(filePath)
  {
      try
      {
          readFileSync(filePath,{encoding:'utf-8'})
          return true
      }
      catch(e){return false}
  };
  async function resolveModule(module)
  {
     let exists = await fileExist(module);
     if(exists == false)
     {
        return await downloadModule(module)
     }
     else if (exists == true){return true}
  }
  async function resolveFolder(folder)
 {
     try
     {
         let isDir = statSync(folder).isDirectory;
         if (isDir == false){return undefined}
         else if (isDir == true){return true}
     }
     catch(e)
     {
         if(e.code = "ENOENT")
         {
             try
             {
                 let newDir = mkdirSync(folder,{recursive:true});
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
  async function updateModules(modules)
  {
     for (let i = 0; i < modules.length; i++)
     {
        await downloadModule(modules[i])
     }
     return true
  }
  async function resolveModules(modules)
 {
     for (let i = 0; i < modules.length; i++)
     {
        await resolveModule(modules[i])
        .catch(e => {throw e})
     };
     return true
  }
  async function downloadModule(module)
  {
    let  url = module.split('modules')[1]
    return await fetch (`https://brianjosephstudio.github.io/Editor_Hub/modules${url}`)
        .then(res => res.text())
        .then(async mod => await writeFile(module,mod))
        .catch(e => {throw e})
  }