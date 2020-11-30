const audio = document.querySelector("audio");
const play = document.getElementById("play");
const image = document.querySelector("img");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let progress = document.getElementById("progress");
let tot_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");
let progressbar_div = document.getElementById("progressbar_div");

let theme = document.getElementById("theme");
let root = document.querySelector(":root");

var dark = false;
var isPlaying = false;

const playMusic = () => {
  isPlaying = true;
  audio.play();
  play.classList.replace("fa-play", "fa-pause");
  image.classList.add("spin");
};

const pauseMusic = () => {
  isPlaying = false;
  audio.pause();
  play.classList.replace("fa-pause", "fa-play");
  image.classList.remove("spin");
};

play.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

const songs = [
  {
    name: "1",
    title: "Above Your Hand",
    artist: "Annabel",
  },
  {
    name: "2",
    title: "Daisy",
    artist: "Stereo Dive",
  },
  {
    name: "3",
    title: "Gurenge",
    artist: "Lisa",
  },
];

const loadSong = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  audio.src = "asset/music/" + songs.name + ".mp3";
  image.src = "asset/images/" + songs.name + ".jpg";
};

var songIndex = 0;

const nextSong = () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

const prevSong = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

audio.addEventListener("timeupdate", (event) => {
  const {currentTime, duration} = event.target;
  let progress_time = (currentTime / duration) * 100;
  progress.style.width = `${progress_time}%`;

  let tot_minute = Math.floor(duration / 60);
  let tot_sec = Math.floor(duration % 60);
  if (tot_sec < 10) {
    tot_sec = `0${tot_sec}`;
  }
  let _duration = `${tot_minute}:${tot_sec}`;

  if (duration) {
    tot_duration.textContent = `${_duration}`;
  }

  let current_minute = Math.floor(currentTime / 60);
  let current_sec = Math.floor(currentTime % 60);
  if (current_sec < 10) {
    current_sec = `0${current_sec}`;
  }
  let _current_time = `${current_minute}:${current_sec}`;

  current_time.textContent = `${_current_time}`;
});

progressbar_div.addEventListener("click", (event) => {
  const {duration} = audio;

  let move_progress = (event.offsetX / event.target.clientWidth) * duration;
  audio.currentTime = move_progress;
});

theme.addEventListener("click", () => {
  dark = !dark;
  if (dark) {
    root.style.setProperty("--background", "#2b2b2b");
    root.style.setProperty("--font", "#fff");
    root.style.setProperty("--theme-icon", "#363636");
    root.style.setProperty("--progress-shadow", "rgba(255, 255, 255, 0.2)");
    theme.classList.replace("fa-sun", "fa-moon");
    theme.classList.replace("fa-sun", "fa-moon");
    progressbar_div.classList.replace(
      "progressbar_color_light",
      "progressbar_color_dark"
    );
  } else {
    root.style.setProperty("--background", "#fff");
    root.style.setProperty("--font", "#000");
    root.style.setProperty("--theme-icon", "#fff");
    root.style.setProperty("--progress-shadow", "rgba(255, 255, 255, 0.2)");
    theme.classList.replace("fa-moon", "fa-sun");
    progressbar_div.classList.replace(
      "progressbar_color_dark",
      "progressbar_color_light"
    );
  }
});

audio.addEventListener("ended", nextSong);
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
