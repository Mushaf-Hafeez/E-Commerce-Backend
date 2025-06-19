const Product = require("../Models/productSchema.model");

exports.addProduct = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const seller = req.user.id;

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
