
//build audio structure first
var audioCtx;
var gotContext = false;

var master_gain;
const master_slider = document.getElementById("master-slider");

const speaker_audio1 = document.getElementById("speaker-audio-1");
const speaker_audio2 = document.getElementById("speaker-audio-2");
var speaker_node1;
var speaker_node2;
var speaker_gain;

//create audio context & nodes on first mousepress
document.addEventListener("mousedown", mousedown);

function mousedown(){

  if (!gotContext){
    audioCtx = new AudioContext();
    gotContext = true;
    console.log('gotContext');
    if (audioCtx.state === "suspended"){
      audioCtx.resume();
    }
    document.removeEventListener('mousedown', mousedown);
  }

  //make all audio things

  //make master gain & connect to destination
  master_gain = audioCtx.createGain();
  master_gain.connect(audioCtx.destination);
  master_slider.oninput = function(){
    master_gain.gain.value = master_slider.value;
  };

  //speaker things
  speaker_node1 = audioCtx.createMediaElementSource(speaker_audio1);
  speaker_node2 = audioCtx.createMediaElementSource(speaker_audio2);
  speaker_gain = audioCtx.createGain();
  //connect speaker things
  speaker_node1.connect(speaker_gain);
  speaker_node2.connect(speaker_gain);
  speaker_gain.connect(master_gain);

}

//other audio variables
var curr_speaker_audio = speaker_audio1;
var speaker_audio1_fileno = 1;
var speaker_audio2_fileno = 2;
var elapsed_time = 0.;
var curr_time = 0.;




//get html elements....
var cover_img = document.getElementById("cover-image");
var player = document.getElementById("player");
var logo = document.getElementById("logo");
var title = document.getElementById("title-text");
var return_button = document.getElementById("return-button");
var wiper = document.getElementById("wiper");
wiper.addEventListener('change', wiper_clicked);

var play_button = document.getElementById("play-button");
var pause_button = document.getElementById("pause-button");
var time_display = document.getElementById("timer");

var instr_button = document.getElementById("instr-button");
var about_button = document.getElementById("about-button");

//checkboxes
var check1 = document.getElementById("check1");
var check2 = document.getElementById("check2");
var check3 = document.getElementById("check3");
var check4 = document.getElementById("check4");
var check5 = document.getElementById("check5");

//array of all checkbox elements
var checks = [check1, check2, check3, check4, check5];

var zero_mark = document.getElementById("zero-mark");
var ten_mark = document.getElementById("ten-mark");
var twenty_mark = document.getElementById("twenty-mark");
var thirty_mark = document.getElementById("thirty-mark");
var forty_mark = document.getElementById("forty-mark");

//variables for updating timeline and title
var longest = 0;
var lengths = [0, 27.23, 27.25, 31.96, 36.22, 45.28];
var marks = [ten_mark, twenty_mark, thirty_mark, forty_mark];
var all_checked = true;
var num_checked = 5;

wiper.max = lengths[5]*60.;

//variables for colored TRACKS
var track_container = document.getElementById("track-container");
var string_canvas = document.getElementById("string-canvas");
var perc_canvas = document.getElementById("perc-canvas");
var piano1_canvas = document.getElementById("piano1-canvas");
var piano2_canvas = document.getElementById("piano2-canvas");
var speaker_canvas = document.getElementById("speaker-canvas");

//array of all track canvasses
var track_canvi = [string_canvas, perc_canvas, piano1_canvas, piano2_canvas, speaker_canvas];

//get colored track contexts
const string_ctx = string_canvas.getContext('2d');
const perc_ctx = perc_canvas.getContext('2d');
const piano1_ctx = piano1_canvas.getContext('2d');
const piano2_ctx = piano2_canvas.getContext('2d');
const speaker_ctx = speaker_canvas.getContext('2d');

var track_ctxs = [string_ctx, perc_ctx, piano1_ctx, piano2_ctx];

//set colors for colored tracks
string_ctx.fillStyle = "#c59aae";
perc_ctx.fillStyle = "#cbc799";
piano1_ctx.fillStyle = "#ff98ff";
piano2_ctx.fillStyle = "#b5cb99";





//durations of audio files
const durations_string = [54.73034013605442, 65.07165532879819, 27.380997732426305, 86.49034013605443,
                    79.99433106575964, 51.95165532879819, 58.00498866213152, 96.01034013605442,
                    54.938321995464854, 58.9490022675737, 382.0209977324263, 41.27433106575964,
                    68.9009977324263, 43.82367346938776, 41.775668934240365, 64.34632653061225,
                    55.54632653061225, 55.007664399092974, 64.8209977324263, 61.94632653061225,
                    52.03700680272109, 69.31700680272108];

