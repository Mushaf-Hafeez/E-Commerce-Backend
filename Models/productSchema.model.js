const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    maxLength: 25,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  category: {
    type: String,
    requried: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 4,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
