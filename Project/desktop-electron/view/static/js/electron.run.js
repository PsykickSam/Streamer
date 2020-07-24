const { remote, ipcRenderer } = require("electron");

const minimize = document.getElementById("win-minimize-btn");
const close = document.getElementById("win-close-btn");
const home = document.getElementById("win-home-btn");
const playButtons = document.querySelectorAll(".btn-play");
const deleteButtons = document.querySelectorAll(".btn-delete");
const forwardMagnet = document.getElementById("btn-forward-magnet");

const inputManget = document.getElementById("input-magnet");

home && home.addEventListener("click", () => ipcRenderer.send("open:home"));
close && close.addEventListener("click", () => remote.getCurrentWindow().close());
minimize && minimize.addEventListener("click", () => remote.getCurrentWindow().minimize());
inputManget &&
  forwardMagnet &&
  forwardMagnet.addEventListener("click", () => {
    ipcRenderer.send("load:save:magnet", {
      magnet: inputManget.value,
    });
  });
playButtons &&
  playButtons.forEach((play) =>
    play.addEventListener("click", (event) => {
      ipcRenderer.send("open:media");
      event.stopPropagation();
    })
  );