const num_string_segs = durations_string.length;
var string_total_dur = 0;
for (var i = 0; i < num_string_segs; i++){ string_total_dur += durations_string[i]; }
var string_seg_locs = [...Array(num_string_segs).keys()];

const durations_perc = [137.6209977324263, 38.92233560090703, 44.10632653061224, 41.14099773242631,
                  90.79433106575964, 76.0690022675737, 60.500997732426306, 36.57566893424036,
                  23.322335600907028, 39.12498866213152, 63.706326530612245, 67.06632653061224,
                  67.18367346938776, 88.27165532879819, 80.95965986394557, 66.54367346938776,
                  52.85299319727891, 50.46900226757369, 48.29299319727891, 35.919659863945576,
                  55.2690022675737, 38.218321995464855, 52.191655328798184, 51.73832199546485,
                  47.9090022675737, 41.690340136054424, 45.32233560090703, 88.91700680272109];

const num_perc_segs = durations_perc.length;
var perc_total_dur = 0;
for (var i = 0; i < num_perc_segs; i++){ perc_total_dur += durations_perc[i]; }
var perc_seg_locs = [...Array(num_perc_segs).keys()];

const durations_piano1 = [54.9809977324263, 81.8290022675737, 102.12766439909296, 50.69832199546485,
                    47.16233560090703, 75.77566893424036, 132.39433106575964, 54.83700680272109,
                    197.54632653061225, 55.434331065759636, 99.55700680272109, 106.71433106575964,
                    85.09832199546486, 83.51965986394558, 75.45566893424036, 144.12766439909296,
                    200.71965986394557, 59.71165532879819, 71.17832199546486, 52.81034013605442,
                    22.43700680272109, 63.97832199546485];

const num_piano1_segs = durations_piano1.length;
var piano1_total_dur = 0;
for (var i = 0; i < num_piano1_segs; i++){ piano1_total_dur += durations_piano1[i]; }
var piano1_seg_locs = [...Array(num_piano1_segs).keys()];

const durations_piano2 = [73.17299319727891, 212.04233560090702, 86.22367346938775, 41.044988662131516,
                    147.9409977324263, 68.00498866213152, 107.99433106575964, 91.83433106575964,
                    197.30632653061224, 79.72233560090703, 45.578321995464854, 87.62632653061225,
                    72.40498866213152, 97.50367346938775, 83.38632653061225, 79.9890022675737,
                    115.4609977324263, 48.96498866213152, 117.09299319727891, 52.91700680272109,
                    89.19965986394558, 81.88766439909297, 52.12233560090703, 43.706326530612245];

const num_piano2_segs = durations_piano2.length;
var piano2_total_dur = 0;
for (var i = 0; i < num_piano2_segs; i++){ piano2_total_dur += durations_piano2[i]; }
var piano2_seg_locs = [...Array(num_piano2_segs).keys()];

const durations_speaker = [190.65049886621316, 175.34950113378684, 167.45727891156463,
                            344.04272108843537, 184.5, 274.0, 160.0, 298.0, 266.0, 276.0,
                            248.0, 133.00766439909296];
const num_speaker_segs = durations_speaker.length;
var speaker_total_dur = 0;
for (var i = 0; i < num_speaker_segs; i++){ speaker_total_dur += durations_speaker[i]; };

var all_durations = [durations_string, durations_perc, durations_piano1, durations_piano2];
var all_num_segs = [num_string_segs, num_perc_segs, num_piano1_segs, num_piano2_segs];
var all_total_durs = [string_total_dur, perc_total_dur, piano1_total_dur, piano2_total_dur];
var all_seg_locs = [string_seg_locs, perc_seg_locs, piano1_seg_locs, piano2_seg_locs];


var playing = false;
var longest_changed = true;
var curr_track_status = [false, false, false, false, false];
var checks_changed = false;




//**** auto fade when opening the page
setTimeout(() => {
   fadeout(cover_img, 50);
 }, 500);
 setTimeout(() => {
   fadein(player);
 }, 500);

//***** opening popup windows
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



//***** double-click and single-click play button functions
play_button.addEventListener("dblclick", play_dbl_click);
play_button.addEventListener("click", play_single_click);

//**** pause button function
pause_button.addEventListener("click", pause);


