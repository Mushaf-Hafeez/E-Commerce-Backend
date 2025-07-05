const express = require("express");
const orderRouter = express.Router();

const { checkout } = require("../Controllers/order.controller");
const { isAuth } = require("../Middlewares/auth.middleware");

orderRouter.post("/checkout", isAuth, checkout);

module.exports = orderRouter;
