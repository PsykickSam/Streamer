const { mongoose, config } = require("../required");

const name = config.database().structure.model.videos._name;
const fields = config.database().structure.retrieve_fields(name);
const Video = mongoose.model(name, fields);

module.exports = Video;
