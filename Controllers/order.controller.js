const Order = require("../Models/orderSchema.model");

// place order controller function
exports.placeOrder = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
  } catch (error) {
    console.log(
      "Error in the place order controller function: ",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