//***** play button double click function
function play_dbl_click(){
  //randomize track segments
  randomize_track_segments();

  //do reload track animation and redraw tracks
  setTimeout(function(){
    load_tracks();
    draw_colored_tracks();
  }, 200);
}


//***** pause button function
function pause(){
  if (playing){
    playing = false;
    console.log("paused");
    //stop longest audio
    curr_speaker_audio.pause();
    stop_time_display();
  }
}


//***** play button single click function
function play_single_click(){

  //get the longest checked track
  get_longest();
  //get checkbox statuses
  get_check_status();

  //if longest changed, randomize track segments to match
  if (longest_changed){
    randomize_track_segments();
  }

  //if checks changed, re-update everything
  if (checks_changed){
    //update timeline
    draw_timeline();

    //update title
    update_title();

    //update track on/off according to checkboxes
    update_track_activation();

    //do reload track animation and redraw tracks
    setTimeout(function(){
      load_tracks();
      draw_colored_tracks();
    }, 200);
  }

  //pause/play functionality
  //do nothing if you press play while playing
  if (playing == false){
    playing = true;
    console.log("playing");
    //start longest audio
    curr_speaker_audio.play();
    start_time_display();

  }

}

//curr_speaker_audio.currentTime = 180;
//speaker_audio2.currentTime = 170;

speaker_audio1.addEventListener("ended", speaker1_ended);
speaker_audio2.addEventListener("ended", speaker2_ended);

function speaker1_ended(){
  //switch to second audio object
  curr_speaker_audio = speaker_audio2;
  //speaker_audio2.currentTime = speaker_audio2.duration - 10;
  curr_speaker_audio.play();
  console.log(curr_speaker_audio.src);

  //add audio time to elapsed time
  elapsed_time += speaker_audio1.duration;

  //load next audio file
  if (speaker_audio1_fileno != 11){
    speaker_audio1_fileno += 2;
    speaker_audio1.src = "assets/audio/45' for a Speaker/45' - " + speaker_audio1_fileno.toString() + ".wav";
    speaker_audio1.load();
  }
}

function speaker2_ended(){
  //if it's not the last one
  if (speaker_audio2_fileno != 12){
    //add audio time to elapsed time
    elapsed_time += speaker_audio2.duration;
    //switch to first audio object
    curr_speaker_audio = speaker_audio1;
    //speaker_audio1.currentTime = speaker_audio1.duration - 10;
    curr_speaker_audio.play();
    console.log(curr_speaker_audio.src);

    //load next audio file
    speaker_audio2_fileno += 2;
    speaker_audio2.src = "assets/audio/45' for a Speaker/45' - " + speaker_audio2_fileno.toString() + ".wav";
    speaker_audio2.load();
  }
  else{
    playing = false;
  }
}




//function to start time display
var time_poller;
function start_time_display(){
  time_poller = setInterval(function(){

    curr_time = elapsed_time + curr_speaker_audio.currentTime;
    time_display.innerHTML = sec_to_minsec(Math.round(curr_time));

    wiper.value = curr_time;

  }, 1000);
}
//function to stop time display
function stop_time_display(){
  clearInterval(time_poller);
}








//when wiper is clicked, go to that time in the music
function wiper_clicked(){

  stop_time_display();

  //briefly set current time
  time_display.innerHTML = sec_to_minsec(Math.round(wiper.value));
  //stop current audio
  curr_speaker_audio.pause();

  //then, figure out what the elapsed time should be
  var i = 0;
  elapsed_time = 0;
  while(wiper.value > elapsed_time + durations_speaker[i]){
    elapsed_time += durations_speaker[i];
    i+= 1;
  }
  //the files to load (load into 1 or 2 depending on the number)
  if (i%2 == 0){
    speaker_audio1_fileno = i+1;
    speaker_audio1.src = "assets/audio/45' for a Speaker/45' - " + speaker_audio1_fileno.toString() + ".wav";
    speaker_audio1.load();
    if (i+2 <= 12){
      speaker_audio2_fileno = i+2;
      speaker_audio2.src = "assets/audio/45' for a Speaker/45' - " + speaker_audio2_fileno.toString() + ".wav";
      speaker_audio2.load();
    }
    curr_speaker_audio = speaker_audio1;
  }
  else{
    speaker_audio2_fileno = i+1;
    speaker_audio2.src = "assets/audio/45' for a Speaker/45' - " + speaker_audio2_fileno.toString() + ".wav";
    speaker_audio2.load();
    if (i+2 <= 11){
      speaker_audio1_fileno = i+2;
      speaker_audio1.src = "assets/audio/45' for a Speaker/45' - " + speaker_audio1_fileno.toString() + ".wav";
      speaker_audio1.load();
    }
    curr_speaker_audio = speaker_audio2;
  }

  //get current time of the playing audio
  curr_speaker_audio.oncanplay = function(){
    curr_speaker_audio.currentTime = wiper.value - elapsed_time;
  }
  console.log(curr_speaker_audio.currentTime);
  //play, if it's playing
  if (playing){
    curr_speaker_audio.play();
    console.log(curr_speaker_audio.src);
    console.log(curr_speaker_audio.currentTime);
    start_time_display();
  }
}






