const fs = require("fs");
const { exec } = require("child_process");
const pool = require("./pgPool");
const deleteFile = require("./deleteFile");
module.exports = (path, name, res) => {
  exec(
    `shp2pgsql -s 4326 ${path}${name}.shp t${name} > ${path}${name}.sql`,

    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send(error);
      }
      fs.readFile(`${path}${name}.sql`, "utf8", (err, data) => {
        pool.query(data, (error, results) => {
          fs.readdir(path, function (err, files) {
            if (err) {
              return console.log("Unable to scan directory: " + err);
            }
            files.forEach((file) => {
              if (file.includes(name)) {
                deleteFile(path + file);
              }
            });
          });

          if (error) {
            throw error;
          }
        });
      });
      return res
        .status(200)
        .send({ message: "Shapefile imported successfully", sessionID: name });
    }
  );
};
