const express = require("express");
const productRouter = express.Router();

const { isAuth, isSeller } = require("../Middlewares/auth.middleware");
const {
  products,
  getProductsByCategory,
  myProducts,
  addProduct,
  updateStock,
} = require("../Controllers/product.controller");

productRouter.get("/products", products);
productRouter.get("/products/:category", getProductsByCategory);
productRouter.get("/myProducts", isAuth, isSeller, myProducts);
productRouter.post("/addProduct", isAuth, isSeller, addProduct);
productRouter.put("/updateStock/:id", isAuth, isSeller, updateStock);

module.exports = productRouter;
