var refreshToken = "URftscBcTpAAAAAAAAAAAWlpxlguHizvvF7xZd2aqYb4W9D9Xfp01QrBdayJIGpv";
function AccessToken()
{
    function generateToken(accTk)
    {
        var command = "curl -s https://api.dropbox.com/oauth2/token -d grant_type=refresh_token -d refresh_token="+refreshToken+" -u ezvsqb5qklsy5h5:j5e4s5njjdpb8hl";
        var request = system.callSystem(command);
        var response = parseJson(request);
        accTk.open('w');
        accTk.write(response.access_token.slice(2,-1));
        accTk.close()
        return response.access_token;
    };
        // Get the last Access Token.
    var accTk = File("~/DOCUMENTS/Animator Hub/json Files/accTk.txt");
    if(accTk.exists == false)
    {
        accTk.open('w');
        accTk.write("");
        accTk.close();
        return generateToken(accTk)
    }
    else
    {
        accTk.open('r');
        var accessToken = accTk.read();
        accTk.close();
        var command = 'curl -s -X POST https://api.dropboxapi.com/2/check/user --header "Authorization: Bearer '+accessToken+'" --header "Content-Type: application/json" --data "{\\"query\\":\\"valid\\"}"'    
        var request = system.callSystem(command);
        //We turn request response iinto a json object
        var response = parseJson(request);
        //Access token is valid and we can return it for use 
        if(response.result == valid) { return accessToken}
        else {return generateToken(accTk)}
    }
};
DropBox = function(type)
{
    // downloads a file from dropbox to the specified uri. Uri must be a File object
    this.download = function(saveName,dropboxPath,uri,accessToken)
    {
        var command = 'curl -o "'+saveName+'" -X POST https://content.dropboxapi.com/2/files/download --header "Authorization: Bearer '+accessToken+'" --header "Dropbox-API-Arg: {\\"path\\":\\"'+dropboxPath+'\\"}"'
        var path = Folder(uri.path);
        system.callSystem('cmd.exe /c cd \\ && cd '+path.fsName+' && '+command)
        return uri;
    };
    return eval("this."+type)
}
var DropBoxPath =
{
    template : 
    {
        agentIcon : "/brianjosephstudio.github.io/Animator_Hub/templates/Agent Icon.aep",
        topBanner : "/brianjosephstudio.github.io/Animator_Hub/templates/Top Banner.aep",
        agentStatsTable : "/brianjosephstudio.github.io/Animator_Hub/templates/Agent Stats Table.aep",
        mapOverviews : "/brianjosephstudio.github.io/Animator_Hub/templates/Map Overviews.aep",
        globalTopicReference : "/brianjosephstudio.github.io/Animator_Hub/templates/Global Topic Reference.aep",
        topicTitle : "/brianjosephstudio.github.io/Animator_Hub/templates/Topic Title.aep",
        topicDisplay : "/brianjosephstudio.github.io/Animator_Hub/templates/Topic Display.aep",
        introScreen : "/brianjosephstudio.github.io/Animator_Hub/templates/Intro Screen.aep",
        outroScreen : '/brianjosephstudio.github.io/Animator_Hub/templates/Outro Screen.aep',
        creatorTag : '/brianjosephstudio.github.io/Animator_Hub/templates/Content Creator Tag.aep',
        waterMark : '/brianjosephstudio.github.io/Animator_Hub/templates/SC_Watermark.aep',
        callToAction1 : '/brianjosephstudio.github.io/Animator_Hub/templates/callToAction1.aep'
    },
    resources :
    {
        agents :
        {
            Astra : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Astra.png",
            Breach : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Breach.png",
            Brimstone : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Brimstone.png",
            Chamber : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Chamber.png",
            Cypher : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Cypher.png",
            Fade : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Fade.png",
            Harbor: "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Harbor.webp",
            Jett : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Jett.png",
            KAYO : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/KAYO.png",
            Killjoy : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Killjoy.png",
            Neon : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Neon.png",
            Omen : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Omen.png",
            Phoenix : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Phoenix.png",
            Raze : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Raze.png",
            Reyna : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Reyna.png",
            Sage : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Sage.png",
            Skye : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Skye.png",
            Sova : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Sova.png",
            Viper : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Viper.png",
            Yoru : "/BrianJosephStudio.github.io/Animator_Hub/resources/Agents/Yoru.png",
        },
        guns :
        {
            Ares : "/BrianJosephStudio.github.io/Animator_Hub/resources/Guns/Ares.png",
            Bucky : "/BrianJosephStudio.github.io/Animator_Hub/resources/Guns/Bucky.png",
            Bulldog : "/BrianJosephStudio.github.io/Animator_Hub/resources/Guns/Bulldog.png",
            Classic : "/BrianJosephStudio.github.io/Animator_Hub/resources/Guns/Classic.png",
            Frenzy : "/BrianJosephStudio.github.io/Animator_Hub/resources/Guns/Frenzy.png",
            Ghost : "/BrianJosephStudio.github.io/Animator_Hub/resources/Guns/Ghost.png",
            Guardian : "/BrianJosephStudio.github.io/Animator_Hub/resources/Guns/Guardian.png",
            Judge : "/BrianJosephStudio.github.io/Animator_Hub/resources/Guns/Judge.png",
            Marshal : "/BrianJosephStudio.github.io/Animator_Hub/resources/Guns/Marshal.png",
            Odin : "/BrianJosephStudio.github.io/Animator_Hub/resources/Guns/Odin.png",
            Operator : "/BrianJosephStudio.github.io/Animator_Hub/resources/Guns/Operator.png",
            Phantom : "/BrianJosephStudio.github.io/Animator_Hub/resources/Guns/Phantom.png",
            Sheriff : "/BrianJosephStudio.github.io/Animator_Hub/resources/Guns/Sheriff.png",
            Shorty : "/BrianJosephStudio.github.io/Animator_Hub/resources/Guns/Shorty.png",
            Spectre : "/BrianJosephStudio.github.io/Animator_Hub/resources/Guns/Spectre.png",
            Stinger : "/BrianJosephStudio.github.io/Animator_Hub/resources/Guns/Stinger.png",
            Vandal : "/BrianJosephStudio.github.io/Animator_Hub/resources/Guns/Vandal.png",
        },
        armor:
        {
            HeavyShield : "/BrianJosephStudio.github.io/Animator_Hub/resources/Armor/Heavy Shield.png",
            LightShield : "/BrianJosephStudio.github.io/Animator_Hub/resources/Armor/Light Shield.png",
        },
        creditsIcon: 
        {
            CreditsIcon : "/BrianJosephStudio.github.io/Animator_Hub/resources/creditsIcon/Credits Icon.png"
        },
        maps :
        {
            Ascent : "/BrianJosephStudio.github.io/Animator_Hub/resources/Maps/Ascent.png",
            Bind : "/BrianJosephStudio.github.io/Animator_Hub/resources/Maps/Bind.png",
            Breeze : "/BrianJosephStudio.github.io/Animator_Hub/resources/Maps/Breeze.png",
            Fracture : "/BrianJosephStudio.github.io/Animator_Hub/resources/Maps/Fracture.png",
            Haven : "/BrianJosephStudio.github.io/Animator_Hub/resources/Maps/Haven.png",
            Icebox : "/BrianJosephStudio.github.io/Animator_Hub/resources/Maps/Icebox.png",
            Pearl : "/BrianJosephStudio.github.io/Animator_Hub/resources/Maps/Pearl.png",
            Split :"/BrianJosephStudio.github.io/Animator_Hub/resources/Maps/Split.png"
        },
        mapSplasharts :
        {
            Ascent : "/BrianJosephStudio.github.io/Animator_Hub/resources/mapSplasharts/Ascent Splashart.png",
            Bind : "/BrianJosephStudio.github.io/Animator_Hub/resources/mapSplasharts/Bind Splashart.png",
            Breeze : "/BrianJosephStudio.github.io/Animator_Hub/resources/mapSplasharts/Breeze Splashart.png",
            Fracture : "/BrianJosephStudio.github.io/Animator_Hub/resources/mapSplasharts/Fracture Splashart.png",
            Haven : "/BrianJosephStudio.github.io/Animator_Hub/resources/mapSplasharts/Haven Splashart.png",
            Icebox : "/BrianJosephStudio.github.io/Animator_Hub/resources/mapSplasharts/Icebox Splashart.png",
            Pearl : "/BrianJosephStudio.github.io/Animator_Hub/resources/mapSplasharts/Pearl Splashart.png",
            Split : "/BrianJosephStudio.github.io/Animator_Hub/resources/mapSplasharts/Split Splashart.png"
        },
        rankBadges : 
        {
            Iron1 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Iron 1.png",
            Iron2 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Iron 2.png",
            Iron3 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Iron 3.png",
            Bronze1 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Bronze 1.png",
            Bronze2 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Bronze 2.png",
            Bronze3 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Bronze 3.png",
            Silver1 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Silver 1.png",
            Silver2 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Silver 2.png",
            Silver3 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Silver 3.png",
            Gold1 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Gold 1.png",
            Gold2 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Gold 2.png",
            Gold3 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Gold 3.png",
            Platinum1 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Platinum 1.png",
            Platinum2 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Platinum 2.png",
            Platinum3 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Platinum 3.png",
            Diamond1 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Diamond 1.png",
            Diamond2 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Diamond 2.png",
            Diamond3 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Diamond 3.png",
            Ascendant1 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Ascendant 1.png",
            Ascendant2 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Ascendant 2.png",
            Ascendant3 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Ascendant 3.png",
            Immortal1 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Immortal 1.png",
            Immortal2 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Immortal 2.png",
            Immortal3 : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Immortal 3.png",
            Radiant : "/BrianJosephStudio.github.io/Animator_Hub/resources/rankBadges/Radiant.png",
            
        },
        overlayPatterns :
        {
            DiagonalLines : "/BrianJosephStudio.github.io/Animator_Hub/resources/overlayPatterns/SC Diagonal Lines.png",
            DiamondPattern : "/BrianJosephStudio.github.io/Animator_Hub/resources/overlayPatterns/SC Diamond Pattern.png",
            Halftone : "/BrianJosephStudio.github.io/Animator_Hub/resources/overlayPatterns/SC Halftone Pattern.png",
            Scratches : "/BrianJosephStudio.github.io/Animator_Hub/resources/overlayPatterns/SC Scratches Overlay.jpg"
        },
        roles :
        {
            Controller : "/BrianJosephStudio.github.io/Animator_Hub/resources/Roles/Controller.png",
            Duelist : "/BrianJosephStudio.github.io/Animator_Hub/resources/Roles/Duelist.png",
            Initiator : "/BrianJosephStudio.github.io/Animator_Hub/resources/Roles/Initiator.png",
            Sentinel : "/BrianJosephStudio.github.io/Animator_Hub/resources/Roles/Sentinel.png",
        },
        socialMediaLogos : 
        {
            TwitchLogo : "/BrianJosephStudio.github.io/Animator_Hub/resources/socialMediaLogos/Twitch Logo.png",
            YoutubeLogo : "/BrianJosephStudio.github.io/Animator_Hub/resources/socialMediaLogos/Youtube Logo.png",
            TwitterLogo : "/BrianJosephStudio.github.io/Animator_Hub/resources/socialMediaLogos/Twitter Logo.png",
        },
        spike : 
        {
            Spike : "/BrianJosephStudio.github.io/Animator_Hub/resources/Spike/Spike.png"
        },
        video: 
        {
            OutroScreen : "/BrianJosephStudio.github.io/Animator_Hub/resources/outroScreen/outroScreen.mp4",
            DesktopSpaceholder : "/BrianJosephStudio.github.io/Animator_Hub/resources/CTA/Desktop Spaceholder.mp4"
        }
    }
}