const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  otp: {
    type: Number,
    required: true,
    maxLength: 8,
  },
  email: {
    type: String,
    required: true,
  },
  expiresIn: {
    type: Date,
  },
});

module.exports = mongoose.model("OTP", otpSchema);
