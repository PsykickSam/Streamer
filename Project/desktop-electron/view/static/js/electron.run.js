const { remote, shell, ipcRenderer } = require("electron");

const minimize = document.getElementById("win-minimize-btn");
const close = document.getElementById("win-close-btn");
const home = document.getElementById("win-home-btn");
const playButtons = document.querySelectorAll(".btn-play");
const deleteButtons = document.querySelectorAll(".btn-delete");
const forwardMagnet = document.getElementById("btn-forward-magnet");
const inputMagnet = document.getElementById("input-magnet");

// On Load
ipcRenderer.on("load:fetch:torrents", (event, data) => {
  console.log("TESTING: ", data);

  const columns = document.createElement("section");
  const column = document.createElement("section");
  const card = document.createElement("div");
  const cardHeader = document.createElement("header");
  const cardHeaderTitle = document.createElement("p");
  const buttons = document.createElement("div");
  const buttonPlay = document.createElement("a");
  const iconPlay = document.createElement("span");
  const iPlay = document.createElement("i");
  const buttonDelete = document.createElement("a");
  const iconDelete = document.createElement("span");
  const iDelete = document.createElement("i");
  const cardContent = document.createElement("div");
  const torrentItemName = document.createElement("p");
  const torrentItemMagnet = document.createElement("p");

  columns.classList.add(["columns", "user-torrent", "only-cursor-pointer"]);
  column.classList.add(["column"]);
  card.classList.add(["card"]);
  cardHeader.classList.add(["card-header"]);
  cardHeaderTitle.classList.add(["card-header-title"]);
  buttons.classList.add(["buttons"]);
  buttonPlay.classList.add(["button", "app-basic-button", "btn-play"]);
  iconPlay.classList.add(["icon", "is-small"]);
  iPlay.classList.add(["far", "fa-play-circle"]);
  buttonDelete.classList.add(["button", "app-basic-button", "btn-play"]);
  iconDelete.classList.add(["icon", "is-small"]);
  iDelete.classList.add(["far", "fa-times-circle"]);
  cardContent.classList.add(["card-content"]);
  torrentItemName.classList.add(["torrent-item-content", "name"]);
  torrentItemMagnet.classList.add(["torrent-item-content", "magnet"]);

  data.torrents.length > 0 && data.torrents.forEach((item) => {
    iconPlay.appendChild(iPlay);
    buttonPlay.appendChild(iconPlay);
    iconDelete.appendChild(iDelete);
    buttonDelete.appendChild(iconDelete);
    buttons.appendChild(buttonPlay);
    buttons.appendChild(buttonDelete);
    cardHeaderTitle.innerHTML = "Torrent";
    cardHeader.appendChild(cardHeaderTitle);
    cardHeader.appendChild(buttons);
    torrentItemName.innerHTML = "Name: " + item.name;
    cardContent.appendChild(torrentItemName);
    torrentItemMagnet.innerHTML = "Magnet: " + item.magnet;
    cardContent.appendChild(torrentItemName);
    card.appendChild(cardHeader);
    card.appendChild(cardContent);
    column.appendChild(card);
    columns.appendChild(column);
  });
})

home && home.addEventListener("click", () => ipcRenderer.send("open:home"));
close && close.addEventListener("click", () => remote.getCurrentWindow().close());
minimize && minimize.addEventListener("click", () => remote.getCurrentWindow().minimize());
inputMagnet &&
  forwardMagnet &&
  forwardMagnet.addEventListener("click", () => {
    if (inputMagnet.value !== "") {
      modalMainWinMagnet.classList.remove("is-active");
      ipcRenderer.send("load:save:magnet", {
        magnet: inputMagnet.value,
      });
      return;
    }

    shell.beep();
  });
playButtons &&
  playButtons.forEach((play) =>
    play.addEventListener("click", (event) => {
      ipcRenderer.send("open:media");
      event.stopPropagation();
    })
  );
