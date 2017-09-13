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
 * @param {int} blackScored 1 if black scored, else 0
 * @param {int} yellowScored 1 if yellow scored, else 0
 */
function updateScore(blackScored, yellowScored){
	if (blackScored) {
    	black.score++;
	} else if (yellowScored) {
    	yellow.score++;
	}
	setScores();
}

/**
 * Updates yellow/black player name based on received input and calls setNames()
 * @param {string} newName The new name to store
 * @param {bool} isBlack True if updating black player's name, else false
 */
function updateName(newName, isBlack=true) {
	if (isBlack) {
		black.name = (newName === "") ? "Player One" : newName;		
	} else {
		yellow.name = (newName === "") ? "Player Two" : newName;		
	}
	setNames();
}

/**
 * Updates score elements on game page with current stored scores
 */
function setScores() {
	$("#black--score").text(black.score);
	$("#yellow--score").text(yellow.score);
}

/**
 * Updates elements on game page with current stored names
 */
function setNames() {
	$("#black--name").text(black.name);
	$("#yellow--name").text(yellow.name);
	$("[name='black-name--modal']").val(black.name);
	$("[name='yellow-name--modal']").val(yellow.name);
}

// jQuery event listeners
$(function() {
	
	// Populate score inputs in end game modal
	$("#end--game").click(function() {
		$("[name='black-score--modal']").val(black.score);        
		$("[name='yellow-score--modal']").val(yellow.score);
	});

	// Persist names if game is restarted
	$("#restart--game").click(function() {
		black.score = 0;
		yellow.score = 0;
		setScores();
	});

});