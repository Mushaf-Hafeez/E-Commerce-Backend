const express = require("express");
const addToCartRouter = express.Router();

// importign middlewares and controller funtions
const { isAuth } = require("../Middlewares/auth.middleware");
const {
  addToCart,
  removeFromCart,
} = require("../Controllers/addToCart.controller");

addToCartRouter.put("/addProduct/:id", isAuth, addToCart);
addToCartRouter.put("/removeProduct/:id", isAuth, removeFromCart);

module.exports = addToCartRouter;
