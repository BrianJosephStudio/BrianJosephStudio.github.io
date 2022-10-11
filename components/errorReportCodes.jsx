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

        "There's an error in function 'Generate Template'.",//4

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

        "There's an error in function 'placeOutroScreen'.",//16

        "There's an error in function 'generateTopicTitle'.",//17

        "There's an error in Function 'blurBackground()'."//18
    ];
    var myAppTag = 'Animator Hub:\n\n    -';
    return alert(myAppTag+errorList[errorCodeId]);
};
function reportCode(reportCodeId)
{
    var reportList = [
        "Your Map was summoned succesfully but we could not find all the missing files inside this project.\
        Seems like you're gonna have to manage missing files yourself for this one!",//0
        
        "Your Template was summoned succesfully but we could not find all the missing files inside this project.\
        Seems like you're gonna have to manage missing files yourself for this one!",//1
        
        "There's no active composition to import your template into.",//2

        "Seems like you're up to date, mate!",//3

        "You have successfully updated to the latest verion! Please restart After Effects to reflect changes.",//4

        "Please select a composition to import this template into!",//5

        "Please select clips to duplicate in your active composition!",//6

        "Please Select a Shape Layer to continue."//7
    ];
    myAppTag = 'Animator Hub:\n\n    -';
    return alert(myAppTag+reportList[reportCodeId]);
};