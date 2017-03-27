// http://www.cloford.com/resources/colours/500col.htm



$(document).ready(function(){
var twitchChannels = ["ESL_SC2", 
    "OgamingSC2", 
    "cretetion", 
    "freecodecamp", 
    "storbeck", 
    "habathcx", 
    "RobotCaleb", 
    "noobs2ninjas"];

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

                // check if not streaming


                titles = document.getElementById("offlineElements").innerHTML;    
                titles = titles + "<br>" +  twitchChannels[ii];
                document.getElementById("offlineElements").innerHTML = titles;
                console.log(data);
            }
        );
         })(ii);
    }    
});