//****** update track on/off according to checkboxes
// NEEDS AUDIO STUFF!
function update_track_activation(){

  var curr_check;
  var curr_canvas;

  //iterate through all tracks
  setTimeout(function(){
    for(var i = 0; i < track_canvi.length; i++){
      curr_check = checks[i];
      curr_canvas = track_canvi[i];

      //if track is CHECKED
      if (curr_check.checked){
        //turn track opacity on
        curr_canvas.style.setProperty('opacity', 1);

        //turn audio on
      }
      else{
        //turn track opacity off
        curr_canvas.style.setProperty('opacity', 0);
        //turn audio off
      }
    }
  }, 200);
}






































//testing audio levels with volume slider
const root = document.querySelector(':root');

// set css variable

// master_slider.oninput = function() {
//     root.style.setProperty('--string-level', master_slider.value);
//     root.style.setProperty('--perc-level', master_slider.value);
//     root.style.setProperty('--piano1-level', master_slider.value);
//     root.style.setProperty('--piano2-level', master_slider.value);
//     root.style.setProperty('--speaker-level', master_slider.value);
// }



//**************FUNCTIONS************************************************

//draw colored track segments
function draw_colored_tracks(){
  var ctx;
  var durs;
  var num_segs;
  var seg_locs;

  var xpos;
  var width;

  //for each track that's not the longest...
  for (var i = 0; i < longest-1; i++){

    ctx = track_ctxs[i]; //canvas context
    durs = all_durations[i]; //durations of each segment
    num_segs = all_num_segs[i]; //number of segments
    seg_locs = all_seg_locs[i]; //segment locations on timeline

    //clear canvas
    ctx.clearRect(0, 0, 1204, 100);

    //for special case of string + perc, draw string segs slightly shorter for visuaal effect
    if (longest == 2){
      for(var j = 0; j < num_segs; j++){
        xpos = Math.round(seg_locs[j] / (lengths[longest] * 60.) * 1204);
        width = Math.round((durs[j] - 5) / (lengths[longest] * 60.) * 1204);
        ctx.fillRect(xpos, 0, width, 100);
      }
    }
    //otherwise draw at normal size
    else{
      for(var j = 0; j < num_segs; j++){
        xpos = Math.round(seg_locs[j] / (lengths[longest] * 60.) * 1204);
        width = Math.round(durs[j] / (lengths[longest] * 60.) * 1204);
        ctx.fillRect(xpos, 0, width, 100);
      }
    }
  }

  //for the longest track...
  if (longest != 5 && longest != 0){
    ctx = track_ctxs[longest-1];
    ctx.clearRect(0, 0, 1204, 100);
    ctx.fillRect(0, 0, 1204, 100);
  }
}

//randomize colored track segment positions
function randomize_track_segments(){
  //https://stackoverflow.com/questions/33831442/random-placement-of-non-overlapping-intervals

  var durs;
  var total_dur;
  var num_segs;
  var seg_locs;

  var point_interval = 0;
  var point_loc;


  var prev_point;
  var dist;

  var prev_loc;

  //for each track that's not longest...
  for (var i = 0; i < longest-1; i++){

    durs = all_durations[i]; //durations of each segment
    total_dur = all_total_durs[i]; //total duration of all segments combined
    num_segs = all_num_segs[i]; //number of segments
    seg_locs = all_seg_locs[i]; //segment locations on timeline

    //first, get total length of blank space...
    point_interval = lengths[longest]*60. - total_dur;
    var point_locs = [];
    prev_point = 0;
    //and pick a random point in that interval for each segment
    for (var j = 0; j < num_segs; j++){
      point_loc = Math.random() * ((j+1)*point_interval/num_segs - prev_point) + prev_point;
      point_locs.push(point_loc);
      prev_point = point_locs[point_locs.length-1];
    }

    //and shuffle durations (shuffle segment order)
    durs = shuffle(durs);


    //get distance between points
    var point_dists = [];
    prev_point = 0;
    for (var j = 0; j < num_segs; j++){
      dist = point_locs[j] - prev_point;
      point_dists.push(dist);
      prev_point = point_locs[j];
    }

    //then, find actual segment locations by expanding segment points to their actual durations
    prev_loc = 0;
    for (var j = 0; j < num_segs; j++){
      seg_locs[j] = prev_loc + point_dists[j];
      prev_loc += point_dists[j] + durs[j];
    }

  }

}

