const { response } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is missing",
      });
    }

    // verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        id: decode.id,
        email: decode.email,
        role: decode.role,
      };
    } catch (error) {
      console.log("Error while verifying the token: ", error.message);
      return res.status(401).json({
        success: false,
        message: "Internal server error",
      });
    }

    next();
  } catch (error) {
    console.log("Error in the is auth middleware: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.isSeller = async (req, res, next) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route only for the sellers",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("Error in the is seller middleware: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
