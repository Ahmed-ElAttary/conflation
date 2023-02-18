const path = require("path");
const db2Shp = require("./../modules/db2Shp");

module.exports = async (req, res) => {
  const { sessionID } = req.body;
  const newpath = path.join(__dirname, "..", "exported");
  db2Shp(newpath, sessionID, res);
};
