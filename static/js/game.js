"use strict";

var yellow = { name: "Player One", score: 0};
var black = { name: "Player Two", score: 0 };

/**
 * Quick little test function
 */
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

/**
 * Updates yellow/black player score based on received input (1 or 0)
 * @param {int} yellowScored 
 * @param {int} blackScored 
 */
function updateScore(yellowScored, blackScored){
	if (yellowScored) {
    yellow.score++
	}
	else if (blackScored) {
    black.score++
	}
}