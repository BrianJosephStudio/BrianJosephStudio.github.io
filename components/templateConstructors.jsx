//Generate Template Function
function generateTemplate(templateName,commentTag,saveName,URL,URI,importToComp,hasMissingFiles,collapse,compArray)
{
    try
    {
        var myTemplate = findTemplate(commentTag);
        if (myTemplate==false)
        {
            downloadAndImport(saveName,URL,URI);
            if (hasMissingFiles==true){fixMissing(compArray)};
            return generateTemplate(templateName,commentTag,saveName,URL,URI,importToComp,hasMissingFiles,collapse,compArray)
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
    };
    return eval(this[valueType]);
}
ResourceFile = function(itemObject)
{
    function resolveFunction(saveName,url,uri)
    {
        if(new File(uri).exists!=true)
        {return downloadImportResource(saveName,url,uri)}
        else {return importFileToProject(new File(uri))}
    }
    this.agents = 
    {
        Astra:
        {
            saveName: "Astra.png",
            url: UrlManager.resources.agents.Astra,
            uri: UriManager.resources.agents.Astra,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },  
        Breach:
        {
            saveName: "Breach.png",
            url: UrlManager.resources.agents.Breach,
            uri: UriManager.resources.agents.Breach,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }, 
        Brimstone:
        {
            saveName: "Brimstone.png",
            url: UrlManager.resources.agents.Brimstone,
            uri: UriManager.resources.agents.Brimstone,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }, 
        Chamber:
        {
            saveName: "Chamber.png",
            url: UrlManager.resources.agents.Chamber,
            uri: UriManager.resources.agents.Chamber,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }, 
        Cypher:
        {
            saveName: "Cypher.png",
            url: UrlManager.resources.agents.Cypher,
            uri: UriManager.resources.agents.Cypher,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }, 
        Fade:
        {
            saveName: "Fade.png",
            url: UrlManager.resources.agents.Fade,
            uri: UriManager.resources.agents.Fade,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }, 
        Jett:
        {
            saveName: "Jett.png",
            url: UrlManager.resources.agents.Jett,
            uri: UriManager.resources.agents.Jett,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }, 
        KAYO:
        {
            saveName: "KAYO.png",
            url: UrlManager.resources.agents.KAYO,
            uri: UriManager.resources.agents.KAYO,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }, 
        Killjoy:
        {
            saveName: "Killjoy.png",
            url: UrlManager.resources.agents.Killjoy,
            uri: UriManager.resources.agents.Killjoy,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }, 
        Neon:
        {
            saveName: "Neon.png",
            url: UrlManager.resources.agents.Neon,
            uri: UriManager.resources.agents.Neon,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }, 
        Omen:
        {
            saveName: "Omen.png",
            url: UrlManager.resources.agents.Omen,
            uri: UriManager.resources.agents.Omen,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }, 
        Phoenix:
        {
            saveName: "Phoenix.png",
            url: UrlManager.resources.agents.Phoenix,
            uri: UriManager.resources.agents.Phoenix,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }, 
        Raze:
        {
            saveName: "Raze.png",
            url: UrlManager.resources.agents.Raze,
            uri: UriManager.resources.agents.Raze,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }, 
        Reyna:
        {
            saveName: "Reyna.png",
            url: UrlManager.resources.agents.Reyna,
            uri: UriManager.resources.agents.Reyna,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }, 
        Sage:
        {
            saveName: "Sage.png",
            url: UrlManager.resources.agents.Sage,
            uri: UriManager.resources.agents.Sage,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }, 
        Skye:
        {
            saveName: "Skye.png",
            url: UrlManager.resources.agents.Skye,
            uri: UriManager.resources.agents.Skye,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }, 
        Sova:
        {
            saveName: "Sova.png",
            url: UrlManager.resources.agents.Sova,
            uri: UriManager.resources.agents.Sova,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }, 
        Viper:
        {
            saveName: "Viper.png",
            url: UrlManager.resources.agents.Viper,
            uri: UriManager.resources.agents.Viper,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }, 
        Yoru:
        {
            saveName: "Yoru.png",
            url: UrlManager.resources.agents.Yoru,
            uri: UriManager.resources.agents.Yoru,
            resourceFolder: "Agents",
            resourceFolderComment: "animHub_agents_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }
        
    },
    this.guns =
    {
        Ares:
        {
            saveName: "Ares.png",
            url: UrlManager.resources.guns.Ares,
            uri: UriManager.resources.guns.Ares,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Bucky:
        {
            saveName: "Bucky.png",
            url: UrlManager.resources.guns.Bucky,
            uri: UriManager.resources.guns.Bucky,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Bulldog:
        {
            saveName: "Bulldog.png",
            url: UrlManager.resources.guns.Bulldog,
            uri: UriManager.resources.guns.Bulldog,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Classic:
        {
            saveName: "Classic.png",
            url: UrlManager.resources.guns.Classic,
            uri: UriManager.resources.guns.Classic,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Frenzy:
        {
            saveName: "Frenzy.png",
            url: UrlManager.resources.guns.Frenzy,
            uri: UriManager.resources.guns.Frenzy,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Ghost:
        {
            saveName: "Ghost.png",
            url: UrlManager.resources.guns.Ghost,
            uri: UriManager.resources.guns.Ghost,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Guardian:
        {
            saveName: "Guardian.png",
            url: UrlManager.resources.guns.Guardian,
            uri: UriManager.resources.guns.Guardian,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Judge:
        {
            saveName: "Judge.png",
            url: UrlManager.resources.guns.Judge,
            uri: UriManager.resources.guns.Judge,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Marshal:
        {
            saveName: "Marshal.png",
            url: UrlManager.resources.guns.Marshal,
            uri: UriManager.resources.guns.Marshal,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Odin:
        {
            saveName: "Odin.png",
            url: UrlManager.resources.guns.Odin,
            uri: UriManager.resources.guns.Odin,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Operator:
        {
            saveName: "Operator.png",
            url: UrlManager.resources.guns.Operator,
            uri: UriManager.resources.guns.Operator,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Phantom:
        {
            saveName: "Phantom.png",
            url: UrlManager.resources.guns.Phantom,
            uri: UriManager.resources.guns.Phantom,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Sheriff:
        {
            saveName: "Sheriff.png",
            url: UrlManager.resources.guns.Sheriff,
            uri: UriManager.resources.guns.Sheriff,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Shorty:
        {
            saveName: "Shorty.png",
            url: UrlManager.resources.guns.Shorty,
            uri: UriManager.resources.guns.Shorty,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Spectre:
        {
            saveName: "Spectre.png",
            url: UrlManager.resources.guns.Spectre,
            uri: UriManager.resources.guns.Spectre,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Stinger:
        {
            saveName: "Stinger.png",
            url: UrlManager.resources.guns.Stinger,
            uri: UriManager.resources.guns.Stinger,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Vandal:
        {
            saveName: "Vandal.png",
            url: UrlManager.resources.guns.Vandal,
            uri: UriManager.resources.guns.Vandal,
            resourceFolder: "Guns",
            resourceFolderComment: "animHub_guns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }
    },
    this.armor = 
    {
        heavyShield:
        {
            saveName: "Heavy Shield.png",
            url: UrlManager.resources.armor.heavyShield,
            uri: UriManager.resources.armor.heavyShield,
            resourceFolder: "Armor",
            resourceFolderComment: "animHub_armor_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        lightShield:
        {
            saveName: "Light Shield.png",
            url: UrlManager.resources.armor.lightShield,
            uri: UriManager.resources.armor.lightShield,
            resourceFolder: "Armor",
            resourceFolderComment: "animHub_armor_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }
    },
    this.creditsIcon = 
    {
        creditsIcon:
        {
            saveName: "Credits Icon.png",
            url: UrlManager.resources.creditsIcon.creditsIcon,
            uri: UriManager.resources.creditsIcon.creditsIcon,
            resourceFolder: "Credits Icon",
            resourceFolderComment: "animHub_creditsIcon_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }
    },
    this.maps =
    {
        Ascent:
        {
            saveName: "Ascent.png",
            url: UrlManager.resources.maps.Ascent,
            uri: UriManager.resources.maps.Ascent,
            resourceFolder: "Maps",
            resourceFolderComment: "animHub_maps_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Bind:
        {
            saveName: "Bind.png",
            url: UrlManager.resources.maps.Bind,
            uri: UriManager.resources.maps.Bind,
            resourceFolder: "Maps",
            resourceFolderComment: "animHub_maps_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Breeze:
        {
            saveName: "Breeze.png",
            url: UrlManager.resources.maps.Breeze,
            uri: UriManager.resources.maps.Breeze,
            resourceFolder: "Maps",
            resourceFolderComment: "animHub_maps_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Fracture:
        {
            saveName: "Fracture.png",
            url: UrlManager.resources.maps.Fracture,
            uri: UriManager.resources.maps.Fracture,
            resourceFolder: "Maps",
            resourceFolderComment: "animHub_maps_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Haven:
        {
            saveName: "Haven.png",
            url: UrlManager.resources.maps.Haven,
            uri: UriManager.resources.maps.Haven,
            resourceFolder: "Maps",
            resourceFolderComment: "animHub_maps_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Icebox:
        {
            saveName: "Icebox.png",
            url: UrlManager.resources.maps.Icebox,
            uri: UriManager.resources.maps.Icebox,
            resourceFolder: "Maps",
            resourceFolderComment: "animHub_maps_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
       Pearl:
        {
            saveName: "Pearl.png",
            url: UrlManager.resources.maps.Pearl,
            uri: UriManager.resources.maps.Pearl,
            resourceFolder: "Maps",
            resourceFolderComment: "animHub_maps_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Split:
        {
            saveName: "Split.png",
            url: UrlManager.resources.maps.Split,
            uri: UriManager.resources.maps.Split,
            resourceFolder: "Maps",
            resourceFolderComment: "animHub_maps_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }
    },
    this.mapSplasharts =
    {
        Ascent:
        {
            saveName: "Ascent Splashart.png",
            url: UrlManager.resources.mapSplasharts.Ascent,
            uri: UriManager.resources.mapSplasharts.Ascent,
            resourceFolder: "Map Splasharts",
            resourceFolderComment: "animHub_mapSplasharts_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Bind:
        {
            saveName: "Bind Splashart.png",
            url: UrlManager.resources.mapSplasharts.Bind,
            uri: UriManager.resources.mapSplasharts.Bind,
            resourceFolder: "Map Splasharts",
            resourceFolderComment: "animHub_mapSplasharts_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Breeze:
        {
            saveName: "Breeze Splashart.png",
            url: UrlManager.resources.mapSplasharts.Breeze,
            uri: UriManager.resources.mapSplasharts.Breeze,
            resourceFolder: "Map Splasharts",
            resourceFolderComment: "animHub_mapSplasharts_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Fracture:
        {
            saveName: "Fracture Splashart.png",
            url: UrlManager.resources.mapSplasharts.Fracture,
            uri: UriManager.resources.mapSplasharts.Fracture,
            resourceFolder: "Map Splasharts",
            resourceFolderComment: "animHub_mapSplasharts_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Haven:
        {
            saveName: "Haven Splashart.png",
            url: UrlManager.resources.mapSplasharts.Haven,
            uri: UriManager.resources.mapSplasharts.Haven,
            resourceFolder: "Map Splasharts",
            resourceFolderComment: "animHub_mapSplasharts_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Icebox:
        {
            saveName: "Icebox Splashart.png",
            url: UrlManager.resources.mapSplasharts.Icebox,
            uri: UriManager.resources.mapSplasharts.Icebox,
            resourceFolder: "Map Splasharts",
            resourceFolderComment: "animHub_mapSplasharts_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
       Pearl:
        {
            saveName: "Pearl Splashart.png",
            url: UrlManager.resources.mapSplasharts.Pearl,
            uri: UriManager.resources.mapSplasharts.Pearl,
            resourceFolder: "Map Splasharts",
            resourceFolderComment: "animHub_mapSplasharts_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Split:
        {
            saveName: "Split Splashart.png",
            url: UrlManager.resources.mapSplasharts.Split,
            uri: UriManager.resources.mapSplasharts.Split,
            resourceFolder: "Map Splasharts",
            resourceFolderComment: "animHub_mapSplasharts_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }
    },
    this.rankbadges =
    {
        Iron1:
        {
            saveName: "Iron 1.png",
            url: UrlManager.resources.rankBadges.Iron1,
            uri: UriManager.resources.rankBadges.Iron1,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Iron2:
        {
            saveName: "Iron 2.png",
            url: UrlManager.resources.rankBadges.Iron2,
            uri: UriManager.resources.rankBadges.Iron2,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Iron3:
        {
            saveName: "Iron 3.png",
            url: UrlManager.resources.rankBadges.Iron3,
            uri: UriManager.resources.rankBadges.Iron3,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Bronze1:
        {
            saveName: "Bronze 1.png",
            url: UrlManager.resources.rankBadges.Bronze1,
            uri: UriManager.resources.rankBadges.Bronze1,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Bronze2:
        {
            saveName: "Bronze 2.png",
            url: UrlManager.resources.rankBadges.Bronze2,
            uri: UriManager.resources.rankBadges.Bronze2,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Bronze3:
        {
            saveName: "Bronze 3.png",
            url: UrlManager.resources.rankBadges.Bronze3,
            uri: UriManager.resources.rankBadges.Bronze3,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Silver1:
        {
            saveName: "Silver 1.png",
            url: UrlManager.resources.rankBadges.Silver1,
            uri: UriManager.resources.rankBadges.Silver1,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Silver2:
        {
            saveName: "Silver 2.png",
            url: UrlManager.resources.rankBadges.Silver2,
            uri: UriManager.resources.rankBadges.Silver2,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Silver3:
        {
            saveName: "Silver 3.png",
            url: UrlManager.resources.rankBadges.Silver3,
            uri: UriManager.resources.rankBadges.Silver3,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Gold1:
        {
            saveName: "Gold 1.png",
            url: UrlManager.resources.rankBadges.Gold1,
            uri: UriManager.resources.rankBadges.Gold1,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Gold2:
        {
            saveName: "Gold 2.png",
            url: UrlManager.resources.rankBadges.Gold2,
            uri: UriManager.resources.rankBadges.Gold2,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Gold3:
        {
            saveName: "Gold 3.png",
            url: UrlManager.resources.rankBadges.Gold3,
            uri: UriManager.resources.rankBadges.Gold3,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Platinum1:
        {
            saveName: "Platinum 1.png",
            url: UrlManager.resources.rankBadges.Platinum1,
            uri: UriManager.resources.rankBadges.Platinum1,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Platinum2:
        {
            saveName: "Platinum 2.png",
            url: UrlManager.resources.rankBadges.Platinum2,
            uri: UriManager.resources.rankBadges.Platinum2,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Platinum3:
        {
            saveName: "Platinum 3.png",
            url: UrlManager.resources.rankBadges.Platinum3,
            uri: UriManager.resources.rankBadges.Platinum3,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Diamond1:
        {
            saveName: "Diamond 1.png",
            url: UrlManager.resources.rankBadges.Diamond1,
            uri: UriManager.resources.rankBadges.Diamond1,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Diamond2:
        {
            saveName: "Diamond 2.png",
            url: UrlManager.resources.rankBadges.Diamond2,
            uri: UriManager.resources.rankBadges.Diamond2,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Diamond3:
        {
            saveName: "Diamond 3.png",
            url: UrlManager.resources.rankBadges.Diamond3,
            uri: UriManager.resources.rankBadges.Diamond3,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Ascendant1:
        {
            saveName: "Ascendant 1.png",
            url: UrlManager.resources.rankBadges.Ascendant1,
            uri: UriManager.resources.rankBadges.Ascendant1,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Ascendant2:
        {
            saveName: "Ascendant 2.png",
            url: UrlManager.resources.rankBadges.Ascendant2,
            uri: UriManager.resources.rankBadges.Ascendant2,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Ascendant3:
        {
            saveName: "Ascendant 3.png",
            url: UrlManager.resources.rankBadges.Ascendant3,
            uri: UriManager.resources.rankBadges.Ascendant3,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Immortal1:
        {
            saveName: "Immortal 1.png",
            url: UrlManager.resources.rankBadges.Immortal1,
            uri: UriManager.resources.rankBadges.Immortal1,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Immortal2:
        {
            saveName: "Immortal 2.png",
            url: UrlManager.resources.rankBadges.Immortal2,
            uri: UriManager.resources.rankBadges.Immortal2,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Immortal3:
        {
            saveName: "Immortal 3.png",
            url: UrlManager.resources.rankBadges.Immortal3,
            uri: UriManager.resources.rankBadges.Immortal3,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Radiant:
        {
            saveName: "Radiant.png",
            url: UrlManager.resources.rankBadges.Radiant,
            uri: UriManager.resources.rankBadges.Radiant,
            resourceFolder: "Rank Badges",
            resourceFolderComment: "animHub_rankBadges_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }
    },
    this.overlayPatterns =
    {
        DiagonalLines:
        {
            saveName: "SC Diagonal Lines.png",
            resourceFolder: "SC Overlay Patterns",
            resourceFolderComment: "animHub_overlayPatterns_[RF]",
            url: UrlManager.resources.overlayPatterns.DiagonalLines,
            uri: UriManager.resources.overlayPatterns.DiagonalLines,
            resourceFolder: "SC Overlay Patterns",
            resourceFolderComment: "animHub_overlayPatterns_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        DiamondPattern:
        {
            saveName: "SC Diamond Pattern.png",
            resourceFolder: "SC Overlay Patterns",
            resourceFolderComment: "animHub_overlayPatterns_[RF]",
            url: UrlManager.resources.overlayPatterns.DiamondPattern,
            uri: UriManager.resources.overlayPatterns.DiamondPattern,
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Halftone:
        {
            saveName: "SC Halftone Pattern.png",
            resourceFolder: "SC Overlay Patterns",
            resourceFolderComment: "animHub_overlayPatterns_[RF]",
            url: UrlManager.resources.overlayPatterns.Halftone,
            uri: UriManager.resources.overlayPatterns.Halftone,
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Scratches:
        {
            saveName: "SC Scratches Overlay.jpg",
            resourceFolder: "Scratches Overlay",
            resourceFolderComment: "animHub_overlayPatterns_[RF]",
            url: UrlManager.resources.overlayPatterns.Scratches,
            uri: UriManager.resources.overlayPatterns.Scratches,
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
    },
    this.roles =
    {
        Controller :
        {
            saveName: "Controller.png",
            url: UrlManager.resources.overlayPatterns.Controller,
            uri: UriManager.resources.overlayPatterns.Controller,
            resourceFolder: "Roles",
            resourceFolderComment: "animHub_roles_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Duelist :
        {
            saveName: "Duelist.png",
            url: UrlManager.resources.overlayPatterns.Duelist,
            uri: UriManager.resources.overlayPatterns.Duelist,
            resourceFolder: "Roles",
            resourceFolderComment: "animHub_roles_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Initiator :
        {
            saveName: "Initiator.png",
            url: UrlManager.resources.overlayPatterns.Initiator,
            uri: UriManager.resources.overlayPatterns.Initiator,
            resourceFolder: "Roles",
            resourceFolderComment: "animHub_roles_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Sentinel :
        {
            saveName: "Sentinel.png",
            url: UrlManager.resources.overlayPatterns.Sentinel,
            uri: UriManager.resources.overlayPatterns.Sentinel,
            resourceFolder: "Roles",
            resourceFolderComment: "animHub_roles_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },

    },
    this.socialMediaLogos =
    {
        Twitch :
        {
            saveName: "Twitch Logo.png",
            url: UrlManager.resources.socialMediaLogos.TwitchLogo,
            uri: UriManager.resources.socialMediaLogos.TwitchLogo,
            resourceFolder: "Logos",
            resourceFolderComment: "animHub_logos_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Youtube :
        {
            saveName: "Youtube Logo.png",
            url: UrlManager.resources.socialMediaLogos.YoutubeLogo,
            uri: UriManager.resources.socialMediaLogos.YoutubeLogo,
            resourceFolder: "Logos",
            resourceFolderComment: "animHub_logos_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
        Twitter :
        {
            saveName: "Twitter Logo.png",
            url: UrlManager.resources.socialMediaLogos.TwitterLogo,
            uri: UriManager.resources.socialMediaLogos.TwitterLogo,
            resourceFolder: "Logos",
            resourceFolderComment: "animHub_logos_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        },
    }
    this.spike =
    {
        Spike:
        {
            saveName: "Spike.png",
            url: UrlManager.resources.spike,
            uri: UriManager.resources.spike,
            resourceFolder: "Spike",
            resourceFolderComment: "animHub_spike_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
        }
    },
    this.outroScreen =
    {
        outroScreen :
        {
            saveName: "outroScreen.mp4",
            url: UrlManager.resources.outroScreen,
            uri: UriManager.resources.outroScreen,
            resourceFolder: "Outro Screen",
            resourceFolderComment: "animHub_outroScreen_[RF]",
            resolve: function(){return resolveFunction(this.saveName,this.url,this.uri)}
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