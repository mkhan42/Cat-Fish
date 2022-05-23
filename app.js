let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d"); // this creates a 2 dimensional canvas
let buddy;

// canvas.width = window_width;
// canvas.height = window_height;

// window_height = 50;

canvas.style.background = '#571FF1';

const buddyImage = new Image();
buddyImage.src = "images/grinning-cat-face.png";

class Characters {
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

  window.addEventListener("DOMContentLoaded", function(){

    buddy = new Characters(buddyImage, 100, 20, 20, 20);
    ctx.imageSmoothingEnabled = false
    buddy.render();

})