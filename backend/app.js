require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const apiRoutes = require("./src/routes/routes");
const app = express();
const urlDB = process.env.urlDB;
const port = process.env.port || 2010;

app.use(cors());
app.use(bodyParser.json());
app.use("/", apiRoutes);

mongoose.connect(urlDB, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
