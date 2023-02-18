const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");

const uploadRoute = require("./routes/uploadRoute");
const criteriaRoute = require("./routes/criteriaRoute");
const resultRoute = require("./routes/resultRoute");
const downloadRoute = require("./routes/downloadRoute");
const app = express();
app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(express.json());
app.use("/upload", uploadRoute);
app.use("/criteria", criteriaRoute);
app.use("/result", resultRoute);
app.use("/download", downloadRoute);

module.exports = app;
