const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 25,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    profilePic: {
      type: String,
    },
    addToCart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        red: "CartItem",
      },
    ],
    myProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        red: "Product",
      },
    ],
    role: {
      type: String,
      enum: ["buyer", "seller"],
      default: "buyer",
    },
    resetPasswordToken: {
      type: String,
    },
    resetTokenExpires: {
      type: Date,
    },
    myOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
