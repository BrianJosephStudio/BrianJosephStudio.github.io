function initializeHub(){new File('~/DOCUMENTS/Components/animHub_ui.jsx').execute()}

//Update Animator Hub
function updateScript() 
{
    var AnimatorHubPath = $.fileName;
    var versionCheckJson = system.callSystem('curl -s "https://brianjosephstudio.github.io/jsonFiles/versionCheck.json"');
    if (versionCheckJson !='')
    {
        var versionCheck = JSON.parse(versionCheckJson);
        var latestVersion = versionCheck.latestVersion;
        var latestAnimatorHubLink = versionCheck.downloadURL;
        var latestAnimatorHub = system.callSystem('curl -s '+latestAnimatorHubLink);
        if (latestVersion == currentVersion)
        { 

            alert("Animator Hub: Seems like you're up to date, mate!");
        }
        else
        {
            try
            {
                var newAnimatorHub = new File(AnimatorHubPath);
                var openNewAnimatorHub = newAnimatorHub.open("w");
                if (openNewAnimatorHub==true)
                {            
                        newAnimatorHub.write(latestAnimatorHub);
                        newAnimatorHub.close();
                        alert('Animator Hub: You have succesfully updated to the latest verion! Please restart After Effects to reflect changes.');
                }
                else if (openNewAnimatorHub==false)
                {
                        alert('Animator Hub: Update has failed.\n\nHere are a few suggested solutions for you to try:\n\n    -Make sure you are allowing Scripts to write files on your system in: Edit-Preferences-Scripting & Expressions.\n\n    -Make sure you did run After Effects as Administrator before trying to update.');
                }
                else
                {
                    alert('Animator Hub: Update has failed. Unspecified error')
                };
            }
            catch(e)
            {
                alert("Animator Hub: There's an error in function 'updateScript'. Go talk to Brian!")

            };
        };
    }
    else
    {
        alert('Animator Hub: Update has failed.\n\nHere are a few suggested solutions for you to try:\n\n    -Make sure you have an active internet connection.');
    };
    
};