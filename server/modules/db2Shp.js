const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const deleteFile = require("./deleteFile");
module.exports = (pathName, sessionID, res) => {
  const myPath = path.join(pathName, String(sessionID));
  exec(
    `mkdir ${myPath} && pgsql2shp -f ${myPath}/linked${sessionID} -h localhost -u postgres -P postgres conflation t${sessionID}linked && pgsql2shp -f ${myPath}/unlinked${sessionID} -h localhost -u postgres -P postgres conflation t${sessionID}unlinked && powershell Compress-Archive ${myPath}/* ${myPath}.zip && rmdir ${myPath} /s /q`,

    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error`);
        return res.status(500).send(error);
      }
      //   return res
      //     .status(200)
      //     .send({ message: "Shapefiles Exported successfully" });
      const zipName = "files.zip";
      const zipData = fs.readFileSync(`${myPath}.zip`);

      res.set({
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment;  filename=${zipName}`,
        "Content-Length": zipData.length,
      });
      res.send(zipData);
      deleteFile(`${myPath}.zip`);
    }
  );
};
