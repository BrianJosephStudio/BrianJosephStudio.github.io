function placeAdjustmentLayer(name,comment)
{
    var adjLayerItem = new ItemObject("comment",comment);
    if (adjLayerItem.object == undefined)
    {
        app.activeViewer.setActive();
        var comp = app.project.activeItem;
        var adjLayer = comp.layers.addSolid([1,1,1],name,comp.width,comp.height,comp.pixelAspect);
    }
    else
    {
        app.activeViewer.setActive();
        var adjLayer = app.project.activeItem.layers.add(adjLayerItem.object)
    };
    adjLayer.label = 5;
    adjLayer.source.label = 5;
    adjLayer.adjustmentLayer = true;
    adjLayer.source.comment = comment;
    return adjLayer
};
function placeNull(name,comment)
{
    var nullItem = new ItemObject("comment",comment);
    if (nullItem.object == undefined)
    {
        app.activeViewer.setActive();
        var controlNull = app.project.activeItem.layers.addNull();
        controlNull.source.name = name;
        controlNull.source.comment = comment;
        controlNull.source.label = 2;
        controlNull.label = 2;
    }
    else
    {
        app.activeViewer.setActive();
        var controlNull = app.project.activeItem.layers.add(nullItem.object);
    };
    return controlNull
};
function placeSolid(name,comment,color,width,height,pixelAspect)
{
    var solidItem = new ItemObject("comment",comment);
    if (solidItem.object == undefined)
    {
        app.activeViewer.setActive();
        var solidLayer = app.project.activeItem.layers.addSolid(color,name,width,height,pixelAspect);
        solidLayer.source.name = name;
        solidLayer.source.comment = comment;
        solidLayer.source.label = 14;
        solidLayer.label = 14;
    }
    else
    {
        app.activeViewer.setActive();
        var solidLayer = app.project.activeItem.layers.add(solidItem.object);
    };
    return solidLayer
};
function addProperty(layerObject,matchName,params)
{
    var newProperty = layerObject.property("ADBE Effect Parade").addProperty(matchName);
    if(params == undefined || params.length == 0){return newProperty}
    if(params.length != 0){
        for (var i = 0; i< params.length; i++){
            var param = params[i]
            newProperty.property(param.name).setValue(param.value)
        }
    }
};
function placeResource(saveName)
{
    var myResourceFile = new ItemObject("name",saveName)
    if(myResourceFile.object == undefined)
    {
        var myResourceObj = {name: saveName}; 
        var myResource = new ResourceFile(myResourceObj);
        var myResourceFile = myResource.resolve();
        myResourceFile.parentFolder = resourceFolder(myResource).object
        var myLayer = app.project.activeItem.layers.add(myResourceFile);
    }
    else
    {
        var myLayer = app.project.activeItem.layers.add(myResourceFile.object);
    }
    return myLayer
};
function addKeyframe(type,propPath,value,time,inIntType,outIntType,easeIn,easeOut)
{
    var newKey = propPath.addKey(time);
    propPath.setValueAtKey(newKey,value);
    switch(type)
    {
        case "1d":     
            easeIn = [new KeyframeEase(easeIn[0],easeIn[1])];
            easeOut = [new KeyframeEase(easeOut[0],easeOut[1])];
            break;
            case "2d":
                easeIn = [new KeyframeEase(easeIn[0],easeIn[1]),new KeyframeEase(easeIn[0],easeIn[1])];
                easeOut = [new KeyframeEase(easeOut[0],easeOut[1]),new KeyframeEase(easeOut[0],easeOut[1])];
                break;
            case "3d":
                easeIn = [new KeyframeEase(easeIn[0],easeIn[1]),new KeyframeEase(easeIn[0],easeIn[1]),new KeyframeEase(easeIn[0],easeIn[1])];
                easeOut = [new KeyframeEase(easeOut[0],easeOut[1]),new KeyframeEase(easeOut[0],easeOut[1]),new KeyframeEase(easeOut[0],easeOut[1])];
                break;
    }
    propPath.setTemporalEaseAtKey(newKey,easeIn,easeOut);
    propPath.setInterpolationTypeAtKey(newKey,inIntType,outIntType);
    return newKey
}
function removeEffects(layerItem,exceptions){
    if(!layerItem || !exceptions){return}
    var effects = layerItem.property('ADBE Effect Parade')
    for(var i = 1; i <= effects.numProperties; i++){
        var effect = effects.property(i)
        var isException = false
        for(var j = 0; j < exceptions.length; j++){
            var exception = exceptions[j]
            if(effect.name == exception){
                isException = true
                break
            }
        }
        if(!isException){
            effect.remove()
        }
    }
}