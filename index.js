const express = require("express");
const cookieParser = require("cookie-parser");
const expressFileUpload = require("express-fileupload");
require("dotenv").config();

// importing routes
const authRouter = require("./Routes/auth.route");
const productRouter = require("./Routes/product.route");

const app = express();
const port = process.env.PORT || 3000;

// database connection
const connectDB = require("./Config/database");
connectDB();

// clodudinary connection
const connectCloudinary = require("./Config/cloudinary");
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  expressFileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

// default route
app.get("/", (req, res) => {
  res.send("Server is running.");
});

// listening
app.listen(port, () => {
  console.log(`server is running at port http://localhost:${port}`);
});
