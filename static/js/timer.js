"use strict";

// Game level variables
var gameTime = { minutes: 0, seconds: 0 };
var gameIsPaused = false;
var pausePlayEl;
var gameIsOver = false;

// Add the event listeners when the dom is ready
$(document).ready(function() {
  pausePlayEl = document.getElementById("pause-play")
	pausePlayEl.addEventListener("click", updateGameState);
});

/**
 * Runs the game timer and updates the time every 1 second.
 */
function startTime() {
  if(!gameIsPaused && !gameIsOver) {
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
    var t = setTimeout(startTime, 1000);
  }
}

function updateGameState() {
  if (gameIsPaused && !gameIsOver) {
    gameIsPaused = false;
    pausePlayEl.innerHTML = '<i class="fa fa-pause fa-3x" aria-hidden="true"></i>';
    startTime();
  } else if (!gameIsPaused && !gameIsOver) {
    gameIsPaused = true;
    pausePlayEl.innerHTML = '<i class="fa fa-play fa-3x" aria-hidden="true"></i>';
  }
}

function endGame() {
  gameIsOver = true;
  pausePlayEl.innerHTML = '';
}

function restartGame() {
  gameIsOver = false;
  pausePlayEl.innerHTML = '<i class="fa fa-pause fa-3x" aria-hidden="true"></i>';
}

/**
 * Formats input unit of time with leading zero if less than 10
 * @param {int} unit 
 * Return String
 */
function checkTime(unit) {
  var stringUnit = "" + unit;
  if (unit < 10 && stringUnit.length < 2) {unit = "0" + unit};
  return unit;
}