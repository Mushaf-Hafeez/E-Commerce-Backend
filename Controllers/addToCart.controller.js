const CartItem = require("../models/cartItemSchema.model");

// controller function to add or update the product in the cart
exports.addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;

    console.log(productId, userId);
  } catch (error) {
    console.log(
      "Error in the add to cart controller function: ",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
