document.addEventListener('keyup', event => {
  if (event.code === 'Space') {
    if(playing){
      pause();
    }
    else{
      play();
    }
  }
})



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
var shuffle_button = document.getElementById("shuffle-button");
var time_display = document.getElementById("timer");

var master_slider = document.getElementById("master-slider");
var master_mute = document.getElementById("master-vol");

var string_mute = document.getElementById("vol1");
var perc_mute = document.getElementById("vol2");
var piano1_mute = document.getElementById("vol3");
var piano2_mute = document.getElementById("vol4");
var speaker_mute = document.getElementById("vol5");

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
var string_order = [...Array(num_string_segs).keys()];

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
var perc_order = [...Array(num_perc_segs).keys()];

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
var piano1_order = [...Array(num_piano1_segs).keys()];

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
var piano2_order = [...Array(num_piano2_segs).keys()];

const durations_speaker = [190.65049886621316, 175.34950113378684, 167.45727891156463,
                            344.04272108843537, 184.75, 273.75, 159.5, 298.5,
                           267.3750113378685, 274.6250113378685, 251.75,
                            129.25766439909296]
const num_speaker_segs = durations_speaker.length;
var speaker_total_dur = 0;
for (var i = 0; i < num_speaker_segs; i++){ speaker_total_dur += durations_speaker[i]; };

var all_durations = [durations_string, durations_perc, durations_piano1, durations_piano2];
var all_num_segs = [num_string_segs, num_perc_segs, num_piano1_segs, num_piano2_segs];
var all_total_durs = [string_total_dur, perc_total_dur, piano1_total_dur, piano2_total_dur];
var all_seg_locs = [string_seg_locs, perc_seg_locs, piano1_seg_locs, piano2_seg_locs];
var all_orders = [string_order, perc_order, piano1_order, piano2_order];

var next_events = [string_seg_locs[0], perc_seg_locs[0], piano1_seg_locs[0], piano2_seg_locs[0]];
var current_events = [null, null, null, null];


var playing = false;
var longest_changed = true;
var curr_track_status = [false, false, false, false, false];
var checks_changed = false;

var at_end = false;

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

master_slider.oninput = function(){
  Howler.volume(this.value);
}

master_mute.addEventListener("change", function(){
  if (this.checked){
    Howler.mute(false);
  }
  else{
    Howler.mute(true);
  }
})

string_mute.addEventListener("change", function(){
  if(this.checked){
    string_sound1.mute(false);
    string_sound2.mute(false);
  }
  else{
    string_sound1.mute(true);
    string_sound2.mute(true);
  }
})

perc_mute.addEventListener("change", function(){
  if(this.checked){
    perc_sound1.mute(false);
    perc_sound2.mute(false);
  }
  else{
    perc_sound1.mute(true);
    perc_sound2.mute(true);
  }
})

piano1_mute.addEventListener("change", function(){
  if(this.checked){
    piano1_sound1.mute(false);
    piano1_sound2.mute(false);
  }
  else{
    piano1_sound1.mute(true);
    piano1_sound2.mute(true);
  }
})

piano2_mute.addEventListener("change", function(){
  if(this.checked){
    piano2_sound1.mute(false);
    piano2_sound2.mute(false);
  }
  else{
    piano2_sound1.mute(true);
    piano2_sound2.mute(true);
  }
})

speaker_mute.addEventListener("change", function(){
  if(this.checked){
    speaker_sound1.mute(false);
    speaker_sound2.mute(false);
  }
  else{
    speaker_sound1.mute(true);
    speaker_sound2.mute(true);
  }
})



return_button.addEventListener("click", rewind);

function rewind(){

  console.log(rewind);
  wiper.value = 0;
  wiper_clicked();
}




//***** double-click and single-click play button functions
shuffle_button.addEventListener("dblclick", double_click);
shuffle_button.addEventListener("click", single_click);

//**** pause button function
pause_button.addEventListener("click", pause);
play_button.addEventListener("click", play);

var play_timeout;
//***** play button double click function
function double_click(){

  console.log("double");

  //randomize track segments
  randomize_track_segments();

  //do reload track animation and redraw tracks
  setTimeout(function(){
    load_tracks();
    draw_colored_tracks();
  }, 200);

}

