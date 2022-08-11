const express = require("express");
const router = express.Router();
const {
  createOneCount,
  getAllCounts,
  updateInfoOneCount,
  deletOneCount,
} = require("../controllers/count.controller");

router.post("/", createOneCount);
router.get("/", getAllCounts);
router.patch("/:id", updateInfoOneCount);
router.delete("/:id", deletOneCount);

module.exports = router;
