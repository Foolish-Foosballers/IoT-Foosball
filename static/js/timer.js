"use strict";

// Game level variables
var gameTime = { minutes: 0, seconds: 0 };
var gameIsPaused = false;

// Add the event listeners when the dom is ready
$(document).ready(function() {
	document.getElementById("pause").addEventListener("click", pauseGame);
	document.getElementById("play").addEventListener("click", playGame);
});

/**
 * Runs the game timer and updates the time every 1 second.
 */
function startTime() {
  // gameTime.minutes = document.getElementById("minutes").innerText;
  // gameTime.seconds = document.getElementById("seconds").innerText;
  gameTime.seconds++

  if(gameTime.seconds == 60){
    gameTime.minutes++;
    gameTime.seconds = 0;
	}
  
  // Format the time
  gameTime.minutes = checkTime(gameTime.minutes);
  gameTime.seconds = checkTime(gameTime.seconds);

  // Updated the view
  document.getElementById('minutes').innerText = gameTime.minutes;
  document.getElementById('seconds').innerText = gameTime.seconds;

  // If the game is not paused, update the time
	if(!gameIsPaused) {
		var t = setTimeout(startTime, 1000);
	}
}

/**
 * Pause the game timer
 */
function pauseGame() {
	gameIsPaused = true;
}

/**
 * Resume the game timer with its current time
 */
function playGame() {
	gameIsPaused = false;
	startTime();
}

/**
 * Formats input unit of time with leading zero if less than 10
 * @param {int} unit 
 * Return String
 */
function checkTime(unit) {
	var stringUnit = "" + unit;
  if (unit < 10 && unit && stringUnit.length < 2) {unit = "0" + unit};
  return unit;
}