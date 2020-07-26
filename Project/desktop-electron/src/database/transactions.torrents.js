const cnfDatabase = require("../config/").database;
const db = require("electron-db");
const logger = require("../logger/").logger;

module.exports.insert = (data) => {
  const insertData = new Object();
  insertData[cnfDatabase.torrents.cols.name] = data.name;
  insertData[cnfDatabase.torrents.cols.files] = data.files;
  insertData[cnfDatabase.torrents.cols.magnet] = data.magnet;

  try {
    if (db.valid(cnfDatabase.torrents.name)) {
      db.insertTableContent(
        cnfDatabase.torrents.name,
        insertData,
        (success, message) => {
          if (success) {
            logger.info("Data inserted successfully!");
          } else {
            logger.error("Data insertion error! Message: " + msg);
          }
        }
      );
    }
  } catch (err) {
    logger.error("Data insertion error! Message: " + err.message);
  }
};

module.exports.fetch = () => {
  db.getAll(cnfDatabase.torrents.name, (success, data) => {
    if (success) {
      console.log(data);
    } else {
      logger.error("Data fetching error!");
    }
  });
};

module.exports.delete = () => {
  return;
};
