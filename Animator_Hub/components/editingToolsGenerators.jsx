function blurBackground(addExposure,addInOutAnims)
{
    try
    {
        app.beginUndoGroup("Blur Background")
        app.activeViewer.setActive();
        var sel = app.project.activeItem.selectedLayers;
        var index;
        for(var i = 0; i < sel.length; i++)
        {
            if (i == 0){index = sel[i].index; continue};
            if(sel[i].index < index){index = sel[i].index};
        };

        var comment = "animHub_backgroundEffects_[ET]";
        var adjLayer = placeAdjustmentLayer("Background Effects",comment)
        if(sel.length>0) {adjLayer.moveBefore(app.project.activeItem.layer(index+1))}

        if(addExposure == true)
        {
            var exposure = addProperty(adjLayer,"ADBE Exposure2");
            exposure.property('Exposure').setValue(-1.5);
        };
        var gauss = addProperty(adjLayer,"ADBE Gaussian Blur 2");
        gauss.property("Blurriness").setValue(180);
        
        var myLayer = placeResource("SC Diagonal Lines.png")
        myLayer.blendingMode = 5226;
        myLayer.property('Transform').property('Scale').setValue([40.9,40.9]);
        if(sel.length>0) {myLayer.moveBefore(adjLayer)}

        if(addInOutAnims == true)
        {
            var adjOpacity = adjLayer.property("Transform").property('Opacity');
            var resourceOpacity = myLayer.property("Transform").property('Opacity');
            addKeyframe("1d",adjOpacity,0,0,6612,6613,[0,50],[300,25]);
            addKeyframe("1d",adjOpacity,100,0.75,6613,6614,[0,50],[0,50]);
            addKeyframe("1d",adjOpacity,100,4.25,6614,6613,[0,50],[0,50]);
            addKeyframe("1d",adjOpacity,0,5,6613,6612,[0,50],[300,25]);
            addKeyframe("1d",resourceOpacity,0,0,6612,6613,[0,50],[300,25]);
            addKeyframe("1d",resourceOpacity,35,0.75,6613,6614,[0,50],[0,50]);
            addKeyframe("1d",resourceOpacity,35,4.25,6614,6613,[0,50],[0,50]);
            addKeyframe("1d",resourceOpacity,0,5,6613,6612,[0,50],[300,25]);
        }
        else
        {
            myLayer.property('Transform').property('Opacity').setValue(35);
        };
        app.endUndoGroup();
        return{adjLayer:adjLayer,resourceFile:myLayer};
    }
    catch(e){errorCode(18)}
};
function vodMode()
{
    //app.beginUndoGroup("VoD Mode")
    if (app.project.activeItem.selectedLayers[0] == undefined) {return reportCode(6)}
    app.activeViewer.setActive();
    var selection = app.project.activeItem.selectedLayers;
    var vodClips = [selection[0]];
    for(var i = 0; i < selection.length; i++)
    {
        if (selection[i].index > vodClips[vodClips.length-1].index)
        {
            vodClips.push(selection[i]);
        }
        else if (selection[i].index < vodClips[vodClips.length-1].index)
        {
            vodClips.unshift(selection[i]);
        };
    }
    var duplicates = [];
    for (var i = 0; i < vodClips.length; i++)
    {
        duplicates.push(vodClips[i].duplicate());
        duplicates[duplicates.length-1].moveBefore(vodClips[0])
    };
    var bgEffects = blurBackground(false,false);
    bgEffects.resourceFile.moveBefore(vodClips[0]);
    bgEffects.adjLayer.moveBefore(vodClips[0]);
    var comp = app.project.activeItem;
    var compWidth = Math.floor(comp.width * 1.01);
    var compHeight = Math.floor(comp.height * 1.02);
    var bgBorder = placeSolid("Clip Border","animHub_clipBorder_[ET]",[0.1,0.1,0.1],compWidth,compHeight,comp.pixelAspect);
    bgBorder.moveBefore(bgEffects.resourceFile);
    dropShadow = addProperty(bgBorder,"ADBE Drop Shadow");
    dropShadow.property("Distance").setValue(50);
    dropShadow.property("Softness").setValue(130);
    //bgBorder.blendingMode = 5226;
    var controlNull = placeNull("Control Null","animHub_controlNull_[ET]");
    for (var i = 0; i < duplicates.length; i++)
    {
        duplicates[i].parent = controlNull;
    };
    bgBorder.parent = controlNull;
    var nullScale = controlNull.property('Transform').property('Scale');
    addKeyframe("2d",nullScale,[100,100],0,6612,6613,[0,65],[0,65]);
    addKeyframe("2d",nullScale,[88,88],0.75,6613,6614,[0,65],[0,65]);
    addKeyframe("2d",nullScale,[88,88],4.25,6614,6613,[0,65],[0,65]);
    addKeyframe("2d",nullScale,[100,100],5,6613,6612,[0,65],[0,65]);
    //app.endUndoGroup()
};
function blurHighlight()
{
    var myShape = app.project.activeItem.selectedLayers[0];
    if (myShape == undefined) {reportCode(7)};
    myShape.name = "Masking Shape";
    myShape.label = 13;
    var gauss = addProperty(myShape,"ADBE Gaussian Blur 2");
    gauss.property('Blurriness').setValue(100);
    gauss.property(3).setValue(0);
    var comment = "animHub_backgroundEffects_[ET]";
    var adjLayer = placeAdjustmentLayer("Background Effects",comment);
    adjLayer.moveAfter(myShape);
    adjLayer.trackMatteType = 5014;
    var gauss2 = addProperty(adjLayer,"ADBE Gaussian Blur 2");
    gauss2.property('Blurriness').setValue(35);
    gauss2.property(3).setValue(0);
    var exposure = addProperty(adjLayer,"ADBE Exposure2");
    exposure.property('Exposure').setValue(-1.2);

    var adjOpacity = adjLayer.property("Transform").property('Opacity');
    addKeyframe("1d",adjOpacity,0,0,6612,6613,[0,50],[300,25]);
    addKeyframe("1d",adjOpacity,100,0.75,6613,6614,[0,50],[0,50]);
    addKeyframe("1d",adjOpacity,100,4.25,6614,6613,[0,50],[0,50]);
    addKeyframe("1d",adjOpacity,0,5,6613,6612,[0,50],[300,25]);

}
function blurIt()
{
    var myShape = app.project.activeItem.selectedLayers[0];
    if (myShape == undefined) {reportCode(7)};
    myShape.name = "Masking Shape";
    myShape.label = 13;
    var gauss = addProperty(myShape,"ADBE Gaussian Blur 2");
    gauss.property('Blurriness').setValue(15);
    gauss.property(3).setValue(0);
    var comment = "animHub_backgroundEffects_[ET]";
    var adjLayer = placeAdjustmentLayer("Background Effects",comment);
    adjLayer.moveAfter(myShape);
    adjLayer.trackMatteType = 5013;
    var gauss2 = addProperty(adjLayer,"ADBE Gaussian Blur 2");
    gauss2.property('Blurriness').setValue(35);
    gauss2.property(3).setValue(0);
}
