const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      type: String,
    },
  ],
  subOrders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubOrder",
    },
  ],
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  amount: {
    type: Number,
    required: true,
  },
  payment_status: {
    type: ["paid", "unpaid"],
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
