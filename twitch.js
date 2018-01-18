// http://www.cloford.com/resources/colours/500col.htm
// use flexbox properly
// make links on channels

var state = "NOW STREAMING";

var twitchChannels = [
    "Chad",
    "Pewdiepie",
    "chocoTaco",
    "stylishnoob4",
    "nergis12",
    "chinglishtv",
    "PCGamer",
    "gitsie",
    "Chess",
    "ESL_SC2", 
    "OgamingSC2", 
    "cretetion", 
    "freecodecamp", 
    "storbeck", 
    "habathcx", 
    "RobotCaleb", 
    "noobs2ninjas",
    "comster404"
];
let newRow = 0;

function changeState(newState){
    state = newState;
    // clear gallery
    $("#gallery").empty();
    $("#status").text(state);// change status on page
    createGallery();
}



$(document).ready(function(){
    populateChannelList();
    createGallery();
});

function createGallery(){
    twitchChannels.map((channel)=>{
        $.getJSON(
            "https://wind-bow.gomix.me/twitch-api/streams/"+channel+ "?callback=?",
            (data)=>createProfile(channel,data)
        )
    });
} 

function createProfile(channel,data){
    newRow++;
    console.log(channel);
    console.log(data);
    let dataStatus = getDataStatus(data);
    console.log(dataStatus);
    switch(state){
        case "NOW STREAMING":
            if (dataStatus !== "NOW STREAMING") {console.log("pass this");return};
            break;
        case "CLOSED":
            if (dataStatus !== "CLOSED") return;
            break;
        case "OFFLINE":
            if (dataStatus !== "OFFLINE") return;
            break;
        default:
            break;
    }
    let profile = $("<div class = profile></div>")
    // create anchor element
    profile.append(createImage(data));
    profile.append(createAnchor(channel,data));
    $("#gallery").append(profile);
}

function getDataStatus(data){
    if (data["stream"] !== null) return "NOW STREAMING";
    else if (data["status"] === 404) return "CLOSED";
    else return "OFFLINE";
}

function createImage(data){
    var profileImage = $("<img class = 'profileImage'/>");
    // profileImage
    if (data["stream"] !== null){
        if (data["stream"]["logo"] !== null) profileImage.attr("src", data["stream"]["channel"]["logo"]);
        else profileImage.attr("src", "./img/twitchlogo.png");
    }
    else profileImage.attr("src", "./img/twitchlogo.png");
    return profileImage;
}

function createAnchor(channel, data){
    var profileText = $("<div></div>");
    var link = $("<a class = 'profileText'/>");
    link.text(channel);
    profileText.append(link);
    if (getDataStatus(data) === "NOW STREAMING"){
        profileText.append(" "+data["stream"]["game"]);
        let info = $("<div><a class = 'info'/></div");
        info.text(data["stream"]["viewers"] + " viewers");
        profileText.append(info);
    } 
    link.attr("href", "https://www.twitch.tv/" +channel);
    return profileText;
}

function populateChannelList(){
    twitchChannels.map((channel)=>{
        let channelLine = $("<p class = 'channelLine'></p>");
        channelLine.text(channel);
        $("#channelList").append(channelLine);
    });
}