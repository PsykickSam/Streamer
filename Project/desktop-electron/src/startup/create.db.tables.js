const cnfDatabase = require("../config/").database;
const logger = require("../logger/").logger;
const db = require("electron-db");

module.exports = () => {
  logger.info("Creating Data Table of " + cnfDatabase.torrents.name);
  db.createTable(cnfDatabase.torrents.name, (success, msg) => {
    if (success) {
      logger.info("Created Data Table of " + cnfDatabase.torrents.name);
    } else {
      logger.error(
        `Failed to create ${cnfDatabase.torrents.name}, Message: + ${msg}`
      );
    }
  });
};
