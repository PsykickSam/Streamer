const mainmenu = (app, win) => {
  return [
    {
      label: "File",
      submenu: [
        { label: "1" },
        { label: "2" },
        {
          label: "Quit",
          accelerator: process.platform === "darwin" ? "Command+Shift+I" : "Ctrl+Shift+I",
          click: () => {
            win.webContents.openDevTools();
          },
        },
        {
          label: "Quit",
          accelerator: process.platform === "darwin" ? "Command+Q" : "Alt+Q",
          click: () => {
            app.quit();
          },
        },
      ],
    },
  ];
};

module.exports = mainmenu;
