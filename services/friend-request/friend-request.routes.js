const express = require("express");
const {
	createFriendRequest,
	acceptFriendRequest,
	rejectFriendRequest,
} = require("./friend-request.controllers");

const friendRequestRouter = express.Router();

friendRequestRouter.post("/api/v1/friend-request", createFriendRequest);
friendRequestRouter.put(
	"/api/v1/friend-request/accept/:id",
	acceptFriendRequest
);
friendRequestRouter.put(
	"/api/v1/friend-request/reject/:id",
	rejectFriendRequest
);

module.exports = friendRequestRouter;
