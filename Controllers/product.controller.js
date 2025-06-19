const User = require("../Models/userSchema.model");
const Product = require("../Models/productSchema.model");
const path = require("path");
const { isFileTypeSupported, uploadFile } = require("../Config/util");
const { mongoose } = require("mongoose");
require("dotenv").config();

exports.addProduct = async (req, res) => {
  try {
    const seller = req.user.id;
    const { name, description, category, price } = req.body;
    const images = req.files.images;

    // validation
    if (
      !name ||
      !description ||
      !category ||
      !price ||
      !images ||
      images.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the details",
      });
    }

    const productImages = [];

    for (const image of images) {
      if (!isFileTypeSupported(path.extname(image.name))) {
        return res.status(400).json({
          success: false,
          message: "File type not supported",
        });
      } else {
        const response = await uploadFile(image.tempFilePath);
        productImages.push(response.secure_url);
      }
    }

    // create the product in the database
    const product = await Product.create(
      seller,
      name,
      description,
      productImages,
      category,
      price
    );

    if (!product) {
      return res.status(201).json({
        success: false,
        message: "Error while creating the product in the database",
      });
    }

    await User.findByIdAndUpdate(seller, {
      $push: { myProducts: product._id },
    });

    // return the success response
    return res.status(200).json({
      success: true,
      message: "product has been added successfully",
    });
  } catch (error) {
    console.log(
      "Error in the add product controller function: ",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
