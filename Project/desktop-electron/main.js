const electron = require("electron");
const url = require("url");
const path = require("path");
const startup = require("./src/startup/");
const event = require("./src/event");
const logger = require("./src/logger/").logger;
const tmplt_Mainmenu = require("./src/template/main.menu");
const server = require("./src/server/server");

// Electron
const { app, BrowserWindow, Menu, ipcMain } = electron;

// Window
let window = null;

// Startup
// Create folders
startup.createFolders();
// Create database file, ...
// startup.createFiles();
// Create Database Table
startup.createDbTables();
logger.info("startup content is loaded");

app.on("ready", () => {
  /// Window
  window = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  window.loadURL(
    url.format({
      pathname: path.join(__dirname, "view/main.window.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  window.on("resize", () => {
    const w = window.getSize()[0];
    const h = window.getSize()[1];

    if (w < 800 || h < 600) {
      window.setSize(800, 600);
    }
  });

  window.on("closed", () => {
    window = null;
  });
  /// Window

  // Event
  event.load(ipcMain, window, server);

  // Main menu setup
  const mainmenu = Menu.buildFromTemplate(tmplt_Mainmenu(app, window));
  Menu.setApplicationMenu(mainmenu);
});

// Importent
// mainWindow.webContents.on("did-finish-load", () => {

// });
