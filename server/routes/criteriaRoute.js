const express = require("express");
const criteriaController = require("../controllers/criteriaController");

const router = express.Router();

router.route("/").post(criteriaController);

module.exports = router;
