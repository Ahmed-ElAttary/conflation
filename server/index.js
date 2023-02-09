const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  console.log(__dirname);
  pool.query("SELECT * FROM test", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});
app.post("/upload", (req, res) => {
  const newpath = __dirname + "/uploads/";
  console.log(req.files.file);
  const files = req.files.file;

  files.forEach((el) => {
    el.mv(`${newpath}${el.name}`, (err) => {
      if (err) {
         return res.status(500).send({ message: "File upload failed", code: 200 });
      } else {
       return res.status(200).send({ message: "File Uploaded", code: 200 });
      }
    });
  });
});
app.listen(port, () => {
  console.log(`Listening on port ${port} 🌍`);
  console.log(Date.now());
});
