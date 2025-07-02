const Order = require("../Models/orderSchema.model");
const Address = require("../Models/addressSchema.model");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// place order controller function
exports.placeOrder = async (req, res) => {
  try {
    const { cartlist } = req.body;
    const userId = req.user.id;
    const {
      firstName,
      lastName,
      email,
      street,
      city,
      postalCode,
      province,
      country,
      phoneNumber,
    } = req.body?.address;

    // validation
    if (
      firstName ||
      lastName ||
      email ||
      street ||
      city ||
      postalCode ||
      province ||
      country ||
      phoneNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "All the fields are required",
      });
    }

    // validation on cartlist
    if (!cartlist || !cartlist.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // create the address
    const address = await Address.create({
      firstName,
      lastName,
      email,
      street,
      city,
      postalCode,
      province,
      country,
      phoneNumber,
    });

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Error while creating the address",
      });
    }

    const cartItemIds = [];

    cartlist.forEach((item) => cartItemIds.push(item._id));

    // Todo: create the order

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

    console.log("session is: ", session);

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
