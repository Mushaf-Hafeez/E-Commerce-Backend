const express = require("express");
const authRouter = express.Router();

// importing controller functions
const {
  signup,
  login,
  sendOTP,
  sendForgotPasswordLink,
  resetPassword,
  chechAuth,
  logout,
} = require("../Controllers/auth.controller");
const { isAuth } = require("../Middlewares/auth.middleware");

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/send-otp", sendOTP);
authRouter.post("/sendForgotPasswordLink", sendForgotPasswordLink);
authRouter.post("/resetPassword/:token", resetPassword);
authRouter.get("/checkAuth", isAuth, chechAuth);
authRouter.get("/logout", isAuth, logout);

module.exports = authRouter;
