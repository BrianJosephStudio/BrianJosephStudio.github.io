function errorCode(errorCodeId)
{
    var errorList = [
        "Update has failed.\n\
        Here are a few suggested solutions for you to try:\
            -Make sure you are allowing Scripts to write files on your system in: Edit-Preferences-Scripting & Expressions.\
            -Make sure you did run After Effects as Administrator before trying to update.",
        
        "Update has failed. Unspecified error.",

        "There's an error in function 'updateScript'. Go talk to Brian!",

        "Update has failed.\n\
        Here are a few suggested solutions for you to try:\
            -Make sure you have an active internet connection.",

        "Animator Hub: There's an error in function 'Generate Template'.",

        "There's an error in function 'findItem.'",

        "There's an error in function 'Import File To Project'.",

        "There's an error in function 'Import File To Project'.",

        "There's an error in function 'findTemplate'.",

        "There's an error in function 'generateAgentIcon'.",

        "Error in scriptUI function.",

        "There's an error in function 'generateGTR'.",

        "There's an error in function 'openGTR'."
        
    ];
    var myAppTag = 'Animator Hub:\n\n    -';
    return alert(myAppTag+errorList[errorCodeId]);
};
function reportCode(reportCodeId)
{
    var reportList = [
        "Your Map was summoned succesfully but we could not find all the missing files inside this project.\
        Seems like you're gonna have to manage missing files yourself for this one!",
        
        "Your Template was summoned succesfully but we could not find all the missing files inside this project.\
        Seems like you're gonna have to manage missing files yourself for this one!",
        
        "There's no active composition to import your template into.",

        "Animator Hub: Seems like you're up to date, mate!",

        "Animator Hub: You have successfully updated to the latest verion! Please restart After Effects to reflect changes.",

        "Please select a composition to import this template into!"
    ];
    myAppTag = 'Animator Hub:\n\n    -';
    return alert(myAppTag+reportList[reportCodeId]);
};