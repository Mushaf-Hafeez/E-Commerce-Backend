const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Database connected."))
    .catch((error) => {
      console.log("Database connection failed: ", error.message);
      process.exit(1);
    });
};

module.exports = connectDB;
