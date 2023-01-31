const mongoose = require("mongoose");

const order = mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  mp3: {
    type: Boolean,
    default: true,
  },
  wav: {
    type: Boolean,
    default: false,
  },
  license: {
    type: Boolean,
  },
  tracks: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
    default: new Date().toISOString(),
  },
  password: {
    type: String
  },
  genre:{
    type: String
  }
});

module.exports = mongoose.model("order", order);
