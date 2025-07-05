const express = require("express");
const webhookRouter = express.Router();

const { webhook } = require("../Controllers/webhook.controller");

webhookRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhook
);

module.exports = webhookRouter;
