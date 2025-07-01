const express = require("express");
const orderRouter = express.Router();

const { placeOrder } = require("../Controllers/order.controller");
const { isAuth } = require("../Middlewares/auth.middleware");

orderRouter.post("/place-order", isAuth, placeOrder);

module.exports = orderRouter;
