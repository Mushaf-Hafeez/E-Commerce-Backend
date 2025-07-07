require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../Models/orderSchema.model");
const Address = require("../Models/addressSchema.model");
const User = require("../Models/userSchema.model");

// webhook controller
exports.webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_SIGNIN_SIGNATURE
    );
  } catch (error) {
    console.log(
      "Error while verifying the signature in webhook: ",
      error.message
    );
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const cartlist = JSON.parse(session.metadata.cartlist);
    const address = JSON.parse(session.metadata.address);

    // console.log(userId);
    // console.log(cartlist);
    // console.log(address);

    // create address
    const orderAddress = await Address.create({
      firstName: address.firstName,
      lastName: address.lastName,
      email: address.email,
      street: address.street,
      city: address.city,
      postalCode: address.postalCode,
      province: address.province,
      country: address.country,
      phoneNumber: address.phoneNumber,
    });

    const items = [];
    const amount = session.amount_total / 100;

    cartlist.forEach((item) => items.push(item.productId));

    const order = await Order.create({
      user: userId,
      items,
      address: orderAddress._id,
      amount,
      status: "paid",
      sessionId: session.id,
    });

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { myOrders: order._id },
      },
      { new: true }
    );

    user.addToCart = [];
    await user.save();
  }

  return res.status(200).json({
    success: true,
  });
};
