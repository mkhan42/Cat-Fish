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
fishImage.src = `images/fish${Math.floor(Math.random()*7)}.png`;

let startingPos = true;
let totalEnimies = 20;
let enemyFoods = [];

let state = false;

//random number range function
function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max - min + 1))
}

let fishLength = generateRandomInteger(30,100);

//used to create the cat player on to the canvas
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

  //useed to create fishies on to the canvas
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


//function that stores almost everything which will then be later called in an onclick to start the game
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

    //function to use the keys to make the cat move
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

    //detecting fish collusion and win condition
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

  //Creating an object of enemies and pushing it onto array
  function makeEnemyFood() {
    let foodEnemyPos = Math.floor(Math.random() * 8) + 1;
    const foodSize = 40;
    let enemyImage = new Image();
    enemyImage.src = `images/enemy${Math.floor(Math.random()*3)}.png`;
    
    let food = {
      foodXPos: foodEnemyPos * (canvas.width / 8),
      foodYPos: 0 - foodSize,
      foodSize: foodSize,
      foodXSpeed: 5,
      foodYSpeed: Math.floor(Math.random() * 8 + 10),
      enemyImage: enemyImage
    }
    enemyFoods.push(food);
  }

  //drawing the enemies array using a forEach statement.
  function drawEnemyFood() {
    enemyFoods.forEach(function(food) {
      ctx.drawImage(food.enemyImage, food.foodXPos, food.foodYPos, food.foodSize, food.foodSize)
      ctx.imageSmoothingEnabled = false;
    })
  }

  //function that makes the enimies actually move at different speeds on random positions in that canvas
  function enemyFoodMove() {
    enemyFoods.forEach(function(food) {
      food.foodYPos += food.foodYSpeed;
      if(food.foodYPos > canvas.height) {
        food.foodYPos = 0 - food.foodSize;
        let foodEnemyPos = Math.floor(Math.random() * 8) + 1;
        food.foodXPos = foodEnemyPos * (canvas.width / 8);
        food.foodYSpeed = Math.floor(Math.random()*8 + 10)
      }
  
      //colluision detection and lose condition
      if(food.foodYPos + food.foodSize > cat.y && food.foodYPos < cat.y + playerSize && food.foodXPos + food.foodSize > cat.x && food.foodXPos < cat.x + playerSize) {
        while(!state) {
          let gameLost = document.createElement('h3');
          gameLost.textContent = 'Cat got scared by the fruits and vegtables. You lost!';
          scoreId.appendChild(gameLost)
          stopGame();
          state = true;
        }
      }
    });
  }
  
  //renders everything on to the screen
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

    let loopInterval = setInterval(gameLoop, 50);
    document.addEventListener("keydown", move)
  
    //stops the game by clearing the interval
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

//starts the game
let startBtn = document.querySelector('#michalle')
startBtn.addEventListener('click', () => {
  gameStart()
  startBtn.style.display = 'none'
  scoreId.style.display = 'block'
  instructions.style.display = 'none'
})




