const fs = require("fs");
const directory = require("../config/").directory;
const pathBinder = require("../util/").pathBinder;
const logger = require("../logger/").logger;

module.exports = () => {
  if (!fs.existsSync(pathBinder.list(directory.downloads, directory.storage.main))) {
    pathBinder.obj(directory.storage).forEach((path) => {
      const createPath = pathBinder.list(directory.downloads, path);
      fs.mkdirSync(createPath);
      logger.info("Created PATH: " + createPath);
    });
  }
};
