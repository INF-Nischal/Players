const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Please provide the player image"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Please provide the player name"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Please provide the player age"],
    },
    gender: {
      type: String,
      required: [true, "Please provide the player gender"],
    },
    position: {
      type: String,
      required: [true, "Please provide the player position"],
    },
    description: {
      type: String,
      required: [true, "Please provide the player description"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
