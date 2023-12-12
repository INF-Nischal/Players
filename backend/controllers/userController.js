const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const User = require("../models/userModel");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const registerUser = async (req, res) => {
  try {
    const { image, ...data } = req.body;

    let imageURL;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "players",
        width: 300,
        height: 300,
        crop: "fill",
      });

      imageURL = uploadResponse.secure_url;
    }

    if (imageURL) {
      const publicIdParts = imageURL.split("/");
      const publicId = publicIdParts[publicIdParts.length - 1].split(".")[0];
      data.image = { public_id: publicId, url: imageURL };
    }

    await User.create(data);

    res.status(200).json({ message: "New player added successfully" });
  } catch (error) {
    if (error.name === "PayloadTooLargeError") {
      res
        .status(413)
        .json({ error: "Payload too large. Please upload a smaller image." });
    } else {
      console.error("Error in registerUser", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error in getting Users", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.image && user.image.public_id) {
      await cloudinary.uploader.destroy(`players/${user.image.public_id}`);
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleting user", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerUser, getUsers, deleteUser };
