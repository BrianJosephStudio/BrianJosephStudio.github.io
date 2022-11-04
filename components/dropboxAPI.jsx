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
    var accTk = File("~/DOCUMENTS/Animator%20Hub/json%20Files/accTk.txt");
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
        alert(command)
        var path = Folder(uri.path);
        system.callSystem('cmd.exe /c cd \\ && cd '+path.fsName+' && '+command)
        return uri;
    };
    return eval("this."+type)
}
var DropBoxPath =
{
    resources :
    {
        agents :
        {
            Astra : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Astra.png",
            Breach : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Breach.png",
            Brimstone : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Brimstone.png",
            Chamber : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Chamber.png",
            Cypher : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Cypher.png",
            Fade : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Fade.png",
            Harbor: "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Harbor.webp",
            Jett : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Jett.png",
            KAYO : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/KAYO.png",
            Killjoy : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Killjoy.png",
            Neon : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Neon.png",
            Omen : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Omen.png",
            Phoenix : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Phoenix.png",
            Raze : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Raze.png",
            Reyna : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Reyna.png",
            Sage : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Sage.png",
            Skye : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Skye.png",
            Sova : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Sova.png",
            Viper : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Viper.png",
            Yoru : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Agents/Yoru.png",
        },
        guns :
        {
            Ares : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Guns/Ares.png",
            Bucky : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Guns/Bucky.png",
            Bulldog : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Guns/Bulldog.png",
            Classic : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Guns/Classic.png",
            Frenzy : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Guns/Frenzy.png",
            Ghost : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Guns/Ghost.png",
            Guardian : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Guns/Guardian.png",
            Judge : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Guns/Judge.png",
            Marshal : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Guns/Marshal.png",
            Odin : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Guns/Odin.png",
            Operator : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Guns/Operator.png",
            Phantom : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Guns/Phantom.png",
            Sheriff : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Guns/Sheriff.png",
            Shorty : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Guns/Shorty.png",
            Spectre : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Guns/Spectre.png",
            Stinger : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Guns/Stinger.png",
            Vandal : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Guns/Vandal.png",
        },
        armor:
        {
            HeavyShield : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Armor/Heavy Shield.png",
            LightShield : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Armor/Light Shield.png",
        },
        creditsIcon: 
        {
            CreditsIcon : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/creditsIcon/Credits Icon.png"
        },
        maps :
        {
            Ascent : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Maps/Ascent.png",
            Bind : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Maps/Bind.png",
            Breeze : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Maps/Breeze.png",
            Fracture : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Maps/Fracture.png",
            Haven : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Maps/Haven.png",
            Icebox : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Maps/Icebox.png",
            Pearl : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Maps/Pearl.png",
            Split :"/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Maps/Split.png"
        },
        mapSplasharts :
        {
            Ascent : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/mapSplasharts/Ascent Splashart.png",
            Bind : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/mapSplasharts/Bind Splashart.png",
            Breeze : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/mapSplasharts/Breeze Splashart.png",
            Fracture : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/mapSplasharts/Fracture Splashart.png",
            Haven : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/mapSplasharts/Haven Splashart.png",
            Icebox : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/mapSplasharts/Icebox Splashart.png",
            Pearl : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/mapSplasharts/Pearl Splashart.png",
            Split : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/mapSplasharts/Split Splashart.png"
        },
        rankBadges : 
        {
            Iron1 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Iron 1.png",
            Iron2 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Iron 2.png",
            Iron3 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Iron 3.png",
            Bronze1 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Bronze 1.png",
            Bronze2 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Bronze 2.png",
            Bronze3 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Bronze 3.png",
            Silver1 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Silver 1.png",
            Silver2 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Silver 2.png",
            Silver3 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Silver 3.png",
            Gold1 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Gold 1.png",
            Gold2 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Gold 2.png",
            Gold3 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Gold 3.png",
            Platinum1 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Platinum 1.png",
            Platinum2 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Platinum 2.png",
            Platinum3 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Platinum 3.png",
            Diamond1 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Diamond 1.png",
            Diamond2 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Diamond 2.png",
            Diamond3 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Diamond 3.png",
            Ascendant1 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Ascendant 1.png",
            Ascendant2 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Ascendant 2.png",
            Ascendant3 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Ascendant 3.png",
            Immortal1 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Immortal 1.png",
            Immortal2 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Immortal 2.png",
            Immortal3 : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Immortal 3.png",
            Radiant : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/rankBadges/Radiant.png",
            
        },
        overlayPatterns :
        {
            DiagonalLines : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/overlayPatterns/SC Diagonal Lines.png",
            DiamondPattern : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/overlayPatterns/SC Diamond Pattern.png",
            Halftone : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/overlayPatterns/SC Halftone Pattern.png",
            Scratches : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/overlayPatterns/SC Scratches Overlay.jpg"
        },
        roles :
        {
            Controller : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Roles/Controller.png",
            Duelist : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Roles/Duelist.png",
            Initiator : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Roles/Initiator.png",
            Sentinel : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Roles/Sentinel.png",
        },
        socialMediaLogos : 
        {
            TwitchLogo : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/socialMediaLogos/Twitch Logo.png",
            YoutubeLogo : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/socialMediaLogos/Youtube Logo.png",
            TwitterLogo : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/socialMediaLogos/Twitter Logo.png",
        },
        spike : 
        {
            Spike : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/Spike/Spike.png"
        },
        outroScreen: 
        {
            OutroScreen : "/Animator_Hub_Database/BrianJosephStudio.github.io/resources/outroScreen/outroScreen.mp4"
        }
    }
}