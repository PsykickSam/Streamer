const path = require("path");

module.exports = {
  production: {
    client: "sqlite3",
    migrations: {
      directory: path.join(__dirname, "src/migrations"),
    },
    connection: {
      filename: path.join(__dirname, "database.sqlite"),
    },
    useNullAsDefault: true,
  },
};
