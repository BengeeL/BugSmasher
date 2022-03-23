/* eslint-disable semi, space-before-function-paren, no-undef, no-trailing-spaces */
// Benjamin Lefebvre 301234587
'use strict'

// ----- Background Canvas -----
var canvasBG = document.getElementById('background-layer');
var ctxBG = canvasBG.getContext('2d');
canvasBG.width = 700;
canvasBG.height = 550;

// IMG sources
var backgroundIMG = new Image();
backgroundIMG.src = 'images/background.jpeg';

// Background application onload
backgroundIMG.onload = function() {
  ctxBG.drawImage(backgroundIMG, 0, 0);
}

// ----- Bug Image -----
var bug = document.getElementById('bug');
bug.addEventListener('click', addPoint, false);

start(); // Start GAME

//  New bug position + image generate
function newBug() {
  generateIMG()
  var x = Math.floor(Math.random() * (canvasBG.width - (3 * bug.width)));
  var y = Math.floor(Math.random() * (canvasBG.height - (3 * bug.height)));
  bug.style.top = (y + 'px');
  bug.style.left = (x + 'px');
}

function generateIMG() {
  var bugNumber = Math.floor(Math.random() * 4) + 1;
  bug.src = 'images/bug' + bugNumber + '.png';
  var rotation = Math.floor(Math.random() * 360) + 1;
  bug.style.transform = 'rotate(' + rotation + 'deg)';
}

// ----- Score Text -----
var score = 0;
var missed = -1;
document.getElementById('resetScore').addEventListener('click', resetScore, false);

function resetScore() {
  score = 0;
  missed = 0;
  updateScore();
  newBug();
}

function updateScore() {
  document.getElementById('scoreTXT').innerHTML = 'Score: ' + score;
  document.getElementById('missedTXT').innerHTML = 'Missed: ' + missed;
}

function addPoint() {
  score++;
  speed -= 20;
  window.clearTimeout(timeoutHandle);
  start();
  updateScore();
  newBug()
}

// ----- Speed Gameplay -----
var speed = 3000;
var timeoutHandle;
document.getElementById('resetSpeed').addEventListener('click', resetSpeed, false);

function resetSpeed() {
  speed = 3000;
  updateSpeed();
}

function updateSpeed() {
  if (speed > 200) {
    document.getElementById('speedTXT').innerHTML = 'Speed: ' + (Math.round(speed / 10) / 100) + ' seconds';
  } else {
    document.getElementById('speedTXT').innerHTML = 'Speed: MAX Speed';
  }
}

function start() {
  newBug();
  updateSpeed();
  timeoutHandle = window.setTimeout(function() {
    missed++;
    updateScore();
    start();
  }, speed);
}
