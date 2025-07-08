require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../Models/orderSchema.model");
const SubOrder = require("../Models/subOrderSchema.model");
const Address = require("../Models/addressSchema.model");
const User = require("../Models/userSchema.model");
const CartItem = require("../Models/cartItemSchema.model");
const Product = require("../Models/productSchema.model");

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

    // console.log("userId: ", userId);
    // console.log("cartlist: ", cartlist);
    // console.log(address);

    // Todo: 1. create address ✅

    // create address
    const orderAddress = await Address.create(address);

    // Todo: 2. create main order ✅

    const items = [];
    const amount = session.amount_total / 100;

    cartlist.forEach((item) => items.push(item.productId));

    const order = await Order.create({
      user: userId,
      items,
      address: orderAddress._id,
      amount,
      payment_status: "paid",
      sessionId: session.id,
    });

    // Todo: 3. loop through cartlist and find the product with the product id
    // Todo: 4. create suborder with product seller id, mainOrder id, prduct id, amount, quantity and payment status ✅
    // Todo: 5. in each iteration add the subOrder id in the mainOrder -> subOrders and in the seller -> receivedOrders ✅

    const subOrders = [];

    for (const item of cartlist) {
      const product = await Product.findById(item.productId);
      const subOrder = await SubOrder.create({
        seller: product.seller,
        address: orderAddress._id,
        mainOrder: order._id,
        product: product._id,
        amount: product.price * item.quantity,
        quantity: item.quantity,
        payment_status: "paid",
      });
      await User.findByIdAndUpdate(product.seller, {
        $push: { receivedOrders: subOrder._id },
      });
      subOrders.push(subOrder._id);
    }

    // Todo: 6. push the mainORder id in user -> myOrders ✅
    order.subOrders = subOrders;
    await order.save();

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { myOrders: order._id },
      },
      { new: true }
    );

    // Todo: 7. empty user's addToCart ✅
    user.addToCart = [];
    await user.save();

    // Todo: 8. delete all the cartItems ✅
    // delete  all the cartitems of this user
    await CartItem.deleteMany({ buyer: userId });
  }

  return res.status(200).json({
    success: true,
  });
};
