// http://www.cloford.com/resources/colours/500col.htm
// use flexbox properly
// make links on channels



$(document).ready(function(){
var twitchChannels = ["ESL_SC2", 
    "OgamingSC2", 
    "cretetion", 
    "freecodecamp", 
    "storbeck", 
    "habathcx", 
    "RobotCaleb", 
    "noobs2ninjas",
    "comster404"];

    var url = [];
    for (var ii = 0; ii < twitchChannels.length; ii++){ 
        url.push("https://wind-bow.gomix.me/twitch-api/streams/"+twitchChannels[ii]+ "?callback=?");
    }
    $.getJSON(
            url[0],
            // function(data){
            //     // console.log(data);
            //     document.getElementById("offlineElements").innerHTML  = twitchChannels[3];    
            //     //console.log(twitchChannels[6]);
            // }
    )
    for (var ii =0; ii < twitchChannels.length; ii++){
        (function(ii) {
        $.getJSON(
            url[ii],
            function(data){
                
                console.log(ii);
                // console.log(data);
                // check if not disconnected
                if (data["stream"] === null){
                    console.log("not streaming");
                    var titles = document.createElement("a");
                    var channelText = document.createTextNode(twitchChannels[ii]);    
                    titles.appendChild(channelText);
                    titles.title = twitchChannels[ii];
                    titles.href = "https://www.twitch.tv/" + twitchChannels[ii];
                    var offlineElements = document.createAttribute("class");
                    offlineElements.value = "offlineElements";                           // Set the value of the class attribute
                    titles.setAttributeNode(offlineElements); 
                    var element = document.getElementById("offlineElements");
                    element.appendChild(titles);    
                } else{
                    console.log("streaming");
                    var titles = document.createElement("p");
                    var channelText = document.createTextNode(twitchChannels[ii]);    
                    titles.appendChild(channelText);
                    var element = document.getElementById("streamElements");
                    element.appendChild(titles); 
                }
                // check if not streaming


                
                console.log(data);
            }
        );
         })(ii);
    }    
});