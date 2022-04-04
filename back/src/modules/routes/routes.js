const express = require("express");
const router = express.Router();
const {
  createOneCount,
  getAllCounts,
  updateInfoOneCount,
  deletOneCount
} = require("../controllers/count.controller");

router.post("/createCount", createOneCount);
router.get("/getCounts", getAllCounts);
router.patch("/updateCont", updateInfoOneCount);
router.delete("/delOne", deletOneCount)

module.exports = router;