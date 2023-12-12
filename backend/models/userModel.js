const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    image: {
      public_id: {
        type: String,
        required: [true, "Please provide the player image public_id"],
      },
      url: {
        type: String,
        required: [true, "Please provide the player image url"],
      },
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
