const express = require("express");
const addToCartRouter = express.Router();

// importign middlewares and controller funtions
const { isAuth } = require("../Middlewares/auth.middleware");
const { addToCart } = require("../Controllers/addToCart.controller");

addToCartRouter.put("/addProduct/:id", isAuth, addToCart);

module.exports = addToCartRouter;
