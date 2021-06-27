// DOM
const userTorrent = document.querySelector(".user-torrent");
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");

const modalMainWinOptions = document.getElementById("modal-main-win-options");
const modalMainWinMagnet = document.getElementById("modal-main-win-magnet");
const modalVideoWinFilesList = document.getElementById(".modal-video-win-files-list");

const btnMainOptions = document.getElementById("btn-main-win-options");
const btnVideoFilesList = document.getElementById("btn-video-win-files-list");
const btnMainOptionsModalClose = document.getElementById("btn-main-win-options-modal-close");
const btnMainMagnetModalClose = document.getElementById("btn-main-win-magnet-modal-close");
const btnMainAddTorrentMagnet = document.getElementById("btn-main-win-add-torrent-magnet");

const treeNodes = document.querySelectorAll(".tree-node");
const treeNodeChilds = document.querySelectorAll(".tree-node-child");

// Events
userTorrent &&
  userTorrent.addEventListener("click", (event) => {
    content.classList.toggle("content-squeeze");
    sidebar.classList.toggle("sidebar-show");
  });

btnMainOptions &&
  btnMainOptions.addEventListener("click", (event) => {
    if (modalMainWinMagnet.classList.contains("is-active")) {
      modalMainWinMagnet.classList.remove("is-active");
    }
    
    modalMainWinOptions.classList.toggle("is-active");
  });

btnMainAddTorrentMagnet &&
  btnMainAddTorrentMagnet.addEventListener("click", (event) => {
    modalMainWinOptions.classList.remove("is-active");
    modalMainWinMagnet.classList.add("is-active");
  });

btnMainOptionsModalClose &&
  btnMainOptionsModalClose.addEventListener("click", (event) => {
    modalMainWinOptions.classList.remove("is-active");
  });

btnMainMagnetModalClose &&
  btnMainMagnetModalClose.addEventListener("click", (event) => {
    modalMainWinMagnet.classList.remove("is-active");
    modalMainWinOptions.classList.add("is-active");
  });

btnVideoFilesList &&
  btnVideoFilesList.addEventListener("click", (event) => {
    modalVideoWinFilesList.classList.toggle("is-active");
  });

treeNodes &&
  treeNodes.forEach((node) => {
    node.addEventListener("click", (event) => {
      treeNodeChilds.forEach((child) => {
        if (child.getAttribute("node-ref") == node.getAttribute("node-id")) {
          if (child.classList.contains("tree-child-dispel")) {
            child.classList.remove("tree-child-dispel");
            setTimeout(() => {
              child.classList.toggle("tree-child-hide");
            }, 20);
          } else {
            child.classList.toggle("tree-child-hide");
            child.addEventListener(
              "transitionend",
              () => {
                child.classList.toggle("tree-child-dispel");
              },
              { capture: false, once: true, passive: false }
            );
          }
          return;
        }
      });
    });
  });
