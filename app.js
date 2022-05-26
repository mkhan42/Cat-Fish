let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let score = document.querySelector('#fish-score');
let scoreId = document.querySelector('#score')
let cat;
let fish;
let fishArr = [];
// let fishXPos = Math.floor(Math.random() * (canvas.width - 15));
// let fishYPos = Math.floor(Math.random() * 100);
let fishXPos;
let fishYPos;
const fishSize = 15;
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

  let fishLength = generateRandomInteger(30, 100);


window.addEventListener("DOMContentLoaded", function(e){
  cat = new Player(0, 130, playerSize, playerSize);
  for(let i = 0; i < fishLength; i++) {
    const fishXPos = Math.floor(Math.random() * (canvas.width - 15));
    const fishYPos = Math.floor(Math.random() * 100);
    fish = new Fishies(fishXPos, fishYPos, fishSize, fishSize, i);
    fishArr.push(fish);
    console.log(fish)
  }
  ctx.imageSmoothingEnabled = false;
})

// let gameStart = () => {
//   console.log("game start clicked")
//     cat = new Player(0, 130, playerSize, playerSize);
//     for(let i = 0; i < 30; i++) {
//       const fishXPos = Math.floor(Math.random() * (canvas.width - 15));
//       const fishYPos = Math.floor(Math.random() * 100);
//       fish = new Fishies(fishXPos, fishYPos, fishSize, fishSize, i);
//       fishArr.push(fish);
//       console.log(fish)
//     }
//     ctx.imageSmoothingEnabled = false;
//     //setInterval(gameLoop, 100);
    
// }

// let startBtn = document.querySelector('#michalle')
// startBtn.addEventListener('click', () => {
//   gameStart()
//   // setInterval(gameLoop, 100);
// })


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

      let foodEnemyPos = Math.floor(Math.random() * 6) + 1;
      food.foodXPos = foodEnemyPos * (canvas.width / 6);
      food.foodYSpeed = Math.floor(Math.random()*(12 - 4) + 4)
    }
  
    if(food.foodYPos + food.foodSize > cat.y && food.foodYPos < cat.y + playerSize && food.foodXPos + food.foodSize > cat.x && food.foodXPos < cat.x + playerSize) {
      console.log('hit');
      stopGame();
      let gameLost = document.createElement('h3');
      gameLost.textContent = 'You lost!';
      scoreId.appendChild(gameLost)
      // let playAgain = document.createElement('button');
      // playAgain.id = 'play-again'
      // playAgain.innerHTML = 'Play Again?'
      // scoreId.appendChild(playAgain);
      // playAgain.addEventListener('click', function() {
      //   ctx.clearRect(0, 0, canvas.width, canvas.height);
      //   setInterval(gameLoop, 100);
      // })
    }

  });

}



function fishCollision() {
  fishArr.forEach(fish => {

  //if(fish.y > cat.y - cat.height+10 && cat.x + cat.width > fish.x) {
    if(fish.y + fish.height > cat.y && fish.y < cat.y + cat.height && fish.x + fish.width > cat.x && fish.x < cat.x + cat.width) {
    const index = fishArr.indexOf(fish);
    if (index > -1) {
      fishArr.splice(index, 1);
    }
    console.log('hit');

    let gameScore = Number(score.textContent);
    let newScore = gameScore + 50;
        score.textContent = newScore;
        if(fishArr.length === 0) {
          let gameWon = document.createElement('h3');
          gameWon.textContent = 'You Win!';
          scoreId.appendChild(gameWon)
          stopGame();
          console.log(fish);
          // let playAgain = document.createElement('button');
          // playAgain = setAttribute('id', 'play-again');
          // scoreId.appendChild(playAgain)
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
    let foodEnemyPos = Math.floor(Math.random() * 6) + 1;
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
    enemyFoods.forEach(function(food) {
      ctx.drawImage(food.enemyImage, food.foodXPos, food.foodYPos, food.foodSize, food.foodSize)
    })
  }


  let varName = setInterval(gameLoop, 100);
  document.addEventListener("keydown", move)

  function stopGame() {
    clearInterval(varName);
    // let playAgain = document.createElement('button');
    // playAgain.id = 'play-again'
    // playAgain.innerHTML = 'Play Again?'
    // scoreId.appendChild(playAgain);
    // playAgain.addEventListener('click', function() {
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   fishArr.length = 0;
    //   enemyFoods.length = 0;
    //   setInterval(gameLoop, 100);
    //   //gameLoop();
    //   gameStart();
    // })
  }



