"use strict";

var yellow = {
  name: "Player One",
  score: 0
};

var black = {
  name: "Player Two",
  score: 0
};

var sendGameData = function(){
  var gameData = JSON.stringify({"endTime": 56788, "bScore": 4, "yScore": 5, "bName": "daniel", "yName": "sara", "startTime": 53435, "_id": 3});
  $.get(
      url="endgame",
      data={"gameData":gameData}, 
      success=function(data) {
        //  alert('page content: ' + data);
      }
  );
}

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

  elYellowName.innerText = yellow.name;
  elBlackName.innerText = black.name;
}

function setDefaultPlayerScore() {
  var elYellowScore = document.getElementById("yellow--score");
  var elBlackScore = document.getElementById("black--score");

  elYellowScore.innerText = yellow.score;
  elBlackScore.innerText = black.score;
}

setDefaultPlayerName();
setDefaultPlayerScore();
