

var sendGameData = function(){
    var gameData = JSON.stringify({"endTime": 56788, "bScore": 4, "yScore": 5, "bName": "daniel", "yName": "sara", "startTime": 53435, "_id": 3});
    $.get(
        url="endgame",
        data={"gameData":gameData}, 
        success=function(data) {
           alert('page content: ' + data);
        }
    );
}