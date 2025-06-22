const User = require("../Models/userSchema.model");
const OTP = require("../Models/otpSchema.model");
const { createCookie, generateOTP, verifyOTP } = require("../Config/util");
const otpTemplate = require("../Config/Templates/otpTemplate");
const signupTemplate = require("../Config/Templates/signupTemplate");
const sendResetPasswordLink = require("../Config/Templates/sendResetPasswordLink");
const sendMail = require("../Config/nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// send otp controller function
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
      expiresIn: Date.now() + 5 * 60 * 1000,
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

// signup controller function
exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role, otp } = req.body;

    // return if anything is missing
    if (!name || !email || !password || !role) {
      return res.status(401).json({
        success: false,
        message: "Please provide all the details",
      });
    }

    // check if both passwords are same
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords are not same",
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

// login controller function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the details",
      });
    }

    // check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Please signup before logging in",
      });
    }

    let payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      createCookie(token, res);
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.log("Error in the login controller function: ", login);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// send forgot password link controller function
exports.sendForgotPasswordLink = async (req, res) => {
  try {
    const { email } = req.body;

    // validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is missing",
      });
    }

    // check if the user exists with this mail
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user exist with this email",
      });
    }

    // create the token and create the link with this token
    const resetPasswordToken = crypto.randomUUID();

    // store the token in the database
    await User.findByIdAndUpdate(user._id, {
      resetPasswordToken,
      resetTokenExpires: Date.now() + 5 * 60 * 1000,
    });

    // send the link to the user's mail
    sendMail(
      user.email,
      "Forgot Password",
      sendResetPasswordLink(user.name, resetPasswordToken)
    );

    // return with success response
    return res.status(200).json({
      success: true,
      message: "Link send successfully",
    });
  } catch (error) {
    console.log(
      "Error in the forgot password controller function: ",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// forgot password controller function
exports.forgotPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const { password, confirmPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetTokenExpires: { $gt: Date.now() }, // Fixed: Check if token is still valid
    });

    // return if no user found in the database or token is expired
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token is Invalid/Expired",
      });
    }

    // check if the both passwords are same
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords are not same",
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user and clear reset token fields
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      resetPasswordToken: undefined,
      resetTokenExpires: undefined,
    });

    return res.status(200).json({
      success: true,
      message: "Password has been changed successfully",
    });
  } catch (error) {
    console.log(
      "Error in the forgot password controller function: ",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// check auth controller function
exports.chechAuth = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User authenticated",
    });
  } catch (error) {
    console.log("Error in the check auth controller function: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// logout controller function
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log("Error in the logout controller function: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
