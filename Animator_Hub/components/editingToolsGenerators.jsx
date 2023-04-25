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
    addKeyframe("3d",nullScale,[100,100],0,6612,6613,[0,65],[0,65]);
    addKeyframe("3d",nullScale,[88,88],0.75,6613,6614,[0,65],[0,65]);
    addKeyframe("3d",nullScale,[88,88],4.25,6614,6613,[0,65],[0,65]);
    addKeyframe("3d",nullScale,[100,100],5,6613,6612,[0,65],[0,65]);
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
function textHighlight(){
    app.activeViewer.setActive()
    var selected = app.project.activeItem.selectedLayers;
    if(selected.length == 0){return reportCode(11)}
    else if(selected.length > 1){return reportCode(12)}

    currentTime = app.project.activeItem.time
    
    var maskLayer = selected[0];
    var methods = [
        {
            name:'Multiply',
            bgColor: [1,0.89,0.4],
            adjustmentLayer : false,
            blendingMode: 5216,
            effects : []
        },
        {
            name : 'Invert',
            bgColor: null,
            adjustmentLayer : true,
            blendingMode: 5212,
            effects : [{name: 'ADBE Invert', params : []}]
        },
        {
            name : 'Hue',
            bgColor: null,
            adjustmentLayer : true,
            blendingMode: 5212,
            effects : [
                {
                    name:'ADBE HUE SATURATION',
                    params : [
                    {name : 'colorize', value : true},
                    {name : 'Colorize Hue', value : 57},
                    {name : 'Colorize Saturation', value : 65}
                    ]
                }
            ]
        }
    ]
    app.beginUndoGroup('Text Highlight')
    if(maskLayer.name.split(' ')[0] == 'Shape'){
        maskLayer.name = "Text Highlight"
        maskLayer.label = 2
        maskLayer.inPoint = currentTime
        maskLayer.outPoint = currentTime + 5
        
        var opacity = maskLayer.property('Transform').property('Opacity')
        var contents = maskLayer.property('Contents')
    
        var lengths = []
        var lengthSum = 0;
        var pointControl = addProperty(maskLayer,'ADBE Point Control')
        var pointProp = pointControl.property('Point')
        for(var i = contents.numProperties; i > 0; i--){
            var points = []
            var expression = 'content('+i+').content("Path 1").path.points()'
            pointProp.expression = expression+'[0]'
            points.push(pointProp.value)
            pointProp.expression = expression+'[1]'
            points.push(pointProp.value)
            var length = points[1][0] - points[0][0]
            lengths[i] = length
            lengthSum += length
        }
        pointControl.remove()
        var currentLinear = 0;  
        var newProp = addProperty(maskLayer,'ADBE Slider Control')
        newProp.name = 'Animation'
        var slider = newProp.property('Slider')
        for(var i = contents.numProperties; i > 0; i--){
            var pathLength = lengths[i]
            
            var shape = contents.property(i).property('Contents')
            var trimPaths = shape.addProperty('ADBE Vector Filter - Trim')
            var trimEnd = trimPaths.property('End')
            var pathPercentage = (pathLength / lengthSum) * 100
            trimEnd.expression = "linear(effect('Animation')('Slider'),"+currentLinear+","+(currentLinear+pathPercentage)+",0,100)"
            currentLinear += pathPercentage
     
        }
        addKeyframe("1d",slider,0,currentTime,6614,6613,[0,100],[0,25])
        addKeyframe("1d",slider,100,currentTime+1.5,6613,6614,[0,50],[0,25])
        addKeyframe("1d",opacity,100,currentTime+4.5,6614,6613,[0,100],[0,25])
        addKeyframe("1d",opacity,0,currentTime+5,6613,6612,[0,50],[0,25])

        setMethod(maskLayer,methods[0])
    }
    else if(maskLayer.name.split(' : ')[0] == 'Text Highlight'){
        currentMethod = maskLayer.name.split(' : ')[1]
        var newMethod;
        for(var i = 0; i< methods.length; i++){
            if(methods[i].name == currentMethod){
                if(i == methods.length -1 ){
                    newMethod = methods[0]
                    break
                }
                newMethod = methods[i+1]
                break
            }
        }
        setMethod(maskLayer,newMethod)
    }else{reportCode(13)}
    function setMethod(layerItem,newMethod){
        removeEffects(layerItem,['Animation'])
        if(newMethod.bgColor != null){
            var shapes = layerItem.property('Contents')
            for(var i = 1; i <= shapes.numProperties; i++){
                var shapeFill = shapes.property(i).property('Contents').property('Fill 1').property('Opacity')
                shapeFill.setValue(0)
                var shapeStroke = shapes.property(i).property('Contents').property('Stroke 1').property('Color')
                shapeStroke.setValue(newMethod.bgColor)
            }
        }
        layerItem.adjustmentLayer = newMethod.adjustmentLayer
        layerItem.blendingMode = newMethod.blendingMode
        if(newMethod.effects.length != 0){
            for(var i = 0; i< newMethod.effects.length; i++){
                var effect = newMethod.effects[i]
                addProperty(layerItem,effect.name,effect.params)
            }
        };
        var newName = layerItem.name.split(' : ')[0] + ' : ' + newMethod.name
        layerItem.name = newName
    }
    app.endUndoGroup()
}
function mapHighlight(animKeyframe,border,color){
    app.activeViewer.setActive()
    app.beginUndoGroup("Map highlight")
    var comp = app.project.activeItem;
    if(comp.name.slice(0,8) != "Map Edit"){return alert("Active composition doesn't seem to be a map overview")}
    //Refine and filter selection
    var sel = comp.selectedLayers;
    var mapHighlights = []
    for(var i = 0; i < sel.length; i++){
        try{
            var path = sel[i].property("Contents").property(1).property("Contents").property(1)
            if (path.name.slice(-6) != "Path 1"){
                throw new Error('Not a valid shape layer')
            }
        }catch(e){
            sel.splice(i,1);
            continue
        }
        // if(sel[i].name.slice(0,13) == "Map Highlight"){
        //     mapHighlights.push(sel[i])
        //     sel.splice(i,1)
        // }
    }
    if(sel.length == 0 && mapHighlights.length == 0){return alert("You haven't selected any shape layers")}

    for(var i = 0; i < sel.length; i++){
        var layer = sel[i]
        //Parent shape layer to map
        layer.parent = comp.layer("Map [ND]")
        //Naming and labeling
        if(layer.name.slice(0,13) != "Map Highlight"){

            var mapHighlightCount = 1
            for(var j = 1; j <= comp.layers.length; j++){
                if(comp.layer(j).name.slice(0,13) == "Map Highlight" && eval(comp.layer(j).name.slice(14)) >= mapHighlightCount){
                    mapHighlightCount = eval(comp.layer(j).name.slice(14)) + 1
                }
            }
            layer.name = "Map Highlight " + mapHighlightCount
            layer.label = 14
            //Reposition Layer
            var targetIndex = 1;
            if(comp.layer("Map Control")){var rootLayer = comp.layer("Map Control")}else{var rootLayer = comp.layer("Map [ND]")}
            while(comp.layer(rootLayer.index - targetIndex).name.slice(0,13) == "Map Highlight" &&
                eval(comp.layer(rootLayer.index - targetIndex).name.slice(14)) < mapHighlightCount){
                targetIndex++
            }
            layer.moveAfter(comp.layer(rootLayer.index - targetIndex))
        }
        //Create Effect Sliders
        var slider = layer.property("Effects").property("Color Control")
        if(slider == null){
            var slider = addProperty(layer,"ADBE Color Control",undefined)
        }
        if(slider.property("Color").numKeys > 0){
            for(var j = slider.property("Color").numKeys; j > 0; j--){
                slider.property("Color").removeKey(j)
            }
        }
        slider.property("Color").setValue(color.color)
        //Address fill
        var fill = layer.property("Contents").property(1).property("Contents").property("Fill 1");
        if(fill == null){
            fill = layer.property("Contents").property(1).property("Contents").addProperty("ADBE Vector Graphic - Fill")
        }
        fill.enabled = true;
        fill.Color.expression = 'effect("Color Control")("Color")'
        fill.property("opacity").setValue(color.opacity)
        // Deal with scaling
        var map = comp.layer("Map [ND]")
        var transform;
        if(map.parent != null){
            transform = map.parent
        }else{transform = map}
        // Address Stroke
        var stroke = layer.property("Contents").property(1).property("Contents").property("Stroke 1")
        if(stroke == null){
            stroke = layer.property("Contents").property(1).property("Contents").addProperty("ADBE Vector Graphic - Stroke")
        }
        var size = transform.property("Transform").property("scale").value
        if(border == false){
            stroke.enabled = false
        }else{
            stroke.enabled = true;
            var width = stroke.property("Stroke Width");
            var newWidth = 2 * (size[0] / 100)
            width.setValue(newWidth)
            
            var strokeColor = stroke.property("Color")
            strokeColor.expression = 'effect("Color Control")("Color")'
            stroke.property("Line Cap").setValue(2)
            //Dashing
            var dashes = stroke.property("Dashes")
            var dash1 = dashes.addProperty("ADBE Vector Stroke Dash 1")
            var gap1 = dashes.addProperty("ADBE Vector Stroke Gap 1")
            var dash2 = dashes.addProperty("ADBE Vector Stroke Dash 2")
            var gap2 = dashes.addProperty("ADBE Vector Stroke Gap 2")
            var dash3 = dashes.addProperty("ADBE Vector Stroke Dash 3")
            var gap3 = dashes.addProperty("ADBE Vector Stroke Gap 3")
            var offset = dashes.addProperty("ADBE Vector Stroke Offset")
            dash1.setValue(1)
            gap1.setValue(8 * (size[0] / 100))
            dash2.setValue(1)
            gap2.setValue(6 * (size[0] / 100))
            dash3.setValue(12 * (size[0] / 100))
            gap3.setValue(6 * (size[0] / 100))
            offset.expression = "time * ((10 * "+size[0]+") / 100)"
        }
        
        layer.blendingMode = 5220
        var currentTime = comp.time
        var opacity = layer.property("Transform").property("Opacity")
        if(animKeyframe == true){
            layer.inPoint = currentTime
            layer.outPoint = comp.duration
            if(opacity.numKeys > 0){
                for(var j = opacity.numKeys; j > 0 ; j--){
                    opacity.removeKey(j)
                }
            }
            addKeyframe("1d",opacity,0,currentTime,6614,6613,[0,100],[0,25])
            addKeyframe("1d",opacity,100,currentTime+0.5,6613,6614,[0,50],[0,25])
            // addKeyframe("1d",opacity,100,currentTime+4.5,6614,6613,[0,100],[0,25])
            // addKeyframe("1d",opacity,0,currentTime+5,6613,6612,[0,50],[0,25])
        }else if(opacity.numKeys > 0){
                for(var j = opacity.numKeys; j > 0; j--){
                    opacity.removeKey(j)
                }
                layer.inPoint = 0
                layer.outPoint = comp.duration
                opacity.setValue(100)
        }
    }
    app.executeCommand(2387)
    app.endUndoGroup()
}
function mapHighlightAnim(animType){
    app.activeViewer.setActive()
    //validate Layer
    var comp = app.project.activeItem;
    var currentTime = comp.time
    var sel = comp.selectedLayers
    for(var i = 0; i < sel.length; i++){
        var layer = sel[i]
        if(layer.name.slice(0,13) != "Map Highlight"){sel.splice(i,1);continue}
    }
    if(sel.length == 0){return alert("Your selection didn't include active map highlights with keyframes.","Animator Hub")}
    app.beginUndoGroup("Map highlight")
    for (var i in sel){
        var layer = sel[i]
        var anim = layer.property("Transform").property("Opacity")
        if(animType == 0){
            with(anim){
                if(numKeys != 0 && ((keyTime(nearestKeyIndex(currentTime)) <= currentTime + 0.5 && keyTime(nearestKeyIndex(currentTime)) >= currentTime) ||
                (keyTime(nearestKeyIndex(currentTime + 0.5)) <= currentTime + 0.5 && keyTime(nearestKeyIndex(currentTime + 0.5)) >= currentTime))){
                    alert("You're trying to create keyframes that are too close and will interfere with an existing animation")
                }else{
                    addKeyframe("1d",anim,0,currentTime,6614,6613,[0,100],[0,25])
                    addKeyframe("1d",anim,100,currentTime+0.5,6613,6612,[0,50],[0,25])
                }
            }
        }else if(animType == 1){
            with(anim){
                if(numKeys != 0 && ((keyTime(nearestKeyIndex(currentTime)) <= currentTime && keyTime(nearestKeyIndex(currentTime)) >= currentTime - 0.5) ||
                (keyTime(nearestKeyIndex(currentTime - 0.5)) <= currentTime && keyTime(nearestKeyIndex(currentTime - 0.5)) >= currentTime - 0.5))){
                    alert("You're trying to create keyframes that are too close and will interfere with an existing animation")
                }else{
                    addKeyframe("1d",anim,100,currentTime-0.5,6614,6613,[0,100],[0,25])
                    addKeyframe("1d",anim,0,currentTime,6613,6612,[0,50],[0,25])
                }
            }
        }
        if(anim.keyValue(1) == 0){
            layer.inPoint = anim.keyTime(1)
        }else{layer.inPoint = 0}
        if(anim.keyValue(anim.numKeys) == 0){
            layer.outPoint = anim.keyTime(anim.numKeys)
        }else{layer.outPoint = comp.duration}
    }
    app.endUndoGroup()
}
function changeHighlightColor(newColor){
    var comp = app.project.activeItem
    var sel = comp.selectedLayers
    for(var i in sel){
        var layer = sel[i]
        if(layer.name.slice(0,13) != "Map Highlight"){
            sel.slice(i,1)
        }
    }
    
    app.activeViewer.setActive()
    
    app.beginUndoGroup("Color Change")
    for(var i in sel){
        var layer = sel[i]
        var colorControl = layer.property("Effects").property("Color Control").property("Color")
        var time = comp.time
        colorControl.addKey(time)
        colorControl.setValueAtTime(time+0.5,newColor.color)
    }
    app.endUndoGroup()
}