const express = require("express");
const { createFollowRequest } = require("./follow-request.controllers");

const followRequestRouter = express.Router();

followRequestRouter.post("/api/follow-request", createFollowRequest);

module.exports = followRequestRouter;
