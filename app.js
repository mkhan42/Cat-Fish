let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d"); // this creates a 2 dimensional canvas
let cat;
let fish;

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
    constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.render = function () {
      ctx.drawImage(fishImage, this.x, this.y, this.width, this.height);
    };
    };
  }

  // let fishXPos = Math.random() * 100;
  // let fishYPos = Math.random() * 100;
  let fishXPos = 10;
  let fishYPos = 10;

//   setInterval(fishImage.addEventListener("load", function(e){
//     fish = new Characters(fishImage, fishXPos, fishYPos, 15, 15);
//     ctx.imageSmoothingEnabled = false;
//     fish.render();
// }), 1000)

window.addEventListener("DOMContentLoaded", function(e){
  cat = new Player(catImage, 0, 130, 20, 20);
  //fish = new Characters(fishImage, fishXPos, fishYPos, 15, 15);
  // for(let i =0; i < 20; i++) {
    //fish = new Characters(fishImage, fishXPos, fishYPos, 15, 15);
  // }
  ctx.imageSmoothingEnabled = false;
  const runGame = setInterval(gameLoop, 120);
})

// fish = new Fishies(145, 30, 30, 30)

// const arrFishies = [];                              
// function populateFishies() {
//   for(let row = 0; row < 4; row++) {
//      for(let col = 0; col < 9; col++){
//       const fish = new Fishies (
//         col * 35 + 33, row * 35 + 15, 30, 30)
//         arrFishies.push(fish)
//      }
//   }
// }

populateFishies();

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

  document.addEventListener("keydown", move)

  
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cat.render();
    //fish.render();
  }