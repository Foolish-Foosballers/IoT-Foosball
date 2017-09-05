"use strict";

var yellow = {
  name: "Player One",
  score: 0
};

var black = {
  name: "Player Two",
  score: 0
};

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
