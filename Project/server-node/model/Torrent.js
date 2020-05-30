const { mongoose, config } = require("../required");

const name = config.database().structure.model.torrents._name;
const fields = config.database().structure.retrive_fields(name);
const Torrent = mongoose.model(name, fields);

module.exports = Torrent;
