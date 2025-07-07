require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// checkout controller function
exports.checkout = async (req, res) => {
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
    } = req.body.address;

    // validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !street ||
      !city ||
      !postalCode ||
      !province ||
      !country ||
      !phoneNumber
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

    const line_items = [];

    cartlist.forEach((item) =>
      line_items.push({
        price_data: {
          currency: "pkr",
          product_data: {
            name: item.productId.name,
          },
          unit_amount: item.productId.price * 100,
        },
        quantity: item.quantity,
      })
    );

    const minimalCart = cartlist.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      metadata: {
        userId,
        address: JSON.stringify(req.body.address),
        cartlist: JSON.stringify(minimalCart),
      },
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
    });

    return res.status(200).json({
      success: true,
      url: session.url,
      message: "Order created",
    });
  } catch (error) {
    console.log("Error in the checkout controller function: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// check payment status
exports.checkStatus = async (req, res) => {
  try {
    // get the session id
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(404).json({
        success: false,
        message: "Session ID not found",
      });
    }

    // retrieve the session from stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Not session found",
      });
    }

    // return the success response if paid
    if (session.payment_status === "paid") {
      return res.status(200).json({
        success: true,
        message: "session completed",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "session not completed",
      });
    }
  } catch (error) {
    console.log(
      "Error in the check status controller function: ",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
