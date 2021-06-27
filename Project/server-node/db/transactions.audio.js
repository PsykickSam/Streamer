const { fs, helper, config, log } = require("../required");
const { AudioModel } = require("../model");

module.exports.fetch = async () => {
  log.info("Audio data fetching from database");
  const videos = await AudioModel.find({});
  log.info("Audio data fetched from database");
  return videos;
};

module.exports.get = async (id) => {
  log.info(`Audio is fetching from database - ID ${id}`);
  try {
    const video = await AudioModel.find({ _id: id });
    log.info("Audio is fetched from database");
    return video.pop();
  } catch(err) {
    log.error(`Audio fetch 'Failed' from database: ${err.message}`);
    return null;
  }
};

module.exports.save = async () => {
  log.info("Audio data saving to database");
  log.info("Still in build");
  log.info("Audio data saved to database");
  return saved;
};

module.exports.update = async () => {
  log.info("Audio data updating to database");
  log.info("Still in build");
  log.info("Audio data updated to database");
};
