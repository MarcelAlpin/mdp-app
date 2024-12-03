const express = require("express");

const router = express.Router();

const fakultasController = require("../controllers/fakultasController");
// import middleware
const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/role");

router.get("/", authMiddleware, fakultasController.getAllFakultas);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  fakultasController.createFakultas
);

router.get("/:id", fakultasController.getFakultasById);

router.put("/:id", fakultasController.updateFakultas);

router.delete("/:id", fakultasController.deleteFakultas);

module.exports = router;
