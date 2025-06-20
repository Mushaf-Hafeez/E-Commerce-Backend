const express = require("express");
const productRouter = express.Router();

const { isAuth, isSeller } = require("../Middlewares/auth.middleware");
const {
  addProduct,
  updateStock,
} = require("../Controllers/product.controller");

productRouter.post("/addProduct", isAuth, isSeller, addProduct);
productRouter.post("/updateStock/:id", isAuth, isSeller, updateStock);

module.exports = productRouter;
