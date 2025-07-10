const express = require("express");
const orderRouter = express.Router();

const {
  checkout,
  checkStatus,
  myOrders,
  receivedOrders,
} = require("../Controllers/order.controller");
const { isAuth, isSeller } = require("../Middlewares/auth.middleware");

orderRouter.post("/checkout", isAuth, checkout);
orderRouter.get("/orders", isAuth, myOrders);
orderRouter.get("/received-orders", isAuth, isSeller, receivedOrders);
orderRouter.get("/check-status/:sessionId", isAuth, checkStatus);

module.exports = orderRouter;
