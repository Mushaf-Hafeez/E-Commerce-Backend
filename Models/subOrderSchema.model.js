const mongoose = require("mongoose");

const subOrderSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  mainOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  amount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("SubOrder", subOrderSchema);
