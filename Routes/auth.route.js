const express = require("express");
const authRouter = express.Router();

// importing controller functions
const {
  signup,
  login,
  sendOTP,
  sendForgotPasswordLink,
  forgotPassword,
} = require("../Controllers/auth.controller");

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/send-otp", sendOTP);
authRouter.post("/sendForgotPasswordLink", sendForgotPasswordLink);
authRouter.post("/forgotPassword/:token", forgotPassword);

module.exports = authRouter;