function single_click(){
  //get the longest checked track
  get_longest();
  //get checkbox statuses
  get_check_status();

  //if longest changed, randomize track segments to match
  if (longest_changed){
    //update timeline
    draw_timeline();

    //randomize tracks and get audio
    randomize_track_segments();
  }

  //if checks changed, update title * track activation
  if (checks_changed){

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

  if (need_rewind){
    console.log(wiper.max/60);
    rewind();
    need_rewind = false;
  }
}

//***** pause button function
function pause(){
  if (playing){
    playing = false;
    console.log("paused");
    stop_time_display();
    curr_speaker_sound.pause();

      string_sound1.pause();
      string_sound2.pause();
      perc_sound1.pause();
      perc_sound2.pause();
      piano1_sound1.pause();
      piano1_sound2.pause();
      piano2_sound1.pause();
      piano2_sound2.pause();

  }
}

var first_clicked = false;

//***** play button single click function
function play(){

  //on first click, shuffle
  if (!first_clicked){
    single_click();
    first_clicked = true;
  }

  if (at_end){
    rewind();
    at_end = false;
  }
    if (playing == false){
        console.log("playing");
        playing = true;
        start_time_display();
        curr_speaker_sound.play();

        if(longest == 1){
          curr_string_sound.play();
        }
        else{
          if(string_on[0]){
            string_sound1.play();
          }
          if(string_on[1]){
            string_sound2.play();
          }
        }

        if (longest == 2){
          curr_perc_sound.play();
        }
        else{
          if(perc_on[0]){
            perc_sound1.play();
          }
          if(perc_on[1]){
            perc_sound2.play();
          }
        }

        if (longest == 3){
          curr_piano1_sound.play();
        }
        else{
          if(piano1_on[0]){
            piano1_sound1.play();
          }
          if(piano1_on[1]){
            piano1_sound2.play();
          }
        }

        if (longest == 4){
          curr_piano2_sound.play();
        }
        else{
          if(piano2_on[0]){
            piano2_sound1.play();
          }
          if(piano2_on[1]){
            piano2_sound2.play();
          }
        }
    }
  //pause/play functionality
  //do nothing if you press play while playing


}




var sound_event_functions = [string_event, perc_event, piano1_event, piano2_event];

function string_event(){
  console.log("string event");
  //play and load string sounds etc. etc.
  current_events[0] = [next_events[0], string_seg_locs[next_events[0]]+durations_string[string_order[next_events[0]]]];
  next_events[0] += 1;

  curr_string_sound.play();
  if (curr_string_sound == string_sound1){
    string_on = [true, false];
    //console.log("load string event ", next_events[0], " into sound 2");
    //load next string sound into string_sound2
    if(next_events[0] < durations_string.length){
      new_string2_howl(next_events[0]+1, 0, false);
    }
  }
  else{
    string_on = [false, true];
    //console.log("load string event ", next_events[0], " into sound 1");
    //load next string sound into string_sound1
    if(next_events[0] < durations_string.length){
      new_string1_howl(next_events[0] + 1, 0, false, false);
    }
  }

}

function perc_event(){
  console.log("perc event");
  //play and load string sounds etc. etc.
  current_events[1] = [next_events[1], perc_seg_locs[next_events[1]]+durations_perc[perc_order[next_events[1]]]];
  next_events[1] += 1;

  curr_perc_sound.play();
  if (curr_perc_sound == perc_sound1){
    perc_on = [true, false];
    //console.log("load perc event ", next_events[0], " into perc 2");
    //load next string sound into string_sound2
    if(next_events[1] < durations_perc.length){
      new_perc2_howl(next_events[1]+1, 0, false);
    }
  }
  else{
    perc_on = [false, true];
    //console.log("load perc event ", next_events[1], " into perc 1");
    //load next string sound into string_sound1
    if(next_events[1] < durations_perc.length){
      new_perc1_howl(next_events[1] + 1, 0, false, false);
    }
  }
}

function piano1_event(){
  console.log("piano1 event");
  //play and load string sounds etc. etc.
  current_events[2] = [next_events[2], piano1_seg_locs[next_events[2]]+durations_piano1[piano1_order[next_events[2]]]];
  next_events[2] += 1;

  curr_piano1_sound.play();
  if (curr_piano1_sound == piano1_sound1){
    piano1_on = [true, false];
    //console.log("load piano1 event ", next_events[2], " into piano1 2");
    //load next string sound into string_sound2
    if(next_events[2] < durations_piano1.length){
      new_piano12_howl(next_events[2]+1, 0, false);
    }
  }
  else{
    piano1_on = [false, true];
    //console.log("load piano1 event ", next_events[2], " into piano1 1");
    //load next string sound into string_sound1
    if(next_events[2] < durations_piano1.length){
      new_piano11_howl(next_events[2] + 1, 0, false, false);
    }
  }
}

function piano2_event(){
  console.log("piano2 event");
  //play and load string sounds etc. etc.
  current_events[3] = [next_events[3], piano2_seg_locs[next_events[3]]+durations_piano2[piano2_order[next_events[3]]]];
  next_events[3] += 1;

  curr_piano2_sound.play();
  if (curr_piano2_sound == piano2_sound1){
    piano2_on = [true, false];
    //console.log("load piano2 event ", next_events[3], " into piano2 2");
    //load next string sound into string_sound2
    if(next_events[3] < durations_piano2.length){
      new_piano22_howl(next_events[3]+1, 0, false);
    }
  }
  else{
    piano2_on = [false, true];
    //console.log("load piano2 event ", next_events[3], " into piano2 1");
    //load next string sound into string_sound1
    if(next_events[3] < durations_piano2.length){
      new_piano21_howl(next_events[3] + 1, 0, false, false);
    }
  }
}

// //function to start time display
var time_poller;
function start_time_display(){
  stop_time_display();
  console.log("timer started");
  time_poller = setInterval(function(){

    //set current time
    curr_time = Math.round(elapsed_time + curr_speaker_sound.seek());
    time_display.innerHTML = sec_to_minsec(curr_time);
    wiper.value = curr_time;

    //only check for events smaller than longest
    for (var i = 0; i < longest-1; i++){

      //check for starting next events
      if (curr_time == all_seg_locs[i][next_events[i]]){
        sound_event_functions[i]();
        //console.log(next_events);
        //console.log(current_events);
      }

      //check for ending current events
      if (current_events[i] != null){
        if (curr_time > current_events[i][1]){
          current_events[i] = null;
          //console.log(current_events);
        }
      }

    }
    //check for curr time up against wiper time
    if (curr_time > wiper.max){
      stop_time_display();

      if (need_rewind){
        rewind();
        need_rewind = false;
      }

      else{
        pause();
        at_end = true;
      }

    }
    console.log("timer going");
  }, 1000);
}
//function to stop time display
function stop_time_display(){
  clearInterval(time_poller);
}




var need_rewind = false;






var elapsed_time = 0.0;
var curr_time = 0.0;

function wiper_clicked(){

  console.log("wiper clicked");

  stop_time_display();
  curr_time = Math.round(wiper.value);
  time_display.innerHTML = sec_to_minsec(curr_time);
  curr_speaker_sound.pause();

  if(longest != 5){
    make_longest_funcs[longest-1]();
  }
  //find elapsed time
  var i = 0;
  elapsed_time = 0;
  while(curr_time > elapsed_time + durations_speaker[i]){
    elapsed_time += durations_speaker[i];
    i+= 1;
  }

  //load files into sound1/sound2 depending on even/odd
  if (i%2 == 0){
    //get speaker 1 file
    //console.log("assign speaker 1");
    speaker_sound1_fileno = i+1;
    new_speaker1_howl(Math.round(curr_time - elapsed_time));

    //get speaker 2 file
    if (i+2 <= 12){
      //console.log("assign speaker 2");
      speaker_sound2_fileno = i+2;
      new_speaker2_howl(0);
    }

    //set current sound
    curr_speaker_sound = speaker_sound1;
  }
  else{
    //console.log("assign speaker 2");
    //get speaker 2 file
    speaker_sound2_fileno = i+1;
    new_speaker2_howl(Math.round(curr_time - elapsed_time));

    //get speaker 1 file
    if (i+2 <= 11){

      //console.log("assign speaker 1")
      speaker_sound1_fileno = i+2;
      new_speaker1_howl(0);
    }

    //set current speaker
    curr_speaker_sound = speaker_sound2;
  }

  //find next events
  get_events();

  //load non_longest files
  load_non_longest_files();

  //play, if playing
  if(playing){
    if (longest == 5){
      curr_speaker_sound.once("play", start_time_display);
      curr_speaker_sound.play();
    }
  }
}

var speaker_sound1 = new Howl({
  src: ["assets/audio/45' for a Speaker/45' - 1.wav"],
  onend: speaker1_ended,
  volume: 0.75
})
var speaker_sound2 = new Howl({
  src: ["assets/audio/45' for a Speaker/45' - 2.wav"],
  onend: speaker2_ended,
  volume: 0.75
})

var speaker_sound1_fileno = 1;
var speaker_sound2_fileno = 2;

var curr_speaker_sound = speaker_sound1;

function speaker1_ended(){
  //switch to second audio object
  //add audio time to elapsed time
  elapsed_time += speaker_sound1.duration();
  curr_speaker_sound = speaker_sound2;
  curr_speaker_sound.play();
  console.log("playing speaker 2 file ", speaker_sound2_fileno);



  //load next audio file
  if (speaker_sound1_fileno < 11){
    speaker_sound1_fileno += 2;
    new_speaker1_howl(0);
  }
}

function speaker2_ended(){
  //if it's not the last one
  //console.log(sec_to_minsec(Math.round(elapsed_time)));
  elapsed_time += speaker_sound2.duration();
  //console.log(sec_to_minsec(Math.round(elapsed_time)));
  if (speaker_sound2_fileno < 12){
    //add audio time to elapsed time
    //elapsed_time += speaker_sound2.duration();
    //switch to first audio object
    curr_speaker_sound = speaker_sound1;
    curr_speaker_sound.play();
    console.log("playing speaker 1 file ", speaker_sound1_fileno);

    //load next audio file
    speaker_sound2_fileno += 2;
    new_speaker2_howl(0);
  }
  else{
    playing = false;
  }
}

function new_speaker1_howl(seek){
  var old_howl = speaker_sound1;
  speaker_sound1 = new Howl({
    src: ["assets/audio/45' for a Speaker/45' - " + speaker_sound1_fileno.toString() + ".wav"],
    onend: speaker1_ended,
    onload: function(){
      this.seek(seek);
      console.log("speaker 1 loaded file ", speaker_sound1_fileno);
    },
    mute: !check5.checked || !speaker_mute.checked,
    volume: 0.75
  })
  old_howl.unload();
}
function new_speaker2_howl(seek){
  var old_howl = speaker_sound2;
  speaker_sound2 = new Howl({
    src: ["assets/audio/45' for a Speaker/45' - " + speaker_sound2_fileno.toString() + ".wav"],
    onend: speaker2_ended,
    onload: function(){
      this.seek(seek);
      console.log("speaker 2 loaded file ", speaker_sound2_fileno);
    },
    mute: !check5.checked || !speaker_mute.checked,
    volume: 0.75
  })
  old_howl.unload();
}

var piano2_sound1;
var piano2_sound2;
var piano2_sound1_fileno;
var piano2_sound2_fileno;
var curr_piano2_sound;
var piano2_on = [false, false];

var piano1_sound1;
var piano1_sound2;
var piano1_sound1_fileno;
var piano1_sound2_fileno;
var curr_piano1_sound;
var piano1_on = [false, false];

var perc_sound1;
var perc_sound2;
var perc_sound1_fileno;
var perc_sound2_fileno;
var curr_perc_sound;
var perc_on = [false, false];

var string_sound1;
var string_sound2;
var string_sound1_fileno;
var string_sound2_fileno;
var curr_string_sound;
var string_on = [false, false];

var all_sounds = [[string_sound1, string_sound2],
                  [perc_sound1, perc_sound2],
                  [piano1_sound1, piano1_sound2],
                  [piano2_sound1, piano2_sound2],
                  [speaker_sound1, speaker_sound2]];
var all_filenos = [[string_sound1_fileno, string_sound2_fileno],
                    [perc_sound1_fileno, perc_sound2_fileno],
                    [piano1_sound1_fileno, piano1_sound2_fileno],
                    [piano2_sound1_fileno, piano2_sound2_fileno],
                    [speaker_sound1_fileno, speaker_sound2_fileno]];

var audio_file_locations = ["assets/audio/26'/26' - ",
                      "assets/audio/27'/27' - ",
                      "assets/audio/31'/31' - ",
                      "assets/audio/34'/34' - "];

var all_curr_sounds = [curr_string_sound, curr_perc_sound, curr_piano1_sound, curr_piano2_sound];





var all_new_howl_funcs = [[new_string1_howl, new_string2_howl],
                          [new_perc1_howl, new_perc2_howl],
                          [new_piano11_howl, new_piano12_howl],
                          [new_piano21_howl, new_piano22_howl]];




















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


        if(i==0){
          string_sound1.mute(!string_mute.checked);
          string_sound2.mute(!string_mute.checked);
          console.log("string muted ", !string_mute.checked);
        }

        if (i==1){
          perc_sound1.mute(!perc_mute.checked);
          perc_sound2.mute(!perc_mute.checked);
          console.log("perc muted ", !perc_mute.checked);
        }
        if (i==2){
          piano1_sound1.mute(!piano1_mute.checked);
          piano1_sound2.mute(!piano1_mute.checked);
          console.log("piano1 muted ", !piano1_mute.checked);
        }

        if (i==3){
          piano2_sound1.mute(!piano2_mute.checked);
          piano2_sound2.mute(!piano2_mute.checked);
          console.log("piano2 muted ", !piano2_mute.checked);
        }

        if (i==4){
          speaker_sound1.mute(!speaker_mute.checked);
          speaker_sound2.mute(!speaker_mute.checked);
          console.log("speaker muted ", !speaker_mute.checked);
        }



      }
      else{
        //turn track opacity off
        curr_canvas.style.setProperty('opacity', 0);
        //turn audio off


        if(i == 0){
          string_sound1.mute(true);
          string_sound2.mute(true);
          console.log(i, "off");
        }

        if (i==1){
          perc_sound1.mute(true);
          perc_sound2.mute(true);
          console.log("perc off");
        }

        if (i==2){
          piano1_sound1.mute(true);
          piano1_sound2.mute(true);
          console.log("piano1 off");
        }

        if (i==3){
          piano2_sound1.mute(true);
          piano2_sound2.mute(true);
          console.log("piano2 off");
        }

        if (i==4){
          speaker_sound1.mute(true);
          speaker_sound2.mute(true);
          console.log("speaker off");
        }

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
  var order;

  var xpos;
  var width;

  //for each track that's not the longest...
  for (var i = 0; i < longest-1; i++){

    ctx = track_ctxs[i]; //canvas context
    durs = all_durations[i]; //durations of each segment
    num_segs = all_num_segs[i]; //number of segments
    seg_locs = all_seg_locs[i]; //segment locations on timeline
    order = all_orders[i];

    //clear canvas
    ctx.clearRect(0, 0, 1204, 100);

    //for special case of string + perc, draw string segs slightly shorter for visuaal effect
    if (longest == 2){
      for(var j = 0; j < num_segs; j++){
        xpos = Math.round(seg_locs[j] / (lengths[longest] * 60.) * 1198) + 3;
        width = Math.round((durs[order[j]] - 5) / (lengths[longest] * 60.) * 1198) + 3;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.fillRect(xpos, 0, width, 100);
        ctx.stroke();
        //ctx.fill();
      }
    }
    //otherwise draw at normal size
    else{
      for(var j = 0; j < num_segs; j++){
        xpos = Math.round(seg_locs[j] / (lengths[longest] * 60.) * 1198) + 3;
        width = Math.round((durs[order[j]] - 5) / (lengths[longest] * 60.) * 1198) + 3;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.fillRect(xpos, 0, width, 100);
        ctx.stroke();
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
  var order;

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
    order = all_orders[i]; //order of segments

    //first, get total length of blank space...
    point_interval = lengths[longest]*60. - total_dur;
    var point_locs = [];
    prev_point = 0;
    //and pick a random point in that interval for each segment
    for (var j = 0; j < num_segs; j++){
      point_loc = Math.random() * ((j+1)*point_interval/num_segs - prev_point) + prev_point;
      if (j == 0 && point_loc == 0){
        point_loc += 2;
      }
      point_locs.push(point_loc);
      prev_point = point_locs[point_locs.length-1];
    }

    //then shuffle segment order
    order = shuffle(order);



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
      var seg_dur = durs[order[j]];
      seg_locs[j] = Math.round(prev_loc + point_dists[j]);
      prev_loc += point_dists[j] + seg_dur;
    }

  }

  for(var i = 0; i < all_seg_locs.length; i++){
    console.log(all_seg_locs[i][0]);
  }

  //lastly, get next relevant sound events
  get_events();
  //and load up sound files
  load_sound_files();

}

//find times at which next sound events will occur
//and find whether or not an event is happening
function get_events(){

  //next events
  for (var i = 0; i < all_seg_locs.length; i++){
    seg_locs = all_seg_locs[i];
    var j = 0;
    while( j < seg_locs.length && curr_time > seg_locs[j]){
      j+=1;
    }
    next_events[i] = j;
    if (next_events[i] != 0){
      //check to see if we're in the middle of the past event
      var prev_event_index = next_events[i] - 1;
      var prev_event_start = all_seg_locs[i][prev_event_index]; //current instrument's (next-1) segment location --> prev event start
      var prev_event_order = all_orders[i][prev_event_index];
      var prev_event_dur = all_durations[i][prev_event_order];
      var prev_event_end = prev_event_start + prev_event_dur;

      if (curr_time < prev_event_end){
        current_events[i] = [prev_event_index, prev_event_end]; //save index of event & ending time of event, for checking
      }
      else{
        current_events[i] = null;
      }

    }
    else{
      if (seg_locs[0] == 0){
        current_events[i] = [0, all_durations[i][all_orders[i][0]]];
      }
      else{
        current_events[i] = null;
      }
    }
  }

  //console.log(next_events);
  //console.log(current_events);
}

var make_longest_funcs = [make_string_longest, make_perc_longest, make_piano1_longest, make_piano2_longest];

function load_sound_files(){
  console.log("load sound files ");

  //deal with longest....
  if(!longest_changed){
    //console.log("keep longest at same place");
    //so do nothing, basically, let this sit
  }
  else{
    //console.log("change longest & have them play through");
    //do nothing for longest == 5, since that's always playing through
    if(longest == 5){
      //do nothing lol
    }
    else{
      //console.log(longest-1, "make it playthrough");
      console.log("making longest ", wiper.max/60, curr_time);
      make_longest_funcs[longest-1]();
    }
  }

  load_non_longest_files();

  //console.log(curr_time);
}

function load_non_longest_files(){
  console.log("load non longest files");

  string_on = [false, false];
  perc_on = [false, false];
  piano1_on = [false, false];
  piano2_on = [false, false];

  //console.log("load adjacent non-longest files");

  //load current events first
  for (var i = 0; i < longest - 1; i++){
    var sound1_seek;

    var order = all_orders[i];
    var filenos = all_filenos[i];
    var file_locs = audio_file_locations[i];
    var howl_funcs = all_new_howl_funcs[i];

    var current;
    //figure out what to load....
    //first, load current event, if applicable
    if (current_events[i] != null){
      console.log(i, " load curr", current_events[i], " sound 1");
      filenos[0] = order[current_events[i][0]] + 1;
      sound1_seek = curr_time - all_seg_locs[i][current_events[i][0]];
      //console.log(i, "file", filenos[0], "seek", sound1_seek);
      //console.log(all_durations[i][order[current_events[i][0]]]);
      current = true;
      howl_funcs[0](filenos[0], sound1_seek, false, current);
    }
  }

  //then load next events
  for (var i = 0; i < longest - 1; i++){

    var order = all_orders[i];
    var filenos = all_filenos[i];
    var file_locs = audio_file_locations[i];
    var howl_funcs = all_new_howl_funcs[i];

    //then, load next event, if applicable (i.e. next event number is not the max)
    if (next_events[i] < all_durations[i].length){
      if (current_events[i] == null){
        console.log(i, " load next", next_events[i], " sound 1");
        filenos[0] = order[next_events[i]] + 1;
        howl_funcs[0](filenos[0], 0, false, false);
      }
      else{
        console.log(i, " load next", next_events[i], " sound 2");
        filenos[1] = order[next_events[i]] + 1;
        howl_funcs[1](filenos[1], 0, false);
      }
    }
    //then, if current event was not loaded AND there's an event after the next event, load the next-next event
    if (current_events[i] == null && next_events[i] + 1 < all_durations[i].length){
      console.log(i, " load next next", next_events[i] + 1, " sound 2");
      filenos[1] = order[next_events[i] + 1] + 1;
      howl_funcs[1](filenos[1], 0, false);
    }
  }




    //console.log(i, "filenos", filenos);

}




function make_string_longest(){

  //stop_time_display();
  console.log("make string longest");
  curr_string_sound.pause();
  curr_speaker_sound.pause();

  //find elapsed time
  var i = 0;
  var string_elapsed_time = 0;
  while(curr_time > string_elapsed_time + durations_string[i]){
    string_elapsed_time += durations_string[i];
    i+= 1;
  }

  string_sound1_fileno = i+1;
  var seek = curr_time - string_elapsed_time;
  if(string_sound1_fileno <= durations_string.length){
    new_string1_howl(string_sound1_fileno, seek, true, false);

    string_sound2_fileno = i+2;
    if(string_sound2_fileno <= durations_string.length){
      new_string2_howl(string_sound2_fileno, 0, true);
    }

    curr_string_sound = string_sound1;

    if(playing){
      curr_string_sound.once("play", function(){
        start_time_display();
        curr_speaker_sound.play();
      })
      curr_string_sound.play();

    }
  }

}

function new_string1_howl(fileno, seek, isLongest, isCurrent){
  //console.log("string 1", fileno, seek, isCurrent);

  if (string_sound1!= null){
    var old_howl = string_sound1;
    old_howl.unload();
  }

  if (!isLongest){

    if (!isCurrent){


      string_sound1 = new Howl({
        src: ["assets/audio/26'/26' - " + fileno.toString() + ".wav"],
        onload: function(){
          console.log("string 1 loaded file ", fileno);
        },
        onend: function(){
          string_on[0] = false;
          console.log("string 1 ended");
          curr_string_sound = string_sound2;
        },
        onplay: function(){
          console.log("string 1 file ", fileno, " playing from ", this.seek());
        },
        mute: !check1.checked || !string_mute.checked,
        volume: 0.75
      })
    }


    else{
      console.log(!check1.checked || !string_mute.checked);
      string_sound1 = new Howl({
        src: ["assets/audio/26'/26' - " + fileno.toString() + ".wav"],
        onload: function(){
          this.seek(seek);
          if(playing){
            this.play();
          }
          console.log("string 1 file", fileno, " loaded at", this.seek());
        },
        onend: function(){
          console.log("string 1 ended");
          string_on[0] = false; //turn off play/pause indicator
          curr_string_sound = string_sound2; //pass the buck to sound 2
        },
        onplay: function(){
          console.log("string 1 file", fileno, " playing from ", this.seek());
        },
        mute: (!check1.checked || !string_mute.checked),
        volume: 0.75
      })

      //
      string_on = [true, false];

    }
    curr_string_sound = string_sound1;
  }

  else{
    console.log(string_mute.checked);
    string_sound1 = new Howl({
      src: ["assets/audio/26'/26' - " + fileno.toString() + ".wav"],
      onload: function(){
        this.seek(seek);
        console.log("string 1 loaded file ", fileno);
      },
      onend: string1_longest_ended,
      onplay: function(){
        console.log("string 1 file ", fileno, " playing from ", this.seek());
      },
      mute: (!string_mute.checked),
      volume: 0.75
    })
  }
 }

function new_string2_howl(fileno, seek, isLongest){
  //console.log("string 2", fileno, seek, isLongest);

  if (string_sound2!= null){
    var old_howl = string_sound2;
    old_howl.unload();
  }

  if (!isLongest){
    string_sound2 = new Howl({
      src: ["assets/audio/26'/26' - " + fileno.toString() + ".wav"],
      onload: function(){
        console.log("string 2 loaded file ", fileno);
      },
      onend: function(){
        string_on[1] = false;
        console.log("string 2 ended");
        curr_string_sound = string_sound1;
      },
      onplay: function(){
        console.log("string 2 file ", fileno, " playing from ", this.seek());
      },
      mute: !check1.checked || !string_mute.checked,
      volume: 0.75
    })
  }

  else{
    string_sound2 = new Howl({
      src: ["assets/audio/26'/26' - " + fileno.toString() + ".wav"],
      onload: function(){
        this.seek(seek);
        console.log("string 2 loaded file ", fileno);
      },
      onend: string2_longest_ended,
      onplay: function(){
        console.log("string 2 file ", fileno, " playing from ", this.seek());
      },
      mute: !string_mute.checked,
      volume: 0.75
    })
  }
 }

function string1_longest_ended(){
  //if this isn't the last one, switch to string 2
  if(string_sound1_fileno < durations_string.length){
    curr_string_sound = string_sound2;
    curr_string_sound.play();
    console.log("playing string sound 2 file ", string_sound2_fileno);

    //if there's a next string sound 1
    if(string_sound1_fileno + 2 <= durations_string.length){
      string_sound1_fileno += 2;
      new_string1_howl(string_sound1_fileno, 0, true, false);
    }
  }

}

function string2_longest_ended(){
 //if this isn't the last one, switch to string 1
 if(string_sound2_fileno < durations_string.length){
   curr_string_sound = string_sound1;
   curr_string_sound.play();
   console.log("playing string sound 1 file ", string_sound1_fileno);

   //if there's a next sound 2
   if(string_sound2_fileno +2 <= durations_string.length){
     string_sound2_fileno += 2;
     new_string2_howl(string_sound2_fileno, 0, true);
   }
 }
}



function make_perc_longest(){
  console.log("make perc longest");

  curr_perc_sound.pause();
  curr_speaker_sound.pause();

  //find elapsed time
  var i = 0;
  var perc_elapsed_time = 0;
  while(curr_time > perc_elapsed_time + durations_perc[i]){
    perc_elapsed_time += durations_perc[i];
    i+= 1;
  }

  perc_sound1_fileno = i+1;
  var seek = curr_time - perc_elapsed_time;
  if(perc_sound1_fileno <= durations_perc.length){
    new_perc1_howl(perc_sound1_fileno, seek, true, false);

    perc_sound2_fileno = i+2;
    if(perc_sound2_fileno <= durations_perc.length){
      new_perc2_howl(perc_sound2_fileno, 0, true);
    }

    curr_perc_sound = perc_sound1;

    if(playing){
      curr_perc_sound.once("play", function(){
        start_time_display();
        curr_speaker_sound.play();
      })
      curr_perc_sound.play();

    }
  }

}

function new_perc1_howl(fileno, seek, isLongest, isCurrent){
  //console.log("perc 1", fileno, seek, isLongest);

  //remove prev file
  if (perc_sound1!= null){
    var old_howl = perc_sound1;
    old_howl.unload();
  }

  //for current or next event
  if (!isLongest){

    if (!isCurrent){
      perc_sound1 = new Howl({
        src: ["assets/audio/27'/27' - " + fileno.toString() + ".wav"],
        onload: function(){
          console.log("perc 1 loaded file ", fileno);
        },
        onend: function(){
          perc_on[0] = false;
          console.log("perc 1 ended");
          curr_perc_sound = perc_sound2;
        },
        onplay: function(){
          console.log("perc 1 file ", fileno, " playing from ", this.seek());
        },
        mute: !check2.checked || !perc_mute.checked,
        volume: 0.75
      })
    }


    else{
      perc_sound1 = new Howl({
        src: ["assets/audio/27'/27' - " + fileno.toString() + ".wav"],
        onload: function(){
          this.seek(seek);
          if(playing){
            this.play();
          }
          console.log("perc 1 file ", fileno, " loaded at", this.seek());
        },
        onend: function(){
          console.log("perc 1 ended");
          perc_on[0] = false; //turn off play/pause indicator
          curr_perc_sound = perc_sound2; //pass the buck to sound 2
        },
        onplay: function(){
          console.log("perc 1 file ", fileno, " playing from ", this.seek());
        },
        mute: !check2.checked || !perc_mute.checked,
        volume: 0.75
      })

      //
      perc_on = [true, false];

    }
    curr_perc_sound = perc_sound1;
  }

  //for longest
  else{
    perc_sound1 = new Howl({
      src: ["assets/audio/27'/27' - " + fileno.toString() + ".wav"],
      onload: function(){
        this.seek(seek);
        console.log("perc 1 loaded file ", fileno);
      },
      onend: perc1_longest_ended,
      onplay: function(){
        console.log("perc 1 file ", fileno, " playing from ", this.seek());
      },
      mute: !perc_mute.checked,
      volume: 0.75
    })
  }

}

function new_perc2_howl(fileno, seek, isLongest){
  //console.log("perc 2", fileno, seek, isLongest);

  if (perc_sound2!= null){
    var old_howl = perc_sound2;
    old_howl.unload();
  }

  if (!isLongest){
    perc_sound2 = new Howl({
      src: ["assets/audio/27'/27' - " + fileno.toString() + ".wav"],
      onload: function(){
        console.log("perc 2 loaded file ", fileno);
      },
      onend: function(){
        perc_on[1] = false;
        console.log("perc 2 ended");
        curr_perc_sound = perc_sound1;
      },
      onplay: function(){
        console.log("perc 2 file ", fileno, " playing from ", this.seek());
      },
      mute: !check2.checked || !perc_mute.checked,
      volume: 0.75
    })
  }

  else{
    perc_sound2 = new Howl({
      src: ["assets/audio/27'/27' - " + fileno.toString() + ".wav"],
      onload: function(){
        this.seek(seek);
        console.log("perc 2 loaded file ", fileno);
      },
      onend: perc2_longest_ended,
      onplay: function(){
        console.log("perc 2 file ", fileno, " playing from ", this.seek());
      },
      mute: !perc_mute.checked,
      volume: 0.75
    })
  }
}

function perc1_longest_ended(){
  //if this isn't the last one, switch to perc 2
  if(perc_sound1_fileno < durations_perc.length){
    curr_perc_sound = perc_sound2;
    curr_perc_sound.play();
    console.log("playing perc sound 2 file ", perc_sound2_fileno);

    //if there's a next perc sound 1
    if(perc_sound1_fileno + 2 <= durations_perc.length){
      perc_sound1_fileno += 2;
      new_perc1_howl(perc_sound1_fileno, 0, true, false);
    }
  }

}

function perc2_longest_ended(){
 //if this isn't the last one, switch to perc 1
 if(perc_sound2_fileno < durations_perc.length){
   curr_perc_sound = perc_sound1;
   curr_perc_sound.play();
   console.log("playing perc sound 1 file ", perc_sound1_fileno);

   //if there's a next sound 2
   if(perc_sound2_fileno +2 <= durations_perc.length){
     perc_sound2_fileno += 2;
     new_perc2_howl(perc_sound2_fileno, 0, true);
   }
 }
}




function make_piano1_longest(){
  console.log("make piano1 longest");

  curr_piano1_sound.pause();
  curr_speaker_sound.pause();

  //find elapsed time
  var i = 0;
  var piano1_elapsed_time = 0;
  while(curr_time > piano1_elapsed_time + durations_piano1[i]){
    piano1_elapsed_time += durations_piano1[i];
    i+= 1;
  }

  piano1_sound1_fileno = i+1;
  var seek = curr_time - piano1_elapsed_time;
  if(piano1_sound1_fileno <= durations_piano1.length){
    new_piano11_howl(piano1_sound1_fileno, seek, true, false);

    piano1_sound2_fileno = i+2;
    if(piano1_sound2_fileno <= durations_piano1.length){
      new_piano12_howl(piano1_sound2_fileno, 0, true);
    }

    curr_piano1_sound = piano1_sound1;

    if(playing){
      curr_piano1_sound.once("play", function(){
        start_time_display();
        curr_speaker_sound.play();
      })
      curr_piano1_sound.play();

    }
  }

}

function new_piano11_howl(fileno, seek, isLongest, isCurrent){
  //console.log("piano1 1", fileno, seek, isLongest);

  if (piano1_sound1!= null){
    var old_howl = piano1_sound1;
    old_howl.unload();
  }

  if (!isLongest){

    if (!isCurrent){
      piano1_sound1 = new Howl({
        src: ["assets/audio/31'/31' - " + fileno.toString() + ".wav"],
        onload: function(){
          console.log("piano 1 loaded file ", fileno);
        },
        onend: function(){
          piano1_on[0] = false;
          console.log("piano1 1 ended");
          curr_piano1_sound = piano1_sound2;
        },
        onplay: function(){
          console.log("piano1 1 file ", fileno, " playing from ", this.seek());
        },
        mute: !check3.checked || !piano1_mute.checked,
        volume: 0.75
      })
    }


    else{
      piano1_sound1 = new Howl({
        src: ["assets/audio/31'/31' - " + fileno.toString() + ".wav"],
        onload: function(){
          this.seek(seek);
          if(playing){
            this.play();
          }
          console.log("piano1 1 file ", fileno, " loaded at", this.seek());
        },
        onend: function(){
          console.log("piano1 1 ended");
          piano1_on[0] = false; //turn off play/pause indicator
          curr_piano1_sound = piano1_sound2; //pass the buck to sound 2
        },
        onplay: function(){
          console.log("piano1 1 file, ", fileno, " playing from ", this.seek());
        },
        mute: !check3.checked || !piano1_mute.checked,
        volume: 0.75
      })

      //
      piano1_on = [true, false];

    }
    curr_piano1_sound = piano1_sound1;
  }


  else{
    piano1_sound1 = new Howl({
      src: ["assets/audio/31'/31' - " + fileno.toString() + ".wav"],
      onload: function(){
        this.seek(seek);
        console.log("piano1 1 loaded file ", fileno);
      },
      onend: piano11_longest_ended,
      onplay: function(){
        console.log("piano1 1 file ", fileno, " playing from ", this.seek());
      },
      mute: !piano1_mute.checked,
      volume: 0.75
    })
  }
}

function new_piano12_howl(fileno, seek, isLongest){
  //console.log("piano1 2 ", fileno, seek, isLongest);

  if (piano1_sound2!= null){
    var old_howl = piano1_sound2;
    old_howl.unload();
  }

  if (!isLongest){
    piano1_sound2 = new Howl({
      src: ["assets/audio/31'/31' - " + fileno.toString() + ".wav"],
      onload: function(){
        console.log("piano1 2 loaded file ", fileno);
      },
      onend: function(){
        piano1_on[1] = false;
        console.log("piano1 2 ended");
        curr_piano1_sound = piano1_sound1;
      },
      onplay: function(){
        console.log("piano1 2 file ", fileno, " playing from ", this.seek());
      },
      mute: !check3.checked || !piano1_mute.checked,
      volume: 0.75
    })
  }

  else{
    piano1_sound2 = new Howl({
      src: ["assets/audio/31'/31' - " + fileno.toString() + ".wav"],
      onload: function(){
        this.seek(seek);
        console.log("piano1 2 loaded file ", fileno);
      },
      onend: piano12_longest_ended,
      onplay: function(){
        console.log("piano1 2 file ", fileno, " playing from ", this.seek());
      },
      mute: !piano1_mute.checked,
      volume: 0.75
    })
  }
}

function piano11_longest_ended(){
  //if this isn't the last one, switch to piano1 2
  if(piano1_sound1_fileno < durations_piano1.length){
    curr_piano1_sound = piano1_sound2;
    curr_piano1_sound.play();
    console.log("playing piano1 sound 2 file ", piano1_sound2_fileno);

    //if there's a next piano1 sound 1
    if(piano1_sound1_fileno + 2 <= durations_piano1.length){
      piano1_sound1_fileno += 2;
      new_piano11_howl(piano1_sound1_fileno, 0, true, false);
    }
  }
}

function piano12_longest_ended(){
 //if this isn't the last one, switch to piano1 1
 if(piano1_sound2_fileno < durations_piano1.length){
   curr_piano1_sound = piano1_sound1;
   curr_piano1_sound.play();
   console.log("playing piano1 sound 1 file ", piano1_sound1_fileno);

   //if there's a next sound 2
   if(piano1_sound2_fileno +2 <= durations_piano1.length){
     piano1_sound2_fileno += 2;
     new_piano12_howl(piano1_sound2_fileno, 0, true);
   }
 }
}




function make_piano2_longest(){
  console.log("make piano2 longest");
  curr_piano2_sound.pause();
  curr_speaker_sound.pause();

  //find elapsed time
  var i = 0;
  var piano2_elapsed_time = 0;
  while(curr_time > piano2_elapsed_time + durations_piano2[i]){
    piano2_elapsed_time += durations_piano2[i];
    i+= 1;
  }

  piano2_sound1_fileno = i+1;
  var seek = curr_time - piano2_elapsed_time;
  if(piano2_sound1_fileno <= durations_piano2.length){
    new_piano21_howl(piano2_sound1_fileno, seek, true, false);

    piano2_sound2_fileno = i+2;
    if(piano2_sound2_fileno <= durations_piano2.length){
      new_piano22_howl(piano2_sound2_fileno, 0, true);
    }

    curr_piano2_sound = piano2_sound1;

    if(playing){
      curr_piano2_sound.once("play", function(){
        start_time_display();
        curr_speaker_sound.play();
      })
      curr_piano2_sound.play();

    }
  }

}

function new_piano21_howl(fileno, seek, isLongest, isCurrent){
  //console.log("piano2 1", fileno, seek, isLongest);

  if (piano2_sound1!= null){
    var old_howl = piano2_sound1;
    old_howl.unload();
  }

  if (!isLongest){

    if (!isCurrent){
      piano2_sound1 = new Howl({
        src: ["assets/audio/34'/34' - " + fileno.toString() + ".wav"],
        onload: function(){
          console.log("piano2 1 loaded file ", fileno);
        },
        onend: function(){
          piano2_on[0] = false;
          console.log("piano2 1 ended");
          curr_piano2_sound = piano2_sound2;
        },
        onplay: function(){
          console.log("piano2 1 file ", fileno, " playing from ", this.seek());
        },
        mute: !check4.checked || !piano2_mute.checked,
        volume: 0.75
      })
    }


    else{
      piano2_sound1 = new Howl({
        src: ["assets/audio/34'/34' - " + fileno.toString() + ".wav"],
        onload: function(){
          this.seek(seek);
          if(playing){
            this.play();
          }
          console.log("piano2 1 file ", fileno, " loaded at", this.seek());
        },
        onend: function(){
          console.log("piano2 1 ended");
          piano2_on[0] = false; //turn off play/pause indicator
          curr_piano2_sound = piano2_sound2; //pass the buck to sound 2
        },
        onplay: function(){
          console.log("piano2 1 file ", fileno, " playing from ", this.seek());
        },
        mute: !check4.checked || !piano2_mute.checked,
        volume: 0.75
      })

      //
      piano2_on = [true, false];

    }
    curr_piano2_sound = piano2_sound1;
  }


  else{
    piano2_sound1 = new Howl({
      src: ["assets/audio/34'/34' - " + fileno.toString() + ".wav"],
      onload: function(){
        this.seek(seek);
        console.log("piano2 1 loaded file ", fileno);
      },
      onend: piano21_longest_ended,
      onplay: function(){
        console.log("piano2 1 file ", fileno, " playing from ", this.seek());
      },
      mute: !piano2_mute.checked,
      volume: 0.75
    })
  }
}

function new_piano22_howl(fileno, seek, isLongest){
  //console.log("piano2 2", fileno, seek, isLongest);

  if (piano2_sound2!= null){
    var old_howl = piano2_sound2;
    old_howl.unload();
  }

  if (!isLongest){
    piano2_sound2 = new Howl({
      src: ["assets/audio/34'/34' - " + fileno.toString() + ".wav"],
      onload: function(){
        console.log("piano2 2 loaded file ", fileno);
      },
      onend: function(){
        piano2_on[1] = false;
        console.log("piano2 2 ended");
        curr_piano2_sound = piano2_sound1;
      },
      onplay: function(){
        console.log("piano2 2 file ", fileno, " playing from ", this.seek());
      },
      mute: !check4.checked || !piano2_mute.checked,
      volume: 0.75
    })
  }

  else{
    piano2_sound2 = new Howl({
      src: ["assets/audio/34'/34' - " + fileno.toString() + ".wav"],
      onload: function(){
        this.seek(seek);
        console.log("piano2 2 loaded file ", fileno);
      },
      onend: piano22_longest_ended,
      onplay: function(){
        console.log("piano2 2 file ", fileno, " playing from ", this.seek());
      },
      mute: !piano2_mute.checked,
      volume: 0.75
    })
  }
}

function piano21_longest_ended(){
  //if this isn't the last one, switch to piano2 2
  if(piano2_sound1_fileno < durations_piano2.length){
    curr_piano2_sound = piano2_sound2;
    curr_piano2_sound.play();
    console.log("playing piano2 sound 2 file ", piano2_sound2_fileno);

    //if there's a next piano2 sound 1
    if(piano2_sound1_fileno + 2 <= durations_piano2.length){
      piano2_sound1_fileno += 2;
      new_piano21_howl(piano2_sound1_fileno, 0, true, false);
    }
  }

}

function piano22_longest_ended(){
 //if this isn't the last one, switch to piano2 1
 if(piano2_sound2_fileno < durations_piano2.length){
   curr_piano2_sound = piano2_sound1;
   curr_piano2_sound.play();
   console.log("playing piano2 sound 1 file ", piano2_sound1_fileno);

   //if there's a next sound 2
   if(piano2_sound2_fileno +2 <= durations_piano2.length){
     piano2_sound2_fileno += 2;
     new_piano22_howl(piano2_sound2_fileno, 0, true);
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
    ten_mark.style.left = "calc(70/" + length + "*10*" + (15+(5-longest)/2)+" / 1296 * var(--main-width))";
    twenty_mark.style.left = "calc(70/" + length + "*20*" + (15+(5-longest)/2)+" / 1296 * var(--main-width))";
    thirty_mark.style.left = "calc(70/" + length + "*30*" + (15+(5-longest)/2)+" / 1296 * var(--main-width))";
    forty_mark.style.left = "calc(70/" + length + "*40*" + (15+(5-longest)/2)+" / 1296 * var(--main-width))";
  }

  //updates wiper size
  wiper.max = lengths[longest] * 60.;
  if (curr_time > wiper.max){
    need_rewind = true;
  }
  //wiper_clicked();
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
