let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d"); // this creates a 2 dimensional canvas
// canvas.setAttribute("height", getComputedStyle(canvas)["height"]);
// canvas.setAttribute("width", getComputedStyle(canvas)["width"]);
// let score = document.querySelector('#score');
// let movement = document.querySelector('#movement');
let window_height = window.innerHeight;
let window_width = window.innerWidth;
let buddy;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = '#ff8';

const buddyImage = new Image();
buddyImage.src = "images/Untitled_Artwork.png";

class LilBuddy {
    constructor(url, x, y, width, height) {
    this.url = url;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.alive = true;
    this.render = function () {
      ctx.drawImage(this.url, this.x, this.y, this.width, this.height);
    }
    };
  }


  window.addEventListener("DOMContentLoaded", function (e){
    buddy = new LilBuddy(buddyImage, 100, 20, 500, 500);
    buddy.render();

})