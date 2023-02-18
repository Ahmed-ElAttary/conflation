const express = require("express");
const downloadController = require("./../controllers/downloadController");

const router = express.Router();

router.route("/").post(downloadController);

module.exports = router;
