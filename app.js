let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let score = document.querySelector('#fish-score');
let scoreId = document.querySelector('#score')
let instructions = document.querySelector('#instructions-id')
canvas.setAttribute("height", getComputedStyle(canvas)["height"]);
canvas.setAttribute("width", getComputedStyle(canvas)["width"]);
canvas.width = 800;
canvas.height = 400;
canvas.style.background = '#571FF1';
canvas.style.border = '8px solid #54123B';

let cat;
const catImage = new Image();
catImage.src = "images/grinning-cat-face.png";
const playerSize = 50;

let fish;
let fishArr = [];
let fishXPos;
let fishYPos;
const fishSize = 40;
const fishImage = new Image();
fishImage.src = `images/fish${Math.floor(Math.random()*6)}.png`;

const foodSize = 40;
let foodXPos = Math.floor(Math.random() * (canvas.width - foodSize));
let foodYPos = 0;
let foodXSpeed = 5;
let foodYSpeed = 5;
let enemyImage = new Image();
enemyImage.src = `images/enemy${Math.floor(Math.random()*3)}.png`
let startingPos = true;
let totalEnimies = 20;
let enemyFoods = [];

class Player {
    constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.alive = true;
    this.render = function () {
      ctx.drawImage(catImage, this.x, this.y, this.width, this.height);
    };
    };
  }

  class Fishies {
    constructor(x, y, width, height, id) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.alive = true;
    this.id = id;
    this.render = function () {
      ctx.drawImage(fishImage, this.x, this.y, this.width, this.height);
    };
    };
  }


function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max - min + 1))
}

let fishLength = generateRandomInteger(30,100);

let gameStart = () => {
    cat = new Player(0, 350, playerSize, playerSize);
    ctx.imageSmoothingEnabled = false;
    for(let i = 0; i < fishLength; i++) {
      const fishXPos = Math.floor(Math.random() * (canvas.width - fishSize));
      const fishYPos = Math.floor(Math.random() * (canvas.height - fishSize));
      fish = new Fishies(fishXPos, fishYPos, fishSize, fishSize, i);
      fishArr.push(fish);
      ctx.imageSmoothingEnabled = false;
    }

    function move(e){
      switch (e.key){
          case "ArrowUp":
              cat.y > 0 ?  cat.y -= 10  :  null;
              break
          case "ArrowDown":
              cat.y < (canvas.height - cat.height) ? cat.y += 10 : null;
              break
          case "ArrowLeft":
              cat.x > 0 ? cat.x -= 10 : null;
              break
          case "ArrowRight":
              cat.x < (canvas.width - cat.width) ? cat.x += 10 : null;
              break
      }
    }
  
  function enemyFoodMove() {
    enemyFoods.forEach(function(food) {
      food.foodYPos += food.foodYSpeed;
      if(food.foodYPos > canvas.height) {
        food.foodYPos = 0 - food.foodSize;
        let foodEnemyPos = Math.floor(Math.random() * 8) + 1;
        food.foodXPos = foodEnemyPos * (canvas.width / 8);
        food.foodYSpeed = Math.floor(Math.random()*(18 - 10) + 10)
      }
      if(food.foodYPos + food.foodSize > cat.y && food.foodYPos < cat.y + playerSize && food.foodXPos + food.foodSize > cat.x && food.foodXPos < cat.x + playerSize) {
        console.log('hit');
        let gameLost = document.createElement('h3');
        gameLost.textContent = 'Cat got scared by the fruits and vegtables. You lost!';
        scoreId.appendChild(gameLost)
        stopGame();
      }
    });
  }
  
  function fishCollision() {
    fishArr.forEach(fish => {
      if(fish.y + fish.height > cat.y && fish.y < cat.y + cat.height && fish.x + fish.width > cat.x && fish.x < cat.x + cat.width) {
      const index = fishArr.indexOf(fish);
      if (index > -1) {
        fishArr.splice(index, 1);
      }
      let gameScore = Number(score.textContent);
      let newScore = gameScore + 50;
      score.textContent = newScore;
      if(fishArr.length === 0) {
      let gameWon = document.createElement('h3');
      gameWon.textContent = 'Cat caught all the fish! You Win!';
      scoreId.appendChild(gameWon)
      stopGame();
      }
      } 
    });
  }
  
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cat.render();

    fishArr.forEach(fish => {
      fish.render();
      })

      if(startingPos) {
        for(let i = 0; i < totalEnimies; i++) {
          makeEnemyFood();
        }
        startingPos = false;
      }
      fishCollision();
      enemyFoodMove();
      drawEnemyFood();
    }
  
    function makeEnemyFood() {
      let foodEnemyPos = Math.floor(Math.random() * 8) + 1;
      const foodSize = 40;
      let foodXPos = foodEnemyPos * (canvas.width / 8);
      let foodYPos = 0 - foodSize;
      let foodXSpeed = 5;
      let foodYSpeed = Math.floor(Math.random() * (16 - 8) + 8);
      let enemyImage = new Image();
      enemyImage.src = `images/enemy${Math.floor(Math.random()*3)}.png`;
      
      let food = {
        foodXPos: foodXPos,
        foodYPos: foodYPos,
        foodSize: foodSize,
        foodXSpeed: foodXSpeed,
        foodYSpeed: foodYSpeed,
        enemyImage: enemyImage
      }
      enemyFoods.push(food);
    }
  
    function drawEnemyFood() {
      enemyFoods.forEach(function(food) {
        ctx.drawImage(food.enemyImage, food.foodXPos, food.foodYPos, food.foodSize, food.foodSize)
        ctx.imageSmoothingEnabled = false;
      })
    }
  
    let loopInterval = setInterval(gameLoop, 55);
    document.addEventListener("keydown", move)
  
    function stopGame() {
      clearInterval(loopInterval);
      let playAgain = document.createElement('button');
      playAgain.id = 'play-again'
      playAgain.innerHTML = 'Play Again?'
      scoreId.appendChild(playAgain);
      playAgain.addEventListener('click', function() {
        window.location='https://mkhan42.github.io/Cat-Fish/'
      })
    }
}

let startBtn = document.querySelector('#michalle')
startBtn.addEventListener('click', () => {
  gameStart()
  startBtn.style.display = 'none'
  scoreId.style.display = 'block'
  instructions.style.display = 'none'
})




