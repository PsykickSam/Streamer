const events = require("./events");

module.exports = { load: (ipcMain, win, server) => events(ipcMain, win, server) };
