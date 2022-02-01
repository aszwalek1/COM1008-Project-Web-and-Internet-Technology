// Author: Alicja Szwalek
"use strict";


// main program body

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const picturesPaths = ['images/tree.png', 'images/star.png', 'images/snowman.png', 'images/house.png', 'triangle', 'square'];
const picturesNames = ['tree', 'star', 'snowman', 'house', 'triangle', 'square'];

let username = '';
let currentValidImageIndex;
let indicies = [];
let whichRound = 1;
let maxRounds = 4;
let currentScore = 0;



//functions



//this function displays the text on canvas before the start of the game

function displayTitle() {
  ctx.font = "20px sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "gold";
  ctx.fillText("Press the button to start", WIDTH / 2, HEIGHT / 2);
}

displayTitle();

canvas.addEventListener("click", coordinates);



//this function draws a blue square on canvas

function square() {
  ctx.fillStyle = "rgb(0,0,255)";
  ctx.beginPath();
  ctx.rect(133, 40, 30, 30);
  ctx.fill();
  ctx.closePath();
}

//this function draws a red triangle on canvas

function triangle() {
  const x = 225;
  const y = 100;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 25, y + 25);
  ctx.lineTo(x + 25, y - 25);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

//this function starts the game after the click on start button

function askName() {
  username = window.prompt("Enter your username: ");

  //name validation

  while (username == null || username == "" || !/^[a-zA-Z]+$/.test(username)) {
    if (username == null || username == "") {
      alert("You must enter your username into the prompt box!");
      username = window.prompt("Enter your username: ");
    } else if (!/^[a-zA-Z]+$/.test(username)) {
      alert("Please only enter letters");
      username = window.prompt("Enter your username: ");
    }
  }
  if (username) {
    alert(`Hello ${username}, lets start the game!`);
  }
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  drawRandom();
}

//this function onloads the images

function drawImage(src, alt, x, y) {
  let base_image = new Image();
  base_image.src = src;
  base_image.setAttribute("alt", alt);
  base_image.onload = function () {
    ctx.drawImage(base_image, x, y, 50, 50);
  }
}

//this function generates an array with 3 random numbers (0-5)

function generateRandomIndicies() {
  const arr = [];
  while (arr.length < 3) {
    let r = Math.floor(Math.random() * 6);
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  //the first number of the array is the correct picture

  if (arr[0] == 0) alert(`${username}, click on the tree`);
  else if (arr[0] == 1) alert(`${username}, click on the star`);
  else if (arr[0] == 2) alert(`${username}, click on the snowman`);
  else if (arr[0] == 3) alert(`${username}, click on the house`);
  else if (arr[0] == 4) alert(`${username}, click on the triangle`);
  else if (arr[0] == 5) alert(`${username}, click on the rectangle`);
  return arr;
}


//this function draws all of the images and canvas drawings

function drawRandom() {
  indicies = generateRandomIndicies();

  indicies.forEach(index => {
    switch (index) {
      case 0:
        drawImage(picturesPaths[0], picturesNames[0], 40, 20);
        break;
      case 1:
        drawImage(picturesPaths[1], picturesNames[1], 60, 80);
        break;
      case 2:
        drawImage(picturesPaths[2], picturesNames[2], 120, 80);
        break;
      case 3:
        drawImage(picturesPaths[3], picturesNames[3], 10, 100);
        break;
      case 4:
        triangle();
        break;
      case 5:
        square();
        break;
    }
  });
  currentValidImageIndex = indicies[0];
}

//this function finds the coordinates of the mouse

function mouseXY(e) {
  const boundingRect = canvas.getBoundingClientRect();
  const offsetX = boundingRect.left;
  const offsetY = boundingRect.top;

  const mx = Math.round((e.clientX - offsetX) * WIDTH / boundingRect.width);
  const my = Math.round((e.clientY - offsetY) * HEIGHT / boundingRect.height);
  return { x: mx, y: my };

}

/*this function gets the coordinates of the mouse click position and 
  calls the checkContained function*/

function coordinates(evt) {
  const pos = mouseXY(evt);
  checkContained(pos.x, pos.y);
}

//this function displayes the text with the score after the game finishes

function displayScore() {
  ctx.font = "0.9em sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "gold";
  if (currentScore > maxRounds / 2) {
    ctx.fillText(`Good job ${username}! You scored  ${currentScore}  out of  ${maxRounds}`, WIDTH / 2, HEIGHT / 2);
  }
  else
    ctx.fillText(`${username}, you scored ${currentScore}  out of  ${maxRounds}`, WIDTH / 2, HEIGHT / 2);
  currentScore = 0;
  whichRound = 1;
}


/*this function checks where the mouse was clicked and 
increases the score if the right picture was clicked*/

function checkContained(x, y) {
  const currentNames = [picturesNames[indicies[0]], picturesNames[indicies[1]], picturesNames[indicies[2]]];
  // tree
  if (currentNames.includes(picturesNames[0]) && (x >= 55) && (x <= 78) && (y >= 25) && (y <= 70)) {
    if (picturesNames[0] === picturesNames[currentValidImageIndex]) {
      currentScore++;
    }
    finishRound();
  }
  // star
  else if (currentNames.includes(picturesNames[1]) && (x >= 66) && (x <= 106) && (y >= 85) && (y <= 127)) {
    if (picturesNames[1] === picturesNames[currentValidImageIndex]) {
      currentScore++;
    }
    finishRound();
  }
  //snowman
  else if (currentNames.includes(picturesNames[2]) && (x >= 104) && (x <= 168) && (y >= 95) && (y <= 175)) {
    if (picturesNames[2] === picturesNames[currentValidImageIndex]) {
      currentScore++;
    }
    finishRound();
  }
  // house
  else if (currentNames.includes(picturesNames[3]) && (x >= 20) && (x <= 53) && (y >= 105) && (y <= 150)) {
    if (picturesNames[3] === picturesNames[currentValidImageIndex]) {
      currentScore++;
    }
    finishRound();
  }
  //triangle
  else if (currentNames.includes(picturesNames[4]) && (x >= 224) && (x <= 250) && (y >= 75) && (y <= 125)) {
    if (picturesNames[4] === picturesNames[currentValidImageIndex]) {
      currentScore++;
    }
    finishRound();
  }

  //square
  else if (currentNames.includes(picturesNames[5]) && (x >= 132) && (x <= 163) && (y >= 39) && (y <= 70)) {
    if (picturesNames[5] === picturesNames[currentValidImageIndex]) {
      currentScore++;
    }
    finishRound();
  }
}

//the end of the game: change of buttons, display text with the score

function finishRound() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  whichRound++;
  if (whichRound <= maxRounds) {
    drawRandom();
  }
  else {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    document.getElementById('newGame').style.display = 'block';
    document.getElementById('start').classList = 'hide';
    displayScore();
  }
}


