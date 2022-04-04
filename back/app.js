const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const apiRoutes = require("./src/modules/routes/routes");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/", apiRoutes);

const url = "mongodb+srv://user:user@cluster0.3cdgy.mongodb.net/counts?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(2009, () => {
  console.log("Listen");
});