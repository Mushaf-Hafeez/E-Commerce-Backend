const express = require("express");
const cookieParser = require("cookie-parser");
const expressFileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config();

// importing routes
const authRouter = require("./Routes/auth.route");
const productRouter = require("./Routes/product.route");
const profileRouter = require("./Routes/profile.route");
const addToCartRouter = require("./Routes/addToCart.route");
const orderRouter = require("./Routes/order.route");
const webhookRouter = require("./Routes/webhook.route");

const app = express();
const port = process.env.PORT || 3000;

// database connection
const connectDB = require("./Config/database");
connectDB();

// clodudinary connection
const connectCloudinary = require("./Config/cloudinary");
connectCloudinary();

// webhook
app.use("/api", webhookRouter);

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  expressFileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/profile", profileRouter);
app.use("/api/addToCart", addToCartRouter);
app.use("/api/order", orderRouter);

// default route
app.get("/", (req, res) => {
  res.send("Server is running.");
});

// listening
app.listen(port, () => {
  console.log(`server is running at port http://localhost:${port}`);
});

module.exports = app;
