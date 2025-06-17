const express = require("express");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

// database connection
const connectDB = require("./Config/database");
connectDB();

// middlewares
app.use(express.json());

// default route
app.get("/", (req, res) => {
  res.send("Server is running.");
});

// listening
app.listen(port, () => {
  console.log(`server is running at port http://localhost:${port}`);
});
