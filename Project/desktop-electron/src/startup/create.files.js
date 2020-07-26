const fs = require("fs");
const cnfFiles = require("../config/").files;
const pathBinder = require("../util/").pathBinder;
const logger = require("../logger/").logger;

module.exports = (callback) => {
  if (!fs.existsSync(cnfFiles.database)) {
    fs.writeFileSync(cnfFiles.database);
    logger.info("File Created: " + cnfFiles.database);
  } else {
    logger.info(`File {${cnfFiles.database}} is already exists:`);
  }

  if (callback) callback();
};
