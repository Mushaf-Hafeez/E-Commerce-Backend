const express = require("express");
const productRouter = express.Router();

const { isAuth, isSeller } = require("../Middlewares/auth.middleware");
const { addProduct } = require("../Controllers/product.controller");

productRouter.post("/addProduct", isAuth, isSeller, addProduct);

module.exports = productRouter;
