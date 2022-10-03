//fade in cover image
var cover_img = document.getElementById("cover-image");
var player = document.getElementById("player");
var logo = document.getElementById("logo");


//**** auto fade
// setTimeout(() => {
//   fadeout(cover_img, 50);
// }, 2000);
// setTimeout(() => {
//   fadein(player);
// }, 2000);

//**** fade on click
fadein(cover_img);
cover_img.addEventListener("click", function(){
  fadeout(cover_img, 50);
  fadein(player);
}, {once: true});


//draw grey curved background shape
function draw(){
  const canvas = document.getElementById('player-canvas')
  const ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.moveTo(0, 67);
  ctx.bezierCurveTo(20, -20,  1296 - 20, -20, 1296, 67);
  ctx.moveTo(0, 440);
  ctx.bezierCurveTo(70, 600, 1296 - 70, 600, 1296, 440);
  ctx.fill();
}




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
    }, 30);
}
