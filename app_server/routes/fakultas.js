var express = require("express");
var router = express.Router();

// Import Controller
const fakultasController = require("../controllers/fakultasController");

/* GET list fakultas. */
router.get("/", fakultasController.index);

// Route untuk menambahkan data fakultas
router.post("/store", fakultasController.store);

module.exports = router;
