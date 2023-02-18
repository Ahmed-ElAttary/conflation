const express = require("express");
const resultController = require("../controllers/resultController");

const router = express.Router();

router.route("/").post(resultController);

module.exports = router;
