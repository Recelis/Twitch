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
    for (var ii =0; ii < twitchChannels.length; ii++){
        (function(ii) {
        $.getJSON(
            url[ii],
            function(data){
                console.log(ii);
                // create anchor element
                var titles = document.createElement("a");
                var channelText = document.createTextNode(twitchChannels[ii]);    
                titles.appendChild(channelText);
                titles.title = twitchChannels[ii];
                titles.href = "https://www.twitch.tv/" + twitchChannels[ii];
                titles.classList.add("titles");
                // sort out into offline or streaming
                if (data["stream"] === null || data["error"] != undefined){
                    console.log("not streaming");
                    // check if channel is still alive
                    var channelUrl = "https://wind-bow.gomix.me/twitch-api/channels/"+twitchChannels[ii]+ "?callback=?"
                    $.getJSON(
                        channelUrl,
                        function(channelData){
                            console.log("CHANNEL DATA");
                            console.log(channelData);
                            if (channelData["status"] === 404){
                                var nonExistentElements = document.createAttribute("class");
                                nonExistentElements.value = "offlineElements";                           // Set the value of the class attribute
                                titles.setAttributeNode(nonExistentElements); 
                                var element = document.getElementById("closedElements");
                                element.appendChild(titles);
                                var lineBreak = document.createElement("br");
                                element.appendChild(lineBreak);
                            } else{
                                var offlineElements = document.createAttribute("class");
                                offlineElements.value = "offlineElements";                           // Set the value of the class attribute
                                titles.setAttributeNode(offlineElements); 
                                var element = document.getElementById("offlineElements");
                                element.appendChild(titles);
                                var lineBreak = document.createElement("br");
                                element.appendChild(lineBreak);
                            }
                        }
                    )
                        
                } else{
                    console.log("currently streaming");
                    console.log(data);
                    var onlineElements = document.createAttribute("class");
                    onlineElements.value = "streamElements";                           // Set the value of the class attribute
                    titles.setAttributeNode(onlineElements); 
                    var element = document.getElementById("streamElements");
                    element.appendChild(titles);
                    var lineBreak = document.createElement("br");
                    element.appendChild(lineBreak);
                    var addDetails = document.createElement("p");
                    var streamDetails = document.createTextNode(data["stream"]["channel"]["game"]);     
                    addDetails.appendChild(streamDetails);
                    element.appendChild(addDetails); 
                }
                // check if not streaming


                
                console.log(data);
            }
        );
         })(ii);
    }    
});