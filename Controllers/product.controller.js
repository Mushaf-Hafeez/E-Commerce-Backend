const User = require("../Models/userSchema.model");
const Product = require("../Models/productSchema.model");
const path = require("path");
const { isFileTypeSupported, uploadFile } = require("../Config/util");
const { mongoose } = require("mongoose");
require("dotenv").config();

// get all products controller function
exports.products = async (req, res) => {
  try {
    // get the products from the database
    const products = await Product.find().populate("seller").exec();

    if (!products) {
      return res.status(400).json({
        success: false,
        message: "Error while fetching the products from the database",
      });
    }

    // return the success response
    return res.status(200).json({
      success: true,
      products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    console.log("Error in the products controller function: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    // validation
    if (
      !category ||
      !["mouse", "keyboard", "mousepad"].find((item) => item === category)
    ) {
      return res.status(400).json({
        success: false,
        message: "Category is missing/invalid",
      });
    }

    // find the products from the database
    const products = await Product.find({ category });

    if (!products) {
      return res.status(404).json({
        success: false,
        messsage: "No product found",
      });
    }

    // send the success response
    return res.status(200).json({
      success: true,
      products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    console.log(
      "Error in the get products by category controller function: ",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// my products controller function
exports.myProducts = async (req, res) => {
  try {
    // get the user id
    const id = req.user.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is missing",
      });
    }

    // fetch the user products
    const myProducts = await Product.find({ seller: id });

    if (!myProducts) {
      return res.status(400).json({
        success: false,
        message: "Error while fetching the products from the database",
      });
    }

    return res.status(200).json({
      success: true,
      myProducts,
      message: "Products has been fetched successfully",
    });
  } catch (error) {
    console.log(
      "Error in the my products controller function: ",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const seller = req.user.id;
    const { name, description, category, price } = req.body;
    const images = req.files.images;

    // validation
    if (!name || !description || !category || !price || !images) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the details",
      });
    }

    // Normalize images to always be an array
    const imageArray = Array.isArray(images) ? images : [images];

    // Check if we have any images
    if (imageArray.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one image",
      });
    }

    const productImages = [];

    for (const image of imageArray) {
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
    const product = await Product.create({
      name,
      description,
      productImages,
      category,
      price,
      seller,
    });

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
      product,
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

// change stock controller function
exports.updateStock = async (req, res) => {
  try {
    const productId = req.params.id;

    // validation
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product Id is missing",
      });
    }

    // change the stock of the product in the database
    const product = await Product.findByIdAndUpdate(productId, [
      { $set: { inStock: { $not: "$inStock" } } },
    ]);

    if (!product) {
      return res.status(201).json({
        success: false,
        message: "Error while changing the stock",
      });
    }

    // return the success respone
    return res.status(200).json({
      success: true,
      message: "Stock has been updated successfully",
    });
  } catch (error) {
    console.log(
      "Error in the change stock controller function: ",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