//***** update title
var title_len_options = ["", "26\' 1.1499\"", "27\' 10.554\"", "31\' 57.9864\"", "34\' 46.776\"", "45\'"];
var title_instr_options = ["", "string player", "percussionist", "pianist", "pianist", "speaker"];
function update_title(){

  //if all are checked, use ten thousand things title
  if (all_checked){
    title.innerHTML = "The Ten Thousand Things for speaker, string player, percussionist, and two pianists";
  }
  else{
    //fix two pianists issue for 34'
    var two_pianists = false;
    if (longest == 4 && checks[2].checked){
      title.innerHTML = title_len_options[longest] + " for ";
      two_pianists = true;
    }
    else{
      //otherwise get first instrument from longest
      title.innerHTML = title_len_options[longest] + " for ";
      if (num_checked <= 2 && longest != 5){
        title.innerHTML += " a ";
      }
      title.innerHTML += title_instr_options[longest];
    }


    //get array of remaining instruments, with checking for two pianists
    var title_part2 = [];

    if (two_pianists){
      if (checks[0].checked){
        title_part2.push(title_instr_options[1]);
      }
      if (checks[1].checked){
        title_part2.push(title_instr_options[2]);
      }
    }

    else{
      for (var i = 0; i < longest-1; i++){
        if (checks[i].checked){
          title_part2.push(title_instr_options[i+1]);
        }
      }
    }


    //fix two pianists issue for 45'....
    if (new Set(title_part2).size != title_part2.length){
      title_part2[title_part2.indexOf("pianist")] = "two pianists";
      title_part2.splice(title_part2.indexOf("pianist"), 1);
    }

    //add remaining instruments to title string
    if (two_pianists){
      if (title_part2.length > 0){
        for (var i = 0; i < title_part2.length; i++){
          title.innerHTML += title_part2[i];
          if (title_part2.length > 1){
            title.innerHTML += ", "; //oxford comma....
          }
        }
        title.innerHTML += " and two pianists";
      }
      else{
        title.innerHTML += "two pianists";
      }
    }
    else{
      if (title_part2.length > 0){
        for (var i = 0; i < title_part2.length-1; i++){
          title.innerHTML += ", " + title_part2[i];
        }
        if (title_part2.length > 1){
          title.innerHTML += ","; //oxford comma....
        }
        title.innerHTML += " and " + title_part2[title_part2.length-1];
      }
    }

  }
}

//get info about checkboxes
function get_check_status(){

  //see if all tracks are checked
  //and see if track checks changed or not
  all_checked = true;
  num_checked = 0;
  checks_changed = false;
  for (var i = 0; i < checks.length; i++){

    //see if all are checked or not
    if (checks[i].checked == false){
      all_checked = false;
    }
    //get total number of checks
    else {
      num_checked += 1;
    }

    //if checkmark has changed from before, mark checks changed
    if (checks[i].checked != curr_track_status[i]){
      checks_changed = true;
      //and save new check status
      curr_track_status[i] = checks[i].checked;
    }
  }
}

//animate width of track container to load tracks
//swipes the width for the animation; no actual changing of track info!
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

//updates timeline based on checked values
//also updates wiper size
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

  wiper.max = lengths[longest] * 60.;
}

//get the longest checked track
function get_longest(){
  var old_longest = longest;
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
  if (old_longest == longest){
    longest_changed = false;
  }
  else{
    longest_changed = true;
  }
}

//fade out, for inital cover fade
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

//fade in, for initial player fade
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

//shuffle an Array
//from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


//draw static canvas shapes; this gets called every time the canvas is resized! & once on load-in of the page
function draw(){

  //drawing static things....
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



  //draw colored track segments, according to current randomization positions
  draw_colored_tracks();

}

//turn seconds into formatted xx:xx minutes and seconds
function sec_to_minsec(seconds){
  let minutes = Math.floor(seconds / 60);
  let extraSeconds = seconds % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;

  return(minutes.toString() + ":" + extraSeconds.toString());
}
