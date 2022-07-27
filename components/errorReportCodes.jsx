function errorCode(errorCodeId)
{
    var errorList = [
        "Update has failed.\n\
        Here are a few suggested solutions for you to try:\
            -Make sure you are allowing Scripts to write files on your system in: Edit-Preferences-Scripting & Expressions.\
            -Make sure you did run After Effects as Administrator before trying to update.",//0
        
        "Update has failed. Unspecified error.",//1

        "There's an error in function 'updateScript'. Go talk to Brian!",//2

        "Update has failed.\n\
        Here are a few suggested solutions for you to try:\
            -Make sure you have an active internet connection.",//3

        "Animator Hub: There's an error in function 'Generate Template'.",//4

        "There's an error in function 'findItem.'",//5

        "There's an error in function 'Import File To Project'.",//6

        "There's an error in function 'Import File To Project'.",//7

        "There's an error in function 'findTemplate'.",//8

        "There's an error in function 'generateAgentIcon'.",//9

        "Error in scriptUI function.",//10

        "There's an error in function 'generateGTR'.",//11

        "There's an error in function 'openGTR'.",//12

        "There's an error in function 'generateTopBanner'.",//13
        
        "There's an error in Method 'resolve()' in class 'missingFile'.",//14
        
        "There's an invalid input in 'ItemObject()' instance.",//15

        "There's an error in function 'placeOutroScreen'."//16
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

        "Seems like you're up to date, mate!",

        "You have successfully updated to the latest verion! Please restart After Effects to reflect changes.",

        "Please select a composition to import this template into!"
    ];
    myAppTag = 'Animator Hub:\n\n    -';
    return alert(myAppTag+reportList[reportCodeId]);
};