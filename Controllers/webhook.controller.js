require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
    const { userId, cartlist, address } = session.metadata;

    console.log(event);

    // console.log("user id:", userId);
    // console.log("cartlist:", cartlist);
    // console.log("address:", address);
  }

  return res.status(200).json({
    success: true,
  });
};
