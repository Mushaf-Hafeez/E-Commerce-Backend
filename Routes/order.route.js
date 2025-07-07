const express = require("express");
const orderRouter = express.Router();

const { checkout, checkStatus } = require("../Controllers/order.controller");
const { isAuth } = require("../Middlewares/auth.middleware");

orderRouter.post("/checkout", isAuth, checkout);
orderRouter.get("/check-status/:sessionId", isAuth, checkStatus);

module.exports = orderRouter;
