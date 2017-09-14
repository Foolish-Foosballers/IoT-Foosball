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
function updateScore(blackScored, yellowScored) {
	if (blackScored) {
    	black.score++;
	} else if (yellowScored) {
    	yellow.score++;
	}
	setScores();

	if (yellow.score >= 5 && yellow.score - black.score >= 2) {
		// $("#form--modal").modal('toggle');
		console.log("yellow wins")
	} else if (black.score >= 5 && black.score - yellow.score >= 2) {
		// $("#form--modal").modal('toggle');
		console.log("black wins")
	}
}

/**
 * Changes both player scores to match the input values
 * @param {Number} blackScore New black player score
 * @param {Number} yellowScore New yellow player score
 */
function editScore(blackScore, yellowScore) {
	black.score = blackScore;
	yellow.score = yellowScore;
	setScores();
}

/**
 * Updates score elements on game page with current stored scores
 */
function setScores() {
	$("#black--score").text(black.score);
	$("#yellow--score").text(yellow.score);
}

/**
 * Changes both player names to match the input values or defaults
 * @param {String} blackName New black player name
 * @param {String} yellowName New yellow player name
 */
function editNames(blackName="Player One", yellowName="Player Two") {
	black.name = (blackName === "") ? "Player One" : blackName;		
	yellow.name = (yellowName === "") ? "Player Two" : yellowName;		
	setNames();
}

/**
 * Updates elements on game page with current stored names
 */
function setNames() {
	$("#black--name").text(black.name);
	$("#yellow--name").text(yellow.name);
}

// jQuery event listeners
$(function() {
	
	// Populate inputs in edit modal
	$("#button--edit-game").click(function() {
		$("[name='black-name--modal']").val(black.name);
		$("[name='yellow-name--modal']").val(yellow.name);	
		$("[name='black-score--modal']").val(black.score);        
		$("[name='yellow-score--modal']").val(yellow.score);
	});

	// Reset scores if game is restarted
	$("#button--restart-game").click(function() {
		editScore(0, 0);
	});

	// 
	$("#button--edit-confirm").click(function() {
		editNames($("[name='black-name--modal']").val(), $("[name='yellow-name--modal']").val());
		editScore($("[name='black-score--modal']").val(), $("[name='yellow-score--modal']").val());
	});

});
