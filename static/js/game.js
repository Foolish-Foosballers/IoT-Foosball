"use strict";

var yellow = {
  	name: "Player One",
  	score: 0
};

var black = {
	name: "Player Two",
	score: 0
};

/**
 * Starts game timer and updates every second
 */
function startTime() {
  var minutes = parseInt(document.getElementById("minutes").innerHTML);
  var seconds = parseInt(document.getElementById("seconds").innerHTML);
  seconds++

  if(seconds == 60){
    minutes++;
    seconds = 0;
  }
  minutes = checkTime(minutes);
  seconds = checkTime(seconds);

  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;
  var t = setTimeout(startTime, 1000);
}

/**
 * Formats input unit of time with leading zero if less than 10
 * @param {int} unit 
 * Return String
 */
function checkTime(unit) {
  if (unit < 10) {unit = "0" + unit};
  return unit;
}

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
	setDefaultPlayerScore();
}

function setDefaultPlayerName() {
	var elYellowName = document.getElementById("yellow--name");
	var elBlackName = document.getElementById("black--name");
	var modalYellowName = document.getElementById("yellow-name--modal");
	var modalBlackName = document.getElementById("black-name--modal");

	if (elYellowName.innerText === "") {
		elYellowName.innerText = yellow.name;
		modalYellowName.innerText = yellow.name;
	}

	if (elBlackName.innerText === "") {
		elBlackName.innerText = black.name;
		modalBlackName.innerText = black.name;
	}
}

function setDefaultPlayerScore() {
	var elYellowScore = document.getElementById("yellow--score");
	var elBlackScore = document.getElementById("black--score");

	elYellowScore.innerText = yellow.score;
	elBlackScore.innerText = black.score;
}