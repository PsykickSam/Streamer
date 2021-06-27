const { mongoose, config } = require("../required");

const name = config.database().structure.model.audios._name;
const fields = config.database().structure.retrieve_fields(name);
const Audio = mongoose.model(name, fields);

module.exports = Audio;
