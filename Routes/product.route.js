const express = require("express");
const productRouter = express.Router();

const { isAuth, isSeller } = require("../Middlewares/auth.middleware");
const {
  products,
  myProducts,
  addProduct,
  updateStock,
} = require("../Controllers/product.controller");

productRouter.get("/products", products);
productRouter.get("/myProducts", isAuth, isSeller, myProducts);
productRouter.post("/addProduct", isAuth, isSeller, addProduct);
productRouter.post("/updateStock/:id", isAuth, isSeller, updateStock);

module.exports = productRouter;
