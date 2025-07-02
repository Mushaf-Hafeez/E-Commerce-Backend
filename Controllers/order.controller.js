const Order = require("../Models/orderSchema.model");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// place order controller function
exports.placeOrder = async (req, res) => {
  try {
    const { cartlist, address } = req.body;

    const line_items = [];
    cartlist.forEach((item) => {
      line_items.push({
        price_data: {
          currency: "pkr",
          product_data: {
            name: item.productId.name,
          },
          unit_amount: item.productId.price * 100,
        },
        quantity: item.quantity,
      });
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
    });

    return res.json({
      url: session.url,
    });
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
