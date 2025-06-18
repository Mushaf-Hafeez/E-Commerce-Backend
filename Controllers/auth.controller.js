const User = require("../Models/userSchema.model");
const OTP = require("../Models/otpSchema.model");
const { createCookie, generateOTP, verifyOTP } = require("../Config/util");
const otpTemplate = require("../Config/Templates/otpTemplate");
const signupTemplate = require("../Config/Templates/signupTemplate");
const sendMail = require("../Config/nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // validate the email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide the email",
      });
    }

    let otp = generateOTP();

    // create the OTP
    otp = await OTP.create({
      otp,
      email,
      expiresIn: Date.now() + 1 * 60 * 1000,
    });

    // check if the OTP is created
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "Error while creating the OTP",
      });
    }

    // send mail
    sendMail(email, "OTP Verification", otpTemplate(otp.otp));

    return res.status(200).json({
      success: true,
      message: "OTP send successfully",
    });
  } catch (error) {
    console.log("Error in the send otp controller: ", error.message);
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, otp } = req.body;

    // return if anything is missing
    if (!name || !email || !password || !role) {
      return res.status(401).json({
        success: false,
        message: "Please provide all the details",
      });
    }

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is missing",
      });
    }

    // verify the otp
    const dbOTP = await OTP.findOne({ email }).sort({ expiresIn: -1 });

    if (!dbOTP) {
      return res.status(400).json({
        success: false,
        message: "OTP has not created yet",
      });
    }

    if (!verifyOTP(dbOTP.expiresIn) || otp != dbOTP.otp) {
      return res.status(400).json({
        success: false,
        message: "OTP invalid/expired",
      });
    }

    // check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    let payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    await OTP.findByIdAndDelete(dbOTP._id);

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    createCookie(token, res);

    sendMail(
      user.email,
      "Signup Successful",
      signupTemplate(user.name, new Date().getFullYear())
    );

    return res.status(200).json({
      success: true,
      message: "Signup successful",
    });
  } catch (error) {
    console.log("Error in the signup controller: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
