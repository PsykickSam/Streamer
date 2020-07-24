const app = require("electron").app;
const path = require("path")

module.exports = {
  directory: {
    downloads: app.getPath("downloads"),
    storage: {
      main: "/storage",
      child: {
        download: "/download",
        temp: "/temp",
      },
    },
  },
  files: {
    database: path.join(app.getAppPath(), "database.sqlite")
  }
};
