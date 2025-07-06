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
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
  },
  sessionId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
