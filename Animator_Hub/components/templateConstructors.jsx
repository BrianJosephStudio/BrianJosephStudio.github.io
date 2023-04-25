//Generate Template Function
function generateTemplate(templateName,commentTag,templateTag,saveName,dropboxPath,uri,importToComp,hasMissingFiles,collapse,compArray)
{
    try
    {
        var myTemplate = findTemplate(commentTag);
        if (myTemplate==false)
        {
            var download = downloadAndImport(saveName,dropboxPath,uri,templateTag);
            if(download == false){return errorCode(20)};
            if (hasMissingFiles==true){fixMissing(compArray)};
            return generateTemplate(templateName,commentTag,templateTag,saveName,dropboxPath,uri,importToComp,hasMissingFiles,collapse,compArray)
        };
        app.activeViewer.setActive();
        if(app.project.activeItem == null){return reportCode(2)};
        var activeI = app.project.activeItem;
        if(activeI.typeName=='Composition' && importToComp == true)
        {
            var myImport = importItemToActiveComp(myTemplate);
            if (myImport!=true) {reportCode(5); return false};
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
    };
    this.textInput = 
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
    };
    this.color = 
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
            if(groupName1 != undefined && groupName2 == undefined)
            {
                app.project.activeItem.layer(layerName).property('Essential Properties').property(groupName1).property(propertyName).setValue(parValue);
            }
            else if (groupName1 != undefined && groupName2 != undefined)
            {
                app.project.activeItem.layer(layerName).property('Essential Properties').property(groupName1).property(groupName2).property(propertyName).setValue(parValue);
            }
            else if(groupName1 == undefined && groupName2 == undefined)
            {
                app.project.activeItem.layer(layerName).property('Essential Properties').property(propertyName).setValue(parValue);
            };
        }
    };
    this.positionArray = 
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
            if(groupName1 != undefined && groupName2 == undefined)
            {
                app.project.activeItem.layer(layerName).property('Essential Properties').property(groupName1).property(propertyName).setValue(parValue);
            }
            else if (groupName1 != undefined && groupName2 != undefined)
            {
                app.project.activeItem.layer(layerName).property('Essential Properties').property(groupName1).property(groupName2).property(propertyName).setValue(parValue);
            }
            else if(groupName1 == undefined && groupName2 == undefined)
            {
                app.project.activeItem.layer(layerName).property('Essential Properties').property(propertyName).setValue(parValue);
            };
        }
    },
    this.footage =
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
            if(groupName1 != undefined && groupName2 == undefined)
            {
                app.project.activeItem.layer(layerName).property('Essential Properties').property(groupName1).property(propertyName).setAlternateSource(parValue);
            }
            else if (groupName1 != undefined && groupName2 != undefined)
            {
                app.project.activeItem.layer(layerName).property('Essential Properties').property(groupName1).property(groupName2).property(propertyName).setAlternateSource(parValue);
            }
            else if(groupName1 == undefined && groupName2 == undefined)
            {
                app.project.activeItem.layer(layerName).property('Essential Properties').property(propertyName).setAlternateSource(parValue);
            };
        }
    };
    return eval(this[valueType]);
}
ResourceFile = function(itemObject)
{
    function resolveFunction(saveName,dropboxPath,uri)
    {
        if(new File(uri).exists!=true)
        {return downloadImportResource(saveName,dropboxPath,uri)}
        else {return importFileToProject(new File(uri))}
    }
    this.agents = 
    {
        Astra:
        {
            saveName: "Astra.png",
            uri: UriManager.resources.agents.Astra,
            dropboxPath : DropBoxPath.resources.agents.Astra,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },  
        Breach:
        {
            saveName: "Breach.png",
            uri: UriManager.resources.agents.Breach,
            dropboxPath : DropBoxPath.resources.agents.Breach,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }, 
        Brimstone:
        {
            saveName: "Brimstone.png",
            uri: UriManager.resources.agents.Brimstone,
            dropboxPath : DropBoxPath.resources.agents.Brimstone,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }, 
        Chamber:
        {
            saveName: "Chamber.png",
            uri: UriManager.resources.agents.Chamber,
            dropboxPath : DropBoxPath.resources.agents.Chamber,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }, 
        Cypher:
        {
            saveName: "Cypher.png",
            uri: UriManager.resources.agents.Cypher,
            dropboxPath : DropBoxPath.resources.agents.Cypher,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }, 
        Fade:
        {
            saveName: "Fade.png",
            uri: UriManager.resources.agents.Fade,
            dropboxPath : DropBoxPath.resources.agents.Fade,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Gekko:
        {
            saveName: "Gekko.webp",
            uri: UriManager.resources.agents.Gekko,
            dropboxPath : DropBoxPath.resources.agents.Gekko,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }, 
        Harbor:
        {
            saveName: "Harbor.webp",
            uri: UriManager.resources.agents.Harbor,
            dropboxPath : DropBoxPath.resources.agents.Harbor,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Jett:
        {
            saveName: "Jett.png",
            uri: UriManager.resources.agents.Jett,
            dropboxPath : DropBoxPath.resources.agents.Jett,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }, 
        KAYO:
        {
            saveName: "KAYO.png",
            uri: UriManager.resources.agents.KAYO,
            dropboxPath : DropBoxPath.resources.agents.KAYO,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }, 
        Killjoy:
        {
            saveName: "Killjoy.png",
            uri: UriManager.resources.agents.Killjoy,
            dropboxPath : DropBoxPath.resources.agents.Killjoy,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }, 
        Neon:
        {
            saveName: "Neon.png",
            uri: UriManager.resources.agents.Neon,
            dropboxPath : DropBoxPath.resources.agents.Neon,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }, 
        Omen:
        {
            saveName: "Omen.png",
            uri: UriManager.resources.agents.Omen,
            dropboxPath : DropBoxPath.resources.agents.Omen,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }, 
        Phoenix:
        {
            saveName: "Phoenix.png",
            uri: UriManager.resources.agents.Phoenix,
            dropboxPath : DropBoxPath.resources.agents.Phoenix,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }, 
        Raze:
        {
            saveName: "Raze.png",
            uri: UriManager.resources.agents.Raze,
            dropboxPath : DropBoxPath.resources.agents.Raze,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }, 
        Reyna:
        {
            saveName: "Reyna.png",
            uri: UriManager.resources.agents.Reyna,
            dropboxPath : DropBoxPath.resources.agents.Reyna,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }, 
        Sage:
        {
            saveName: "Sage.png",
            uri: UriManager.resources.agents.Sage,
            dropboxPath : DropBoxPath.resources.agents.Sage,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }, 
        Skye:
        {
            saveName: "Skye.png",
            uri: UriManager.resources.agents.Skye,
            dropboxPath : DropBoxPath.resources.agents.Skye,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }, 
        Sova:
        {
            saveName: "Sova.png",
            uri: UriManager.resources.agents.Sova,
            dropboxPath : DropBoxPath.resources.agents.Sova,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }, 
        Viper:
        {
            saveName: "Viper.png",
            uri: UriManager.resources.agents.Viper,
            dropboxPath : DropBoxPath.resources.agents.Viper,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }, 
        Yoru:
        {
            saveName: "Yoru.png",
            uri: UriManager.resources.agents.Yoru,
            dropboxPath : DropBoxPath.resources.agents.Yoru,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }
        
    },
    this.guns =
    {
        Ares:
        {
            saveName: "Ares.png",
            uri: UriManager.resources.guns.Ares,
            dropboxPath : DropBoxPath.resources.guns.Ares,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Bucky:
        {
            saveName: "Bucky.png",
            uri: UriManager.resources.guns.Bucky,
            dropboxPath : DropBoxPath.resources.guns.Bucky,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Bulldog:
        {
            saveName: "Bulldog.png",
            uri: UriManager.resources.guns.Bulldog,
            dropboxPath : DropBoxPath.resources.guns.Bulldog,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Classic:
        {
            saveName: "Classic.png",
            uri: UriManager.resources.guns.Classic,
            dropboxPath : DropBoxPath.resources.guns.Classic,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Frenzy:
        {
            saveName: "Frenzy.png",
            uri: UriManager.resources.guns.Frenzy,
            dropboxPath : DropBoxPath.resources.guns.Frenzy,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Ghost:
        {
            saveName: "Ghost.png",
            uri: UriManager.resources.guns.Ghost,
            dropboxPath : DropBoxPath.resources.guns.Ghost,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Guardian:
        {
            saveName: "Guardian.png",
            uri: UriManager.resources.guns.Guardian,
            dropboxPath : DropBoxPath.resources.guns.Guardian,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Judge:
        {
            saveName: "Judge.png",
            uri: UriManager.resources.guns.Judge,
            dropboxPath : DropBoxPath.resources.guns.Judge,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Marshal:
        {
            saveName: "Marshal.png",
            uri: UriManager.resources.guns.Marshal,
            dropboxPath : DropBoxPath.resources.guns.Marshal,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Odin:
        {
            saveName: "Odin.png",
            uri: UriManager.resources.guns.Odin,
            dropboxPath : DropBoxPath.resources.guns.Odin,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Operator:
        {
            saveName: "Operator.png",
            uri: UriManager.resources.guns.Operator,
            dropboxPath : DropBoxPath.resources.guns.Operator,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Phantom:
        {
            saveName: "Phantom.png",
            uri: UriManager.resources.guns.Phantom,
            dropboxPath : DropBoxPath.resources.guns.Phantom,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Sheriff:
        {
            saveName: "Sheriff.png",
            uri: UriManager.resources.guns.Sheriff,
            dropboxPath : DropBoxPath.resources.guns.Sheriff,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Shorty:
        {
            saveName: "Shorty.png",
            uri: UriManager.resources.guns.Shorty,
            dropboxPath : DropBoxPath.resources.guns.Shorty,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Spectre:
        {
            saveName: "Spectre.png",
            uri: UriManager.resources.guns.Spectre,
            dropboxPath : DropBoxPath.resources.guns.Spectre,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Stinger:
        {
            saveName: "Stinger.png",
            uri: UriManager.resources.guns.Stinger,
            dropboxPath : DropBoxPath.resources.guns.Stinger,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Vandal:
        {
            saveName: "Vandal.png",
            uri: UriManager.resources.guns.Vandal,
            dropboxPath : DropBoxPath.resources.guns.Vandal,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }
    },
    this.armor = 
    {
        heavyShield:
        {
            saveName: "Heavy Shield.png",
            uri: UriManager.resources.armor.HeavyShield,
            dropboxPath : DropBoxPath.resources.armor.HeavyShield,
            resourceFolder: "Armor",
            resourceFolderComment: "animHub_armor_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        lightShield:
        {
            saveName: "Light Shield.png",
            uri: UriManager.resources.armor.LightShield,
            dropboxPath : DropBoxPath.resources.armor.LightShield,
            resourceFolder: "Armor",
            resourceFolderComment: "animHub_armor_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }
    },
    this.creditsIcon = 
    {
        creditsIcon:
        {
            saveName: "Credits Icon.png",
            uri: UriManager.resources.creditsIcon.CreditsIcon,
            dropboxPath : DropBoxPath.resources.creditsIcon.CreditsIcon,
            resourceFolder: "Credits Icon",
            resourceFolderComment: "animHub_creditsIcon_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }
    },
    this.maps =
    {
        Ascent:
        {
            saveName: "Ascent.png",
            uri: UriManager.resources.maps.Ascent,
            dropboxPath : DropBoxPath.resources.maps.Ascent,
            resourceFolder: "Maps",
            resourceFolderComment: "animHub_maps_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Bind:
        {
            saveName: "Bind.png",
            uri: UriManager.resources.maps.Bind,
            dropboxPath : DropBoxPath.resources.maps.Bind,
            resourceFolder: "Maps",
            resourceFolderComment: "animHub_maps_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Breeze:
        {
            saveName: "Breeze.png",
            uri: UriManager.resources.maps.Breeze,
            dropboxPath : DropBoxPath.resources.maps.Breeze,
            resourceFolder: "Maps",
            resourceFolderComment: "animHub_maps_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Fracture:
        {
            saveName: "Fracture.png",
            uri: UriManager.resources.maps.Fracture,
            dropboxPath : DropBoxPath.resources.maps.Fracture,
            resourceFolder: "Maps",
            resourceFolderComment: "animHub_maps_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Haven:
        {
            saveName: "Haven.png",
            uri: UriManager.resources.maps.Haven,
            dropboxPath : DropBoxPath.resources.maps.Haven,
            resourceFolder: "Maps",
            resourceFolderComment: "animHub_maps_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Icebox:
        {
            saveName: "Icebox.png",
            uri: UriManager.resources.maps.Icebox,
            dropboxPath : DropBoxPath.resources.maps.Icebox,
            resourceFolder: "Maps",
            resourceFolderComment: "animHub_maps_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Lotus:
        {
            saveName: "Lotus.png",
            uri: UriManager.resources.maps.Lotus,
            dropboxPath : DropBoxPath.resources.maps.Lotus,
            resourceFolder: "Maps",
            resourceFolderComment: "animHub_maps_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
       Pearl:
        {
            saveName: "Pearl.png",
            uri: UriManager.resources.maps.Pearl,
            dropboxPath : DropBoxPath.resources.maps.Pearl,
            resourceFolder: "Maps",
            resourceFolderComment: "animHub_maps_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Split:
        {
            saveName: "Split.png",
            uri: UriManager.resources.maps.Split,
            dropboxPath : DropBoxPath.resources.maps.Split,
            resourceFolder: "Maps",
            resourceFolderComment: "animHub_maps_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }
    },
    this.mapSplasharts =
    {
        Ascent:
        {
            saveName: "Ascent Splashart.png",
            uri: UriManager.resources.mapSplasharts.Ascent,
            dropboxPath : DropBoxPath.resources.mapSplasharts.Ascent,
            resourceFolder: "Map Splasharts",
            resourceFolderComment: "animHub_mapSplasharts_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Bind:
        {
            saveName: "Bind Splashart.png",
            uri: UriManager.resources.mapSplasharts.Bind,
            dropboxPath : DropBoxPath.resources.mapSplasharts.Bind,
            resourceFolder: "Map Splasharts",
            resourceFolderComment: "animHub_mapSplasharts_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Breeze:
        {
            saveName: "Breeze Splashart.png",
            uri: UriManager.resources.mapSplasharts.Breeze,
            dropboxPath : DropBoxPath.resources.mapSplasharts.Breeze,
            resourceFolder: "Map Splasharts",
            resourceFolderComment: "animHub_mapSplasharts_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Fracture:
        {
            saveName: "Fracture Splashart.png",
            uri: UriManager.resources.mapSplasharts.Fracture,
            dropboxPath : DropBoxPath.resources.mapSplasharts.Fracture,
            resourceFolder: "Map Splasharts",
            resourceFolderComment: "animHub_mapSplasharts_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Haven:
        {
            saveName: "Haven Splashart.png",
            uri: UriManager.resources.mapSplasharts.Haven,
            dropboxPath : DropBoxPath.resources.mapSplasharts.Haven,
            resourceFolder: "Map Splasharts",
            resourceFolderComment: "animHub_mapSplasharts_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Icebox:
        {
            saveName: "Icebox Splashart.png",
            uri: UriManager.resources.mapSplasharts.Icebox,
            dropboxPath : DropBoxPath.resources.mapSplasharts.Icebox,
            resourceFolder: "Map Splasharts",
            resourceFolderComment: "animHub_mapSplasharts_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Lotus:
        {
            saveName: "Lotus Splashart.webp",
            uri: UriManager.resources.mapSplasharts.Lotus,
            dropboxPath : DropBoxPath.resources.mapSplasharts.Lotus,
            resourceFolder: "Map Splasharts",
            resourceFolderComment: "animHub_mapSplasharts_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
       Pearl:
        {
            saveName: "Pearl Splashart.png",
            uri: UriManager.resources.mapSplasharts.Pearl,
            dropboxPath : DropBoxPath.resources.mapSplasharts.Pearl,
            resourceFolder: "Map Splasharts",
            resourceFolderComment: "animHub_mapSplasharts_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Split:
        {
            saveName: "Split Splashart.png",
            uri: UriManager.resources.mapSplasharts.Split,
            dropboxPath : DropBoxPath.resources.mapSplasharts.Split,
            resourceFolder: "Map Splasharts",
            resourceFolderComment: "animHub_mapSplasharts_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }
    },
    this.rankbadges =
    {
        Iron1:
        {
            saveName: "Iron 1.png",
            uri: UriManager.resources.rankBadges.Iron1,
            dropboxPath : DropBoxPath.resources.rankBadges.Iron1,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Iron2:
        {
            saveName: "Iron 2.png",
            uri: UriManager.resources.rankBadges.Iron2,
            dropboxPath : DropBoxPath.resources.rankBadges.Iron2,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Iron3:
        {
            saveName: "Iron 3.png",
            uri: UriManager.resources.rankBadges.Iron3,
            dropboxPath : DropBoxPath.resources.rankBadges.Iron3,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Bronze1:
        {
            saveName: "Bronze 1.png",
            uri: UriManager.resources.rankBadges.Bronze1,
            dropboxPath : DropBoxPath.resources.rankBadges.Bronze1,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Bronze2:
        {
            saveName: "Bronze 2.png",
            uri: UriManager.resources.rankBadges.Bronze2,
            dropboxPath : DropBoxPath.resources.rankBadges.Bronze2,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Bronze3:
        {
            saveName: "Bronze 3.png",
            uri: UriManager.resources.rankBadges.Bronze3,
            dropboxPath : DropBoxPath.resources.rankBadges.Bronze3,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Silver1:
        {
            saveName: "Silver 1.png",
            uri: UriManager.resources.rankBadges.Silver1,
            dropboxPath : DropBoxPath.resources.rankBadges.Silver1,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Silver2:
        {
            saveName: "Silver 2.png",
            uri: UriManager.resources.rankBadges.Silver2,
            dropboxPath : DropBoxPath.resources.rankBadges.Silver2,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Silver3:
        {
            saveName: "Silver 3.png",
            uri: UriManager.resources.rankBadges.Silver3,
            dropboxPath : DropBoxPath.resources.rankBadges.Silver3,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Gold1:
        {
            saveName: "Gold 1.png",
            uri: UriManager.resources.rankBadges.Gold1,
            dropboxPath : DropBoxPath.resources.rankBadges.Gold1,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Gold2:
        {
            saveName: "Gold 2.png",
            uri: UriManager.resources.rankBadges.Gold2,
            dropboxPath : DropBoxPath.resources.rankBadges.Gold2,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Gold3:
        {
            saveName: "Gold 3.png",
            uri: UriManager.resources.rankBadges.Gold3,
            dropboxPath : DropBoxPath.resources.rankBadges.Gold3,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Platinum1:
        {
            saveName: "Platinum 1.png",
            uri: UriManager.resources.rankBadges.Platinum1,
            dropboxPath : DropBoxPath.resources.rankBadges.Platinum1,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Platinum2:
        {
            saveName: "Platinum 2.png",
            uri: UriManager.resources.rankBadges.Platinum2,
            dropboxPath : DropBoxPath.resources.rankBadges.Platinum2,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Platinum3:
        {
            saveName: "Platinum 3.png",
            uri: UriManager.resources.rankBadges.Platinum3,
            dropboxPath : DropBoxPath.resources.rankBadges.Platinum3,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Diamond1:
        {
            saveName: "Diamond 1.png",
            uri: UriManager.resources.rankBadges.Diamond1,
            dropboxPath : DropBoxPath.resources.rankBadges.Diamond1,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Diamond2:
        {
            saveName: "Diamond 2.png",
            uri: UriManager.resources.rankBadges.Diamond2,
            dropboxPath : DropBoxPath.resources.rankBadges.Diamond2,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Diamond3:
        {
            saveName: "Diamond 3.png",
            uri: UriManager.resources.rankBadges.Diamond3,
            dropboxPath : DropBoxPath.resources.rankBadges.Diamond3,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Ascendant1:
        {
            saveName: "Ascendant 1.png",
            uri: UriManager.resources.rankBadges.Ascendant1,
            dropboxPath : DropBoxPath.resources.rankBadges.Ascendant1,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Ascendant2:
        {
            saveName: "Ascendant 2.png",
            uri: UriManager.resources.rankBadges.Ascendant2,
            dropboxPath : DropBoxPath.resources.rankBadges.Ascendant2,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Ascendant3:
        {
            saveName: "Ascendant 3.png",
            uri: UriManager.resources.rankBadges.Ascendant3,
            dropboxPath : DropBoxPath.resources.rankBadges.Ascendant3,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Immortal1:
        {
            saveName: "Immortal 1.png",
            uri: UriManager.resources.rankBadges.Immortal1,
            dropboxPath : DropBoxPath.resources.rankBadges.Immortal1,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Immortal2:
        {
            saveName: "Immortal 2.png",
            uri: UriManager.resources.rankBadges.Immortal2,
            dropboxPath : DropBoxPath.resources.rankBadges.Immortal2,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Immortal3:
        {
            saveName: "Immortal 3.png",
            uri: UriManager.resources.rankBadges.Immortal3,
            dropboxPath : DropBoxPath.resources.rankBadges.Immortal3,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Radiant:
        {
            saveName: "Radiant.png",
            uri: UriManager.resources.rankBadges.Radiant,
            dropboxPath : DropBoxPath.resources.rankBadges.Radiant,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }
    },
    this.overlayPatterns =
    {
        DiagonalLines:
        {
            saveName: "SC Diagonal Lines.png",
            resourceFolder: "SC Overlay Patterns",
            resourceFolderComment: "animHub_overlayPatterns_[RF]",
            uri: UriManager.resources.overlayPatterns.DiagonalLines,
            dropboxPath : DropBoxPath.resources.overlayPatterns.DiagonalLines,
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        DiamondPattern:
        {
            saveName: "SC Diamond Pattern.png",
            resourceFolder: "SC Overlay Patterns",
            resourceFolderComment: "animHub_overlayPatterns_[RF]",
            uri: UriManager.resources.overlayPatterns.DiamondPattern,
            dropboxPath : DropBoxPath.resources.overlayPatterns.DiamondPattern,
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Halftone:
        {
            saveName: "SC Halftone Pattern.png",
            resourceFolder: "SC Overlay Patterns",
            resourceFolderComment: "animHub_overlayPatterns_[RF]",
            uri: UriManager.resources.overlayPatterns.Halftone,
            dropboxPath : DropBoxPath.resources.overlayPatterns.Halftone,
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Scratches:
        {
            saveName: "SC Scratches Overlay.jpg",
            resourceFolder: "Scratches Overlay",
            resourceFolderComment: "animHub_overlayPatterns_[RF]",
            uri: UriManager.resources.overlayPatterns.Scratches,
            dropboxPath : DropBoxPath.resources.overlayPatterns.Scratches,
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
    },
    this.roles =
    {
        Controller :
        {
            saveName: "Controller.png",
            uri: UriManager.resources.roles.Controller,
            dropboxPath : DropBoxPath.resources.roles.Controller,
            resourceFolder: "Roles",
            resourceFolderComment: "animHub_roles_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Duelist :
        {
            saveName: "Duelist.png",
            uri: UriManager.resources.roles.Duelist,
            dropboxPath : DropBoxPath.resources.roles.Duelist,
            resourceFolder: "Roles",
            resourceFolderComment: "animHub_roles_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Initiator :
        {
            saveName: "Initiator.png",
            uri: UriManager.resources.roles.Initiator,
            dropboxPath : DropBoxPath.resources.roles.Initiator,
            resourceFolder: "Roles",
            resourceFolderComment: "animHub_roles_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Sentinel :
        {
            saveName: "Sentinel.png",
            uri: UriManager.resources.roles.Sentinel,
            dropboxPath : DropBoxPath.resources.roles.Sentinel,
            resourceFolder: "Roles",
            resourceFolderComment: "animHub_roles_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },

    },
    this.socialMediaLogos =
    {
        Twitch :
        {
            saveName: "Twitch Logo.png",
            uri: UriManager.resources.socialMediaLogos.TwitchLogo,
            dropboxPath : DropBoxPath.resources.socialMediaLogos.TwitchLogo,
            resourceFolder: "Logos",
            resourceFolderComment: "animHub_logos_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Youtube :
        {
            saveName: "Youtube Logo.png",
            uri: UriManager.resources.socialMediaLogos.YoutubeLogo,
            dropboxPath : DropBoxPath.resources.socialMediaLogos.YoutubeLogo,
            resourceFolder: "Logos",
            resourceFolderComment: "animHub_logos_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        Twitter :
        {
            saveName: "Twitter Logo.png",
            uri: UriManager.resources.socialMediaLogos.TwitterLogo,
            dropboxPath : DropBoxPath.resources.socialMediaLogos.TwitterLogo,
            resourceFolder: "Logos",
            resourceFolderComment: "animHub_logos_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
    }
    this.spike =
    {
        Spike:
        {
            saveName: "Spike.png",
            uri: UriManager.resources.spike,
            dropboxPath : DropBoxPath.resources.spike.Spike,
            resourceFolder: "Spike",
            resourceFolderComment: "animHub_spike_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        }
    },
    this.video =
    {
        OutroScreen :
        {
            saveName: "outroScreen.mp4",
            uri: UriManager.resources.video.OutroScreen,
            dropboxPath : DropBoxPath.resources.video.OutroScreen,
            resourceFolder: "video",
            resourceFolderComment: "animHub_video_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}
        },
        DesktopSpaceholder :
        {
            saveName: "Desktop Spaceholder.mp4",
            uri: UriManager.resources.video.DesktopSpaceholder,
            dropboxPath : DropBoxPath.resources.video.DesktopSpaceholder,
            resourceFolder: "video",
            resourceFolderComment: "animHub_video_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.dropboxPath,this.uri)}      
        }

    }; 
    var myObject = undefined;
    var obj = this;
    for(category in obj)
    {
        for(item in obj[category])
        {
            if(obj[category][item].saveName == itemObject.name)
            {
                myObject = obj[category][item];
                break;
            };
        };
    };
    if(myObject==undefined){return undefined};
    return myObject
}