require("dotenv").load();

module.exports = {
  client: "pg",
  useNullAsDefault: true,
  connection: process.env.DATABASE_URL
};
