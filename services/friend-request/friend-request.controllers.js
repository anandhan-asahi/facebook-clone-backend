const FriendRequest = require("./friend-request.model");
const User = require("../user/user.model");
const mongoose = require("mongoose");
const { ACCEPTED, REJECTED } = require("../../utils/constants");

const createFriendRequest = async (req, res) => {
	try {
		const { senderId, receiverId } = req.body;
		if (
			!mongoose.Types.ObjectId.isValid(senderId) ||
			!mongoose.Types.ObjectId.isValid(receiverId)
		) {
			return res.status(400).json({
				success: false,
				message: "Invalid user ID",
				error: "Invalid user ID",
			});
		}
		const [existingSender, existingReceiver] = await Promise.all([
			User.findById(senderId),
			User.findById(receiverId),
		]);
		if (!existingSender || !existingReceiver) {
			return res.status(404).json({
				success: false,
				message: "User not found",
				error: "User not found",
			});
		}
		const createdFriendRequest = await FriendRequest.create(req.body);
		res.status(201).json({
			success: true,
			data: createdFriendRequest,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

const acceptFriendRequest = async (req, res) => {
	const requestId = req.params.id;
	try {
		const updatedRequest = await FriendRequest.findByIdAndUpdate(
			requestId,
			{ $set: { status: ACCEPTED } },
			{ new: true }
		);

		if (!updatedRequest) {
			return res.status(404).json({
				success: false,
				message: "Friend request not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Friend request status updated to approved",
			data: updatedRequest,
		});
	} catch (error) {
		console.error("Error updating friend request status:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

const rejectFriendRequest = async (req, res) => {
	const requestId = req.params.id;
	try {
		const updatedRequest = await FriendRequest.findByIdAndUpdate(
			requestId,
			{ $set: { status: REJECTED } },
			{ new: true }
		);

		if (!updatedRequest) {
			return res.status(404).json({
				success: false,
				message: "Friend request not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Friend request status updated to rejected",
			data: updatedRequest,
		});
	} catch (error) {
		console.error("Error updating friend request status:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

module.exports = {
	createFriendRequest,
	acceptFriendRequest,
	rejectFriendRequest,
};