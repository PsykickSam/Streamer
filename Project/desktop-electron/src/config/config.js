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
  database: {
    torrents: {
      name: "torrents",
      cols: {
        magnet: "magnet",
        name: "name",
        files: "files"
      }
    }
  },
  files: {
    database: path.join(app.getAppPath(), "database.sqlite")
  }
};
