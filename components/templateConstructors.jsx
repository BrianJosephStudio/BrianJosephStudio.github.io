//Generate Template Function
function generateTemplate(templateName,commentTag,saveName,URL,importToComp,hasMissingFiles,collapse,compArray)
{
    try
    {
        var myTemplate = findTemplate(commentTag);
        if (myTemplate==false)
        {
            downloadAndImport(saveName,URL);
            if (hasMissingFiles==true){fixMissing(compArray)};
            return generateTemplate(templateName,commentTag,saveName,URL,importToComp,hasMissingFiles,collapse,compArray)
        };
        app.activeViewer.setActive();
        if(app.project.activeItem == null){return reportCode(2)};
        var activeI = app.project.activeItem;
        if(activeI.typeName=='Composition' && importToComp == true)
        {
            var myImport = importItemToActiveComp(myTemplate);
            if (myImport!==true) {reportCode(5); return false};
            if(collapse==true){activateCollapse(templateName)};
        }
        else if(activeI.typeName!=='Composition' && importToComp == true) {reportCode(5)};
    }
    catch(e)
    {
        errorCode(4);
        return false
    };
};
EgParameter =  function(propertyName,parValue,valueType,layerName,groupName1,groupName2)
{
    this.menuControl =
    {   
        name : propertyName,
        parValue : parValue,
        valueType : valueType,
        layerName : layerName,
        groupName1 : groupName1,
        groupName2 : groupName2,
        setEgValue : function()
        {
            app.activeViewer.setActive();
            if(groupName1!==undefined && groupName2 == undefined)
            {
                app.project.activeItem.layer(layerName).property('Essential Properties').property(groupName1).property(propertyName).setValue(parValue+1);
            }
            else if (groupName1 !== undefined && groupName2 !== undefined)
            {
                app.project.activeItem.layer(layerName).property('Essential Properties').property(groupName1).property(groupName2).property(propertyName).setValue(parValue+1);
            }
            else if(groupName1 == undefined && groupName2 == undefined)
            {
                app.project.activeItem.layer(layerName).property('Essential Properties').property(propertyName).setValue(parValue+1);
            };
        }
    },
    this.checkbox = 
    {
        name : propertyName,
        parValue : parValue==true ? 1:0,
        valueType : valueType,
        layerName : layerName,
        groupName1 : groupName1,
        groupName2 : groupName2,
        setEgValue : function()
        {
            app.activeViewer.setActive();
            if(groupName1!==undefined && groupName2 == undefined)
            {
                app.project.activeItem.layer(layerName).property('Essential Properties').property(groupName1).property(propertyName).setValue(this.parValue);
            }
            else if (groupName1 !== undefined && groupName2 !== undefined)
            {
                app.project.activeItem.layer(layerName).property('Essential Properties').property(groupName1).property(groupName2).property(propertyName).setValue(this.parValue);
            }
            else if(groupName1 == undefined && groupName2 == undefined)
            {
                app.project.activeItem.layer(layerName).property('Essential Properties').property(propertyName).setValue(this.parValue);
            };
        }
    },
    this.slider =
    {
        name : propertyName,
        parValue : parValue,
        valueType : valueType,
        layerName : layerName,
        groupName1 : groupName1,
        groupName2 : groupName2,
        setEgValue : function()
        {
            app.activeViewer.setActive();
            if(groupName1!==undefined && groupName2 == undefined)
            {
                app.project.activeItem.layer(layerName).property('Essential Properties').property(groupName1).property(propertyName).setValue(parValue);
            }
            else if (groupName1 !== undefined && groupName2 !== undefined)
            {
                app.project.activeItem.layer(layerName).property('Essential Properties').property(groupName1).property(groupName2).property(propertyName).setValue(parValue);
            }
            else if(groupName1 == undefined && groupName2 == undefined)
            {
                app.project.activeItem.layer(layerName).property('Essential Properties').property(propertyName).setValue(parValue);
            };
        }
    }
    return eval(this[valueType]);
}