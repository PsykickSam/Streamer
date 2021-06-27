const events = require("./events");

module.exports = { load: (ipcMain, win, server, webContents) => events(ipcMain, win, server, webContents) };
