require("dotenv").config();
const otpGenerator = require("otp-generator");

const isDevelopment = process.env.NODE_ENV === "developement";

exports.createCookie = (token, res) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: isDevelopment ? false : true,
    sameSite: isDevelopment ? "lax" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res;
};

exports.generateOTP = () => {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
};

exports.verifyOTP = (time) => {
  return Date.now() < time;
};
