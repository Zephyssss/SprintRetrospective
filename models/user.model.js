const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 30,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      min: 6,
      max: 40,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 128,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "user",
  }
);

module.exports = mongoose.model("User", UserSchema);
