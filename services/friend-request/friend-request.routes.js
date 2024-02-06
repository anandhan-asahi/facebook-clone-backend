const express = require("express");
const {
	createFriendRequest,
	acceptFriendRequest,
	rejectFriendRequest,
} = require("./friend-request.controllers");

const friendRequestRouter = express.Router();

friendRequestRouter.post("/api/friend-request", createFriendRequest);
friendRequestRouter.put("/api/friend-request/accept/:id", acceptFriendRequest);
friendRequestRouter.put("/api/friend-request/reject/:id", rejectFriendRequest);

module.exports = friendRequestRouter;
