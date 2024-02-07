const express = require("express");
const {
	createFollowRequest,
	unFollowRequest,
} = require("./follow-request.controllers");

const followRequestRouter = express.Router();

followRequestRouter.post("/api/v1/follow-request", createFollowRequest);
followRequestRouter.put("/api/v1/unfollow-request", unFollowRequest);

module.exports = followRequestRouter;
