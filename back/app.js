const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.get("/", (req, res) => {
  res.send("Работаем, чувак");
});

app.listen(2009, () => {
  console.log("Listen");
});