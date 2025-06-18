const express = require("express");
const authRouter = express.Router();

// importing controller functions
const { signup, sendOTP } = require("../Controllers/auth.controller");

authRouter.post("/signup", signup);
authRouter.post("/send-otp", sendOTP);

module.exports = authRouter;
