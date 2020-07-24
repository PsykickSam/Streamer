const url = require("url");
const path = require("path");
const logger = require("../logger").logger;
const db = require("../database");

module.exports = (ipcMain, win, server) => {
  ipcMain.on("open:media", (event) => {
    if (win != null) {
      win.loadURL(
        url.format({
          pathname: path.join(__dirname, "../../view/video.window.html"),
          protocol: "file:",
          slashes: true,
        })
      );
    } else {
      logger.error("window is not initialized yet");
    }
  });

  ipcMain.on("open:home", (event) => {
    if (win != null) {
      win.loadURL(
        url.format({
          pathname: path.join(__dirname, "../../view/main.window.html"),
          protocol: "file:",
          slashes: true,
        })
      );
    } else {
      logger.error("window is not initialized yet");
    }
  });

  ipcMain.on("load:save:magnet", (event, res) => {
    if (win != null) {
      logger.info("Magnet: " + res.magnet);
      server.mixMagnet(res.magnet).execute((data) => {
        db.trans_Torrents.insert(data).then((value) => {
          console.log(value);
          
          db.trans_Torrents.fatch().then((value) => {
            console.log(value);
          });
        });
      });
    } else {
      logger.error("window is not initialized yet");
    }
  });

  ipcMain.on("", (event) => {
    if (win != null) {
      win.loadURL(
        url.format({
          pathname: path.join(__dirname, "../../view/main.window.html"),
          protocol: "file:",
          slashes: true,
        })
      );
    } else {
      logger.error("window is not initialized yet");
    }
  });
};
