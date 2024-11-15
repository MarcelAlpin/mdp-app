var express = require("express");
var router = express.Router();

const prodiController = require("../controllers/prodiController");

router.get("/", prodiController.index);

module.exports = router;
