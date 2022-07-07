function errorCode(errorCodeId)
{
    var errorList = [
        'empty'
    ];
    myAppTag = 'MF Wizard:\n\n    -';
    return alert(myAppTag+errorList[errorCodeId]);
};
function reportCode(reportCodeId)
{
    var reportList = [
        "Your Map was summoned succesfully but we could not find all the missing files inside this project.\nSeems like you're gonna have to manage missing files yourself for this one!",
        "Your Template was summoned succesfully but we could not find all the missing files inside this project.\nSeems like you're gonna have to manage missing files yourself for this one!",
        "There's no active composition to import your template into"
    ];
    myAppTag = 'Animator Hub:\n\n    -';
    return alert(myAppTag+reportList[reportCodeId]);
};