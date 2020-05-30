const { config, log } = require("../required");
const { TorrentModel } = require("../model");

module.exports.save = async (Magnet, Name, Files, Hash, User) => {
  log.info("Torrent data saving to database");
  const fields = config.database().structure.model.torrents._fields;

  fields.magnet = Magnet;
  fields.name = Name;
  fields.files = Files;
  fields.hash = Hash;
  fields.user = User;
  fields.updated_at = Date.now();
  fields.created_at = Date.now();

  const model = new TorrentModel(fields);
  const saved = await model.save();
  log.info("Torrent data saved to database");
  return saved;
};

module.exports.fetch = {
  all: async () => {
    log.info("Torrent data fetch from database");
    const torrents = await TorrentModel.find({});
    log.info("Torrent data fetched from database");
    return torrents;
  },
  byId: async (id) => {
    log.info("Torrent data fetch from database - by ID");
    const torrent = await TorrentModel.findById(id);
    log.info("Torrent data fetched from database - by ID");
    return torrent;
  },
};
