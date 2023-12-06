const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    const URI = process.env.DB_URI;
    await mongoose.connect(URI);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

module.exports = connectDB;
