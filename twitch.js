var twitchChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]




$(document).ready(function(){
    var url = "https://wind-bow.gomix.me/twitch-api/streams/freecodecamp?callback=?";
    $.getJSON(
        url,
        function(data){
            alert("this worked!");
            console.log(data);
        }
    );
    







});