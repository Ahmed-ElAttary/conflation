const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 1234;

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "conflation",
  password: "postgres",
  port: 5432,
});

const command =
  "shp2pgsql -s 2100 -d /home/enomix/www/EsoterikoFinal/Maps/shps/nodes.shp  | psql -h localhost -p 5432 -d esoteriko -U postgres";

app.get("/", (req, res) => {
  pool.query("SELECT * FROM test", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port} 🌍`);
  console.log(Date.now());
});
