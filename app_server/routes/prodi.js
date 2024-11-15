var express = require("express");
var router = express.Router();

// Import Controller
const prodiController = require("../controllers/prodiController");

/* GET list prodi. */
router.get("/", prodiController.index);

module.exports = router;
