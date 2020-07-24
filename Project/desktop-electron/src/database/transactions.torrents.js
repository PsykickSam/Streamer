const knexconf = require("../../knexfile");
const knex = require("knex")(knexconf.production);

module.exports.insert = (data) => {
  return knex("torrents").insert(data);
};

module.exports.fetch = () => {
  return knex("torrents").select();
};
