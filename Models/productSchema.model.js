const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 100,
    trim: true,
  },
  productImages: [
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
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Product", productSchema);
