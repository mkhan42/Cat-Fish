let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let score = document.querySelector('#score');
let gameStatus = document.querySelector('#game-status')
let cat;
let fish;
let fishArr = [];
let fishXPos = Math.floor(Math.random() * (canvas.width - 15));
let fishYPos = Math.floor(Math.random() * 100);



canvas.style.background = '#571FF1';
canvas.style.border = '8px solid #54123B';

const catImage = new Image();
catImage.src = "images/grinning-cat-face.png";

const fishImage = new Image();
fishImage.src = 'images/fish.png';

let foodXPos = Math.floor(Math.random() * (canvas.width - 15));
let foodYPos = 0;
let foodXSpeed = 5;
let foodYSpeed = 5;
let enemyImage = new Image();
enemyImage.src = `images/enemy${Math.floor(Math.random()*3)}.png`
const foodSize = 15;
let startingPos = true;
let totalEnimies = 10;
let enemyFoods = [];

const playerSize = 20;

class Player {
    constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.alive = true;
    this.speed = speed;
    this.render = function () {
      ctx.drawImage(catImage, this.x, this.y, this.width, this.height);
    };
    };
  }

  class Fishies {
    constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.alive = true;

    this.speed = speed;

    // this.dx = 1 * this.speed;
    // this.dy = 1 * this.speed;
    this.render = function () {
      ctx.drawImage(fishImage, this.x, this.y, this.width, this.height);
    };
    };
  }


window.addEventListener("DOMContentLoaded", function(e){
  cat = new Player(0, 130, playerSize, playerSize);
  for(let i = 0; i < 30; i++) {
    const fishXPos = Math.floor(Math.random() * (canvas.width - 15));
    const fishYPos = Math.floor(Math.random() * 100);
    fish = new Fishies(fishXPos, fishYPos, 15, 15);
    fishArr.push(fish);
    console.log(fish)
  }
  ctx.imageSmoothingEnabled = false;

})


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



console.log(score);


function enemyFoodMove() {

  enemyFoods.forEach(function(food) {
    food.foodYPos += food.foodYSpeed;

    if(food.foodYPos > canvas.height) {
      food.foodYPos = 0 - food.foodSize;

      let foodEnemyPos = Math.floor(Math.random() * 3) + 1;
      food.foodXPos = foodEnemyPos * (canvas.width / 6);
      food.foodYSpeed = Math.floor(Math.random()*(12 - 4) + 4)
    }
  
    if(food.foodYPos + food.foodSize > cat.y && food.foodYPos < cat.y + playerSize && food.foodXPos + food.foodSize > cat.x && food.foodXPos < cat.x + playerSize) {
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.log('hit');
      stopGame();
      cat.x = 0;
      cat.y = 130;
      let gameLost = document.createElement('h3');
      gameLost.textContent = 'You lost!';
  
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

    enemyFoodMove();
    drawEnemyFood();

  }

  function makeEnemyFood() {
    let foodEnemyPos = Math.floor(Math.random() * 3) + 1;
    const foodSize = 15;
    let foodXPos = foodEnemyPos * (canvas.width / 6);
    let foodYPos = 0 - foodSize;
    let foodXSpeed = 5;
    let foodYSpeed = Math.floor(Math.random() * (12 - 4) + 4);
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
    enemyFoods.forEach(function(food, i) {
      ctx.drawImage(food.enemyImage, food.foodXPos, food.foodYPos, food.foodSize, food.foodSize)
    })
  }


  let varName = setInterval(gameLoop, 100);
  document.addEventListener("keydown", move)

  function stopGame() {
    clearInterval(varName);
  }



