const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema(
  {
    boardname: {
      type: String,
      required: true,
      min: 1,
      max: 30,
    },
    iduser: {
      type: String,
      required: true,
    },
    isshare: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "board",
  }
);

module.exports = mongoose.model("Board", BoardSchema);
