const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const connectCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    console.log("Cloudinary connected.");
  } catch (error) {
    console.log("Error while connecting to cloudinary: ", error.message);
  }
};

module.exports = connectCloudinary;
