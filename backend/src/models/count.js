const mongoose = require("mongoose");

const { Schema } = mongoose;

const countSchema = new Schema({
  title: String,
  count: Number,
  date: String
});

module.exports = Count = mongoose.model("count", countSchema); 