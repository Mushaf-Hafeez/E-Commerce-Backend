const express = require("express");
const webhookRouter = express.Router();

const { webhook } = require("../Controllers/webhook.controller");

webhookRouter.post("/", webhook);

module.exports = webhookRouter;
