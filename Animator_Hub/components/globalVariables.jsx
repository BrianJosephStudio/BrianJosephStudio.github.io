//Global Variables
var targetComp = 0;
var agentsArray = ['Astra', 'Breach', 'Brimstone', 'Chamber', 'Clove', 'Cypher', 'Deadlock', 'Fade', 'Gekko', 'Harbor', 'Iso', 'Jett', 'KAY/O', 'Killjoy', 'Neon', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Skye', 'Sova', 'Viper', 'Yoru'];
var mapsArray = ['Abyss', 'Ascent', 'Bind', 'Breeze', 'Fracture', 'Haven', 'Icebox', 'Lotus', 'Pearl', 'Split', 'Sunset'];
var agentIconArray = ['No Agent', 'Astra', 'Breach', 'Brimstone', 'Chamber', 'Clove', 'Cypher', 'Deadlock', 'Fade', 'Gekko', 'Harbor', 'Iso', 'Jett', 'KAY/O', 'Killjoy', 'Neon', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Skye', 'Sova', 'Viper', 'Yoru'];
var gunsArray = ['Ares', 'Bucky', 'Bulldog', 'Classic', 'Frenzy', 'Ghost', 'Guardian', 'Judge', 'Marshal', 'Odin', 'Operator', 'Phantom', 'Sheriff', 'Shorty', 'Spectre', 'Stinger', 'Vandal']
var gtrTitleArray = ['Title 1', 'Title 2', 'Title 3', 'Title 4', 'Title 5', 'Title 6', 'Title 7', 'Title 8', 'Title 9', 'Title 10', 'Title 11', 'Title 12', 'Title 13', 'Title 14', 'Title 15', 'Title 16', 'Title 17', 'Title 18', 'Title 19', 'Title 20', 'Title 21', 'Title 22', 'Title 23', 'Title 24', 'Title 25', 'Title 26', 'Title 27', 'Title 28', 'Title 29', 'Title 30'];
var scData =
{
    management: ["Casey King"],
    contentCreation: ["Casey King", "DrZora", "Dorshii", "xtr", "Rem", "Coach Mills"],
    voice: ["Daniel Amerman", "Tristan Stone", "Sean Kilgore", "Casey King", "Teets", "Coach Mills", " Mr. Frost"],
    artDirection: ["Brian Ure"],
    clipping: ["Strike", "Teets", "Casey King", "Aomine", "Jez", "Louise"],
    videoDirection: ["Jez", "Kester De Vera", "Chuuya", "Louise David", "Kirby"],
    animation: ["Yuri Cauyan", "Gion Baraquiel", "Jameson Gabatin", "Exon", "Brian Ure"]
}
var mapHighlightColors = {
    white: { color: [229.5, 229.5, 229.5], display: [0.9, 0.9, 0.9, 1], opacity: 20 },
    // red : { color : [1,0,0.2353,1], display : [0.9255,0.3176,0.5333,1]},
    red: { color: [1, 0, 0, 1], display: [1, 0.2, 0.4, 1], opacity: 50 },
    blue: { color: [0, 0.8235, 1, 1], display: [0.1922, 0.6902, 0.8902, 1], opacity: 50 },
    green: { color: [0, 1, 0.1569, 1], display: [0.3294, 0.902, 0.4431, 1], opacity: 50 },
    golden: { color: [1, 0.7333, 0, 1], display: [1, 0.8725, 0.1, 1], opacity: 50 }
}