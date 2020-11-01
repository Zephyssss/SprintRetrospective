const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema(
  {
    tagname: {
      type: String,
      required: true,
      min: 1,
      max: 30,
    },
    information: {
      type: String,
      default:""
    },
    idboard: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
      min: 1,
      max: 3,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "tag",
  }
);

module.exports = mongoose.model("Tag", TagSchema);
