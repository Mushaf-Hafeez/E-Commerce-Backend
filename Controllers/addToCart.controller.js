const Product = require("../Models/productSchema.model");
const User = require("../Models/userSchema.model");
const CartItem = require("../Models/cartItemSchema.model");

// controller function to add or update the product in the cart
exports.addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const buyer = req.user.id;

    // validation
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is missing",
      });
    }

    // fetch the product price from the database
    const { price } = await Product.findById(productId).select("price");

    // find the cart item with this user id and product id
    const cartItem = await CartItem.findOne({ productId, buyer });

    // if no item found then create it
    if (!cartItem) {
      const response = await CartItem.create({
        productId,
        buyer,
        amount: price,
      });
      await User.findByIdAndUpdate(buyer, {
        $push: { addToCart: response._id },
      });

      return res.status(200).json({
        success: true,
        message: "Cart item created successfully",
      });
    } else {
      cartItem.quantity += 1;
      cartItem.amount += price;
      await cartItem.save();
      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
      });
    }
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

// controller function to remove or delete the product from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const buyer = req.user.id;
    const productId = req.params.id;

    // validation
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is missing",
      });
    }

    // fetch the price of the product from the datbase
    const { price } = await Product.findById(productId).select("price");

    const cartItem = await CartItem.findOne({ productId, buyer });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "No product found",
      });
    }

    if (cartItem.quantity === 1) {
      await CartItem.findByIdAndDelete(cartItem._id);
      await User.findByIdAndUpdate(buyer, {
        $pull: { addToCart: cartItem._id },
      });
    } else {
      cartItem.quantity -= 1;
      cartItem.amount -= price;

      await cartItem.save();
    }

    // return the success response
    return res.status(200).json({
      success: true,
      message: "Item removed successfully",
    });
  } catch (error) {
    console.log(
      "Error in the remove product controller function: ",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
