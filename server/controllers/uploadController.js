const path = require("path");
const shp2Db = require("./../modules/shp2Db");
module.exports = async (req, res) => {
  if (req.files) {
    const newpath = path.join(__dirname, "..", "uploads/");
    console.log(newpath);
    const files = req.files.file;
    const dateNow = Date.now();

    try {
      await files.forEach((el) => {
        el.mv(path.join(newpath, dateNow + path.extname(el.name)));
      });
      shp2Db(newpath, dateNow, res);
    } catch (err) {
      res.status(500).send({ message: "Files upload failed" });
    }
  } else {
    res.status(500).send({ message: "there is no file provided" });
  }
};
