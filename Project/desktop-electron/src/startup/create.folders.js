const fs = require("fs");
const cnfDirectory = require("../config/").directory;
const pathBinder = require("../util/").pathBinder;
const logger = require("../logger/").logger;

module.exports = (callback) => {
  if (!fs.existsSync(pathBinder.list(cnfDirectory.downloads, cnfDirectory.storage.main))) {
    pathBinder.obj(cnfDirectory.storage).forEach((path) => {
      const createPath = pathBinder.list(cnfDirectory.downloads, path);
      fs.mkdirSync(createPath);
      logger.info("Created Path: " + createPath);
    });

    if (callback) callback();
  }
};
