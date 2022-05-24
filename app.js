let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let score = document.querySelector('#score');
let cat;
let fish;
let fishArr = [];

canvas.style.background = '#571FF1';
canvas.style.border = '8px solid #54123B';

const catImage = new Image();
catImage.src = "images/grinning-cat-face.png";

const fishImage = new Image();
fishImage.src = 'images/fish.png';

class Player {
    constructor(url, x, y, width, height) {
    this.url = url;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.alive = true;
    this.render = function () {
      ctx.drawImage(this.url, this.x, this.y, this.width, this.height);
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

    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
    this.render = function () {
      ctx.drawImage(fishImage, this.x, this.y, this.width, this.height);
    };
    };

  }

  let fishXPos = Math.floor(Math.random() * 100);
  let fishYPos = Math.floor(Math.random() * 100);

window.addEventListener("DOMContentLoaded", function(e){
  cat = new Player(catImage, 0, 130, 20, 20);
  ctx.imageSmoothingEnabled = false;
  //const playGame = setInterval(gameLoop, 100);
  for(let i = 0; i < 30; i++) {
    const fishXPos = Math.floor(Math.random() * 100);
    const fishYPos = Math.floor(Math.random() * 100);
    fish = new Fishies(fishXPos * 2.8, fishYPos, 15, 15);
    fishArr.push(fish);
    console.log(fish)
    //console.log(fishArr);
  }
      //console.log(fish)

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

  

  
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cat.render();

    fishArr.forEach(fish => {
      fish.render();
    })
  }

  let varName = setInterval(gameLoop, 100);

  document.addEventListener("keydown", move)



