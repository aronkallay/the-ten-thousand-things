var cover_img = document.getElementById("cover-image");
var player = document.getElementById("player");
var logo = document.getElementById("logo");
var title = document.getElementById("title-text");
var return_button = document.getElementById("return-button");
var wiper = document.getElementById("wiper");
var play_button = document.getElementById("play-button");

var check1 = document.getElementById("check1");
var check2 = document.getElementById("check2");
var check3 = document.getElementById("check3");
var check4 = document.getElementById("check4");
var check5 = document.getElementById("check5");

var zero_mark = document.getElementById("zero-mark");
var ten_mark = document.getElementById("ten-mark");
var twenty_mark = document.getElementById("twenty-mark");
var thirty_mark = document.getElementById("thirty-mark");
var forty_mark = document.getElementById("forty-mark");


var longest = 5;

var lengths = [0, 26, 27.17, 32, 34.75, 45];

//**** auto fade
// setTimeout(() => {
//   fadeout(cover_img, 50);
// }, 2000);
// setTimeout(() => {
//   fadein(player);
// }, 2000);



//fade in cover image on click
fadein(cover_img);
cover_img.addEventListener("click", function(){
  fadeout(cover_img, 50);
  fadein(player);
}, {once: true});


//TESTING TESTING TESTING!!!!
var clicked = 0;

return_button.addEventListener("click", title_test);

function title_test(){
  if (clicked == 0){
    title.innerHTML = "test good";
    clicked = 1;
  }
  else{
    title.innerHTML = "The Ten Thousand Things for speaker, string player, percussionist, and two pianists";
    clicked = 0;
  }
}


var playing = 0;
play_button.addEventListener("click", play_test);

function play_test(){
  get_longest();
  draw_timeline();
}


function get_longest(){
  if (check5.checked){
    longest = 5;
  }
  else if (check4.checked){
    longest = 4;
  }
  else if (check3.checked){
    longest = 3;
  }
  else if (check2.checked){
    longest = 2;
  }
  else if (check1.checked){
    longest = 1;
  }
  else{
    longest = 0;
  }
  console.log(longest);
}




//END TESTING



//draw static canvas shapes
function draw(){
  const canvas = document.getElementById('player-canvas')
  const ctx = canvas.getContext('2d');

  //grey background
  ctx.fillStyle = "#999999";
  ctx.beginPath();
  ctx.moveTo(0, 67);
  ctx.bezierCurveTo(20, -20,  1296 - 20, -20, 1296, 67);
  ctx.moveTo(0, 440);
  ctx.bezierCurveTo(70, 600, 1296 - 70, 600, 1296, 440);
  ctx.fill();
  ctx.fillRect(0, 67, 1296, 373);

  //white playback area
  ctx.roundRect(55, 113, 1203, 322, 3);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.fill();

  headshot = new Image();
  headshot.onload = function(){
    ctx.globalAlpha = 0.1;
    ctx.drawImage(headshot, 467, 113, 362, 322 );
  };
  headshot.src = 'assets/graphics/john-cage-headshot.png';

  //grey lines separating tracks
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#c1c1c1";
  ctx.beginPath();
  ctx.moveTo(55, 177);
  ctx.lineTo(1258, 177);
  ctx.moveTo(55, 241);
  ctx.lineTo(1258, 241);
  ctx.moveTo(55, 305);
  ctx.lineTo(1258, 305);
  ctx.moveTo(55, 369);
  ctx.lineTo(1258, 369);
  ctx.closePath();
  ctx.stroke();


  //volume rectangles
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.fillStyle = "#888888";
  ctx.roundRect(1262, 113, 20, 62, 2);
  ctx.stroke();
  ctx.fill();
  ctx.roundRect(1262, 178, 20, 61, 2);
  ctx.stroke();
  ctx.fill();
  ctx.roundRect(1262, 242, 20, 61, 2);
  ctx.stroke();
  ctx.fill();
  ctx.roundRect(1262, 306, 20, 61, 2);
  ctx.stroke();
  ctx.fill();
  ctx.roundRect(1262, 370, 20, 65, 2);
  ctx.stroke();
  ctx.fill();

  //timeline ticks
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  for(var i = 0; i < 70; i++){
    ctx.beginPath();
    ctx.moveTo(65 + i*17.2, 97);
    ctx.lineTo(65 + i*17.2, 107);
    ctx.closePath();
    ctx.stroke();
  }

}



function draw_timeline(){
  length = lengths[longest];
  if (length == 0){
    ten_mark.style.display = "none";
    twenty_mark.style.display = "none";
    thirty_mark.style.display = "none";
    forty_mark.style.display  = "none";
  }
  else{
    ten_mark.style.left = "calc(70/" + length + "*10*15 / 1296 * var(--main-width))";
    twenty_mark.style.left = "calc(70/" + length + "*20*15 / 1296 * var(--main-width))";
    thirty_mark.style.left = "calc(70/" + length + "*30*15 / 1296 * var(--main-width))";
    forty_mark.style.left = "calc(70/" + length + "*40*15 / 1296 * var(--main-width))";
  }
}


//**************FUNCTIONS************************************************

//fade out
function fadeout(element, time) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.05){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, time);
}

//fade in
function fadein(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 50);
}

//rounded rectangle for canvas
//from https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-using-html-canvas
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y,   x+w, y+h, r);
  this.arcTo(x+w, y+h, x,   y+h, r);
  this.arcTo(x,   y+h, x,   y,   r);
  this.arcTo(x,   y,   x+w, y,   r);
  this.closePath();
  return this;
}
