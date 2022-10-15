var cover_img = document.getElementById("cover-image");
var player = document.getElementById("player");
var logo = document.getElementById("logo");
var title = document.getElementById("title-text");
var return_button = document.getElementById("return-button");
var wiper = document.getElementById("wiper");
var play_button = document.getElementById("play-button");

var instr_button = document.getElementById("instr-button");
var about_button = document.getElementById("about-button");

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

//variables for timeline
var longest = 5;
var lengths = [0, 26, 27.17, 32, 34.75, 45];
var marks = [ten_mark, twenty_mark, thirty_mark, forty_mark];

//variables for colored TRACKS
var track_container = document.getElementById("track-container");
var string_canvas = document.getElementById("string-canvas");
var perc_canvas = document.getElementById("perc-canvas");
var piano1_canvas = document.getElementById("piano1-canvas");
var piano2_canvas = document.getElementById("piano2-canvas");
var speaker_canvas = document.getElementById("speaker-canvas");

//durations of audio files
durations_string = [54.73034013605442, 65.07165532879819, 27.380997732426305, 86.49034013605443,
                    79.99433106575964, 51.95165532879819, 58.00498866213152, 96.01034013605442,
                    54.938321995464854, 58.9490022675737, 382.0209977324263, 41.27433106575964,
                    68.9009977324263, 43.82367346938776, 41.775668934240365, 64.34632653061225,
                    55.54632653061225, 55.007664399092974, 64.8209977324263, 61.94632653061225,
                    52.03700680272109, 69.31700680272108];

durations_perc = [137.6209977324263, 38.92233560090703, 44.10632653061224, 41.14099773242631,
                  90.79433106575964, 76.0690022675737, 60.500997732426306, 36.57566893424036,
                  23.322335600907028, 39.12498866213152, 63.706326530612245, 67.06632653061224,
                  67.18367346938776, 88.27165532879819, 80.95965986394557, 66.54367346938776,
                  52.85299319727891, 50.46900226757369, 48.29299319727891, 35.919659863945576,
                  55.2690022675737, 38.218321995464855, 52.191655328798184, 51.73832199546485,
                  47.9090022675737, 41.690340136054424, 45.32233560090703, 88.91700680272109];

durations_piano1 = [54.9809977324263, 81.8290022675737, 102.12766439909296, 50.69832199546485,
                    47.16233560090703, 75.77566893424036, 132.39433106575964, 54.83700680272109,
                    197.54632653061225, 55.434331065759636, 99.55700680272109, 106.71433106575964,
                    85.09832199546486, 83.51965986394558, 75.45566893424036, 144.12766439909296,
                    200.71965986394557, 59.71165532879819, 71.17832199546486, 52.81034013605442,
                    22.43700680272109, 63.97832199546485];

durations_piano2 = [73.17299319727891, 212.04233560090702, 86.22367346938775, 41.044988662131516,
                    147.9409977324263, 68.00498866213152, 107.99433106575964, 91.83433106575964,
                    197.30632653061224, 79.72233560090703, 45.578321995464854, 87.62632653061225,
                    72.40498866213152, 97.50367346938775, 83.38632653061225, 79.9890022675737,
                    115.4609977324263, 48.96498866213152, 117.09299319727891, 52.91700680272109,
                    89.19965986394558, 81.88766439909297, 52.12233560090703, 43.706326530612245];

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


//open popup windows
let instr_params = `status=no,location=no,toolbar=no,menubar=no,
width=650,height=700,left=100,top=100`;
instr_button.onclick = () => {
  window.open('pages/instructions.html', "instructions", instr_params);
};

let about_params = `status=no,location=no,toolbar=no,menubar=no,
width=750,height=420,left=700,top=100`;
about_button.onclick = () => {
  window.open('pages/about.html', "about", about_params);
};


//TESTING TESTING TESTING!!!!
var clicked = 0;

//return_button.addEventListener("click", title_test);

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
  load_tracks();
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
  const canvas = document.getElementById('player-canvas');
  const ctx = canvas.getContext('2d');

  const border_canvas = document.getElementById('border-canvas');
  const border_ctx = border_canvas.getContext('2d');

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

  ctx.fillStyle = "white";
  ctx.fill();

  //black border lines
  border_ctx.roundRect(55, 113, 1203, 322, 3);
  border_ctx.strokeStyle = "black";
  border_ctx.lineWidth = 2;
  border_ctx.stroke();


  //grey lines separating tracks
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#888888";
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

  //draw colored track segments
  const string_ctx = string_canvas.getContext('2d');
  const perc_ctx = perc_canvas.getContext('2d');
  const piano1_ctx = piano1_canvas.getContext('2d');
  const piano2_ctx = piano2_canvas.getContext('2d');
  const speaker_ctx = speaker_canvas.getContext('2d');


}


//updates timeline based on checked values
function draw_timeline(){
  length = lengths[longest];
  if (length == 0){
    for (var i = 0; i < marks.length; i++){
      mark = marks[i];
      mark.style.display = "none";
    }
  }
  else{
    for (var i = 0; i < marks.length; i++){
      mark = marks[i];
      mark.style.display = "inline";
    }
    ten_mark.style.left = "calc(70/" + length + "*10*15 / 1296 * var(--main-width))";
    twenty_mark.style.left = "calc(70/" + length + "*20*15 / 1296 * var(--main-width))";
    thirty_mark.style.left = "calc(70/" + length + "*30*15 / 1296 * var(--main-width))";
    forty_mark.style.left = "calc(70/" + length + "*40*15 / 1296 * var(--main-width))";
  }
}

//animate width of track container to load tracks
function load_tracks(){
  track_container.style.transition = "none";
  track_container.style.width = "0px";
  setTimeout(() => {
    track_container.style.transition = "1000ms linear";
    track_container.style.width = "calc(1204/1296 * var(--main-width))";
  }, 2);
  setTimeout(() => {
    track_container.style.transition = "none";
  }, 1004);
}



//testing audio levels with volume slider
const root = document.querySelector(':root');
const master_slider = document.getElementById("master-slider");
// set css variable

master_slider.oninput = function() {
    root.style.setProperty('--string-level', master_slider.value);
    root.style.setProperty('--perc-level', master_slider.value);
    root.style.setProperty('--piano1-level', master_slider.value);
    root.style.setProperty('--piano2-level', master_slider.value);
    root.style.setProperty('--speaker-level', master_slider.value);
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
