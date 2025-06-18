const express = require("express");
require("dotenv").config();

// importing routes
const authRouter = require("./Routes/auth.route");

const app = express();
const port = process.env.PORT || 3000;

// database connection
const connectDB = require("./Config/database");
connectDB();

// middlewares
app.use(express.json());
app.use("/api/auth", authRouter);

// default route
app.get("/", (req, res) => {
  res.send("Server is running.");
});

// listening
app.listen(port, () => {
  console.log(`server is running at port http://localhost:${port}`);
});
