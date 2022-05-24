let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let score = document.querySelector('#score');
let cat;
let fish;
let fishArr = [];
let fishXPos = Math.floor(Math.random() * 100);
let fishYPos = Math.floor(Math.random() * 100);
let enemy;


canvas.style.background = '#571FF1';
canvas.style.border = '8px solid #54123B';

const catImage = new Image();
catImage.src = "images/grinning-cat-face.png";

const fishImage = new Image();
fishImage.src = 'images/fish.png';

const enemyImage = new Image();
enemyImage.src = 'images/banana.png';

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

  // class Enemy {
  //   constructor(x, y, color, width, height, speed){
  //       this.x = x;
  //       this.y = y;
  //       this.color = color;
  //       this.height = height;
  //       this.width = width; 
  //       this.alive = true;
  //       this.speed = speed;

  //       // this.dx = 1 * this.speed;
  //       // this.dy = 1 * this.speed;


  //   }

  //   render() {
  //       ctx.fillStyle = this.color;
  //       ctx.fillRect(this.x, this.y, this.width, this.height)
  //   }
  // }

let enemyXPos = 0;
let enemyYPos = 0;
let enemyXSpeed = 5;
let enemyYSpeed = 5;

  class Enemy {
    constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.alive = true;
    this.speed = speed;
    this.render = function () {
      ctx.drawImage(enemyImage, this.x, this.y, this.width, this.height);
    };
    };

    move() {
      enemyXPos += enemyXSpeed;
    }
  }



window.addEventListener("DOMContentLoaded", function(e){
  cat = new Player(0, 130, 20, 20);
  for(let i = 0; i < 30; i++) {
    const fishXPos = Math.floor(Math.random() * 100);
    const fishYPos = Math.floor(Math.random() * 100);
    fish = new Fishies(fishXPos * 2.8, fishYPos, 15, 15);
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

function enemyMove() {
  enemyYPos += enemyYSpeed;

}
  
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cat.render();

      fishArr.forEach(fish => {
        fish.render();
    })
    enemy = new Enemy(enemyXPos, enemyYPos, 15, 15)
    enemy.render();
    enemyMove();
  }


  let varName = setInterval(gameLoop, 100);
  document.addEventListener("keydown", move)



