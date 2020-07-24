exports.up = function (knex) {
  return knex.schema.createTable("torrents", (table) => {
    table.increments();
    table.string("magnet");
    table.string("name");
    table.string("files");
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("torrents");
};
