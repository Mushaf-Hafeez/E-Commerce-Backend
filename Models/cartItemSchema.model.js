const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("CartItem", cartItemSchema);
