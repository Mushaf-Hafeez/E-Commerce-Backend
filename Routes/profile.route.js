const express = require("express");
const profileRouter = express.Router();

// importing the middleware and controller function
const { isAuth } = require("../Middlewares/auth.middleware");
const { updateProfile } = require("../Controllers/profile.controller");

profileRouter.put("/updateProfile", isAuth, updateProfile);

module.exports = profileRouter;
