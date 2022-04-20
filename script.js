const canvas = document.querySelector(".container");
const blockContainer = document.querySelector(".block-container");
const score = document.querySelector("#score");
let userBoardPositionLeft = 250;
let ballPositionBottom = 32;
let ballPositionLeft = 300;
const userBoardPositionBottom = 10;
const userBoardHeight = 20;
const userBoardWidth = 120;
const canvasHeight = 300;
const canvasWidth = 350;
const ballWidth = 30;
const blockHeight = 50;
const blockWidth = 100;
const blockGap = 10;
let ballTimer;
let scoreCounter = 0;

// create all the blocks
for (let i = 0; i < 6; i++) {
  const block = document.createElement("div");
  block.classList.add("block");
  block.id = i;
  blockContainer.appendChild(block);
}

// create user board
const userBoard = document.createElement("div");
userBoard.classList.add("user-board");
canvas.appendChild(userBoard);

//create ball
const ball = document.createElement("div");
ball.classList.add("ball");
canvas.appendChild(ball);

// navigate the user board
// keydown event listens to the whole html document (an object)
document.addEventListener("keydown", navigateUserBoard);
function navigateUserBoard(e) {
  if (e.key === "ArrowLeft" && userBoardPositionLeft > 0) {
    userBoardPositionLeft -= 10;
    userBoard.style.left = userBoardPositionLeft + "px";
  } else if (e.key === "ArrowRight" && userBoardPositionLeft < canvasWidth - userBoardWidth) {
    userBoardPositionLeft += 10;
    userBoard.style.left = userBoardPositionLeft + "px";
  }
}

// move ball
startGame();
function startGame() {
  const ranNum = Math.floor(Math.random() * 2);
  if (ranNum === 0) {
    ballTimer = setInterval(moveBallNW, 20);
  } else {
    ballTimer = setInterval(moveBallNE, 20);
  }
}

function moveBallNW() {
  ballPositionBottom += 2;
  ballPositionLeft -= 2;
  ball.style.bottom = ballPositionBottom + "px";
  ball.style.left = ballPositionLeft + "px";
  checkCollision();
  changeDirection();
}

function moveBallNE() {
  ballPositionBottom += 2;
  ballPositionLeft += 2;
  ball.style.bottom = ballPositionBottom + "px";
  ball.style.left = ballPositionLeft + "px";
  checkCollision();
  changeDirection();
}

function moveBallSE() {
  ballPositionBottom -= 2;
  ballPositionLeft += 2;
  ball.style.bottom = ballPositionBottom + "px";
  ball.style.left = ballPositionLeft + "px";
  checkCollision();
  changeDirection();
}

function moveBallSW() {
  ballPositionBottom -= 2;
  ballPositionLeft -= 2;
  ball.style.bottom = ballPositionBottom + "px";
  ball.style.left = ballPositionLeft + "px";
  checkCollision();
  changeDirection();
}

function changeDirection() {
  // if ball reach left wall of container
  if (ballPositionLeft < 0) {
    clearInterval(ballTimer);
    const ranNum = Math.floor(Math.random() * 2);
    if (ranNum === 0) {
      ballTimer = setInterval(moveBallSE, 20);
    } else {
      ballTimer = setInterval(moveBallNE, 20);
    }
  } else if (ballPositionBottom > canvasHeight - ballWidth) { // if ball reach top wall of container
    clearInterval(ballTimer);
    const ranNum = Math.floor(Math.random() * 2);
    if (ranNum === 0) {
      ballTimer = setInterval(moveBallSW, 20);
    } else {
      ballTimer = setInterval(moveBallSE, 20);
    }
  } else if (ballPositionLeft > canvasWidth - ballWidth) { // if ball reach right wall of container
    clearInterval(ballTimer);
    const ranNum = Math.floor(Math.random() * 2);
    if (ranNum === 0) {
      ballTimer = setInterval(moveBallNW, 20);
    } else {
      ballTimer = setInterval(moveBallSW, 20);
    }
  } else if (ballPositionBottom === 0) { //if ball reach bottom wall of container ie.game over
    clearInterval(ballTimer);
  }
}

function checkCollision() {
  // if ball touches user board
  if (ballPositionBottom < userBoardHeight + userBoardPositionBottom && (ballPositionLeft > userBoardPositionLeft &&
    ballPositionLeft < userBoardPositionLeft + userBoardWidth)) {
    clearInterval(ballTimer);
    startGame();
  }

  // if ball touches a (any) block
  const allBlocks = document.querySelectorAll(".block");
  // // if ball touches 1st row 1st block
  if (ballPositionLeft < blockWidth && ballPositionBottom > canvasHeight - blockHeight - blockGap && !allBlocks[0].classList.contains("hide-block")) {
    allBlocks[0].classList.add("hide-block");
    scoreCounter++;
    score.textContent = scoreCounter;
    gameOver();
  }
  // if ball touches 1st row 2nd block
  if (ballPositionLeft > blockWidth + blockGap && ballPositionLeft < blockWidth * 2 + blockGap && ballPositionBottom > canvasHeight - blockHeight - blockGap && !allBlocks[1].classList.contains("hide-block")) {
    allBlocks[1].classList.add("hide-block");
    scoreCounter++;
    score.textContent = scoreCounter;
    gameOver();
  }
  // if ball touches 1st row 3rd block
  if (ballPositionLeft > blockWidth * 2 + blockGap * 2 && ballPositionLeft < blockWidth * 3 + blockGap * 2 && ballPositionBottom > canvasHeight - blockHeight - blockGap && !allBlocks[2].classList.contains("hide-block")) {
    allBlocks[2].classList.add("hide-block");
    scoreCounter++;
    score.textContent = scoreCounter;
    gameOver();
  }
  // if ball touches 2nd row 1st block
  if (ballPositionLeft < blockWidth && ballPositionBottom > canvasHeight - blockHeight * 2 - blockGap && ballPositionBottom < canvasHeight - blockHeight - blockGap && !allBlocks[3].classList.contains("hide-block")) {
    allBlocks[3].classList.add("hide-block");
    scoreCounter++;
    score.textContent = scoreCounter;
    gameOver();
  }
  // if ball touches 2nd row 2nd block
  if (ballPositionLeft > blockWidth + blockGap && ballPositionLeft < blockWidth * 2 + blockGap && ballPositionBottom > canvasHeight - blockHeight * 2 - blockGap && ballPositionBottom < canvasHeight - blockHeight - blockGap && !allBlocks[4].classList.contains("hide-block")) {
    allBlocks[4].classList.add("hide-block");
    scoreCounter++;
    score.textContent = scoreCounter;
    gameOver();
  }
  // if ball touches 2nd row 3rd block
  if (ballPositionLeft > blockWidth * 2 + blockGap * 2 && ballPositionLeft < blockWidth * 3 + blockGap * 2 && ballPositionBottom > canvasHeight - blockHeight * 2 - blockGap && ballPositionBottom < canvasHeight - blockHeight - blockGap && !allBlocks[5].classList.contains("hide-block")) {
    allBlocks[5].classList.add("hide-block");
    scoreCounter++;
    score.textContent = scoreCounter;
    gameOver();
  }
}

function gameOver() {
  if (scoreCounter === 6) {
    clearInterval(ballTimer);
  }
}
