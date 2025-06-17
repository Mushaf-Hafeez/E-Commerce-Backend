const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  otp: {
    type: Number,
    required: true,
    maxLength: 8,
  },
  email: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  expiresIn: {
    type: Date,
  },
});

module.exports = mongoose.model("OTP", otpSchema);
