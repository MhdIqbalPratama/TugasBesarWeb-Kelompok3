var array = [];
var selectedBar;
var bar;

let audioCtx = null;

function playNote(freq) {
  if (audioCtx == null) {
    audioCtx = new (AudioContext ||
      webkitAudioContext ||
      window.AudioContext)();
  }
  const dur = 0.1;
  const osc = audioCtx.createOscillator();
  osc.frequency.value = freq;
  osc.start();
  osc.stop(audioCtx.currentTime + dur);
  const node = audioCtx.createGain();
  node.gain.value = 0.1;
  node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
  osc.connect(node);
  node.connect(audioCtx.destination);
}

function createArray(n = 30) {
  clearBar();

  for (let i = 0; i < n; i++) {
    array[i] = Math.random() * 130 + 2;
  }
  const bars = document.querySelector(".container");
  console.log(array);
  // membuat bar sort
  for (let i = 0; i < n; i++) {
    const bar = document.createElement("div");
    bar.style.height = `${array[i] * 2}px`;
    bar.classList.add("bar");
    bar.setAttribute("id", i);
    bars.appendChild(bar);
  }
  bar = document.querySelectorAll(".bar");
  selectBar();
}

function clearBar() {
  const bars = document.querySelector(".container");
  bars.innerHTML = "";
}

// setTimeOut untuk smoothing animation
function waitforme(milisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, milisec);
  });
}

// size
let size = document.querySelector("#arr_size");
size.addEventListener("input", function () {
  createArray(parseInt(size.value));
});

// delay 200ms
let delay = 260;

createArray();

const newArray = document.querySelector("#new_arr");
newArray.addEventListener("click", function () {
  enableSearch();
  enableSize();
  createArray(size.value);
});

function disableSearch() {
  document.querySelector(".linearSearch").disabled = true;
}

function enableSearch() {
  document.querySelector(".linearSearch").disabled = false;
}

function disableSize() {
  document.querySelector("#arr_size").disabled = true;
}

function enableSize() {
  document.querySelector("#arr_size").disabled = false;
}

function disableNewArray() {
  document.querySelector("#new_arr").disabled = true;
}

function enableNewArray() {
  document.querySelector("#new_arr").disabled = false;
}

function resetTime() {}

function displayTime() {}

function selectBar() {
  for (i of bar) {
    i.addEventListener("click", chooseClick, false);
  }
}

function chooseClick(square) {
  let id = square.target.id;
  selectedBar = bar[id];
  selectedBar.style.background = "blue";
  for (i of bar) {
    i.style.cursor = "default";
  }
  removeEventBar();
}

function removeEventBar() {
  for (i of bar) {
    i.removeEventListener("click", chooseClick, false);
  }
}
