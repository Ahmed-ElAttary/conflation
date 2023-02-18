const { Pool } = require("pg");

module.exports = new Pool({
  user: "postgres",
  host: "localhost",
  database: "conflation",
  password: "postgres",
  port: 5432,
});
