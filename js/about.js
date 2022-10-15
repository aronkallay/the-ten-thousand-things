var playlist = document.getElementById("playlist");
var notes = document.getElementById("notes");
var essay = document.getElementById("essay");
var intro = document.getElementById("intro");
var credits = document.getElementById("credits");


let playlist_params = `status=no,location=no,toolbar=no,menubar=no,
width=1000,height=1000,left=200,top=100`;
playlist.onclick = () => {
  window.open('../assets/text/1-playlist.pdf', "Playlist", playlist_params);
};

let notes_params = `status=no,location=no,toolbar=no,menubar=no,
width=1000,height=1000,left=200,top=100`;
notes.onclick = () => {
  window.open('../assets/text/2-notes.pdf', "Notes", notes_params);
};

let essay_params = `status=no,location=no,toolbar=no,menubar=no,
width=1000,height=1000,left=200,top=100`;
essay.onclick = () => {
  window.open('../assets/text/3-essay.pdf', "Essay", essay_params);
};

let intro_params = `status=no,location=no,toolbar=no,menubar=no,
width=500,height=620,left=400,top=100`;
intro.onclick = () => {
  window.open('../pages/intro.html', "Introduction", intro_params);
};

let credits_params = `status=no,location=no,toolbar=no,menubar=no,
width=1000,height=1000,left=200,top=100`;
credits.onclick = () => {
  window.open('../assets/text/4-credits-bios.pdf', "Credits & Bios", credits_params);
};
