require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../Models/orderSchema.model");
const SubOrder = require("../Models/subOrderSchema.model");
const Address = require("../Models/addressSchema.model");
const User = require("../Models/userSchema.model");
const CartItem = require("../Models/cartItemSchema.model");

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

    console.log("userId: ", userId);
    console.log("cartlist: ", cartlist);
    // console.log(address);

    // Todo: 1. create address
    // Todo: 2. create main order
    // Todo: 3. loop through cartlist and find the product with the product id
    // Todo: 4. create suborder with product seller id, mainOrder id, prduct id, amount, quantity and payment status
    // Todo: 5. in each iteration add the subOrder id in the mainOrder -> subOrders and in the seller -> receivedOrders
    // Todo: 6. push the mainORder id in user -> myOrders
    // Todo: 7. empty user's addToCart
    // Todo: 8. delete all the cartItems

    // create address
    // const orderAddress = await Address.create({
    //   firstName: address.firstName,
    //   lastName: address.lastName,
    //   email: address.email,
    //   street: address.street,
    //   city: address.city,
    //   postalCode: address.postalCode,
    //   province: address.province,
    //   country: address.country,
    //   phoneNumber: address.phoneNumber,
    // });

    // const items = [];
    // const amount = session.amount_total / 100;

    // cartlist.forEach((item) => items.push(item.productId));

    // const order = await Order.create({
    //   user: userId,
    //   items,
    //   address: orderAddress._id,
    //   amount,
    //   status: "paid",
    //   sessionId: session.id,
    // });

    // const user = await User.findByIdAndUpdate(
    //   userId,
    //   {
    //     $push: { myOrders: order._id },
    //   },
    //   { new: true }
    // );

    // user.addToCart = [];
    // await user.save();

    // delete  all the cartitems of this user
    // await CartItem.deleteMany({ buyer: userId });
  }

  return res.status(200).json({
    success: true,
  });
};
