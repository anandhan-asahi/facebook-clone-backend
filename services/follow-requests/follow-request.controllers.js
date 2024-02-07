const FollowRequest = require("./follow-request.model");
const { User } = require("../user/user.model");
const mongoose = require("mongoose");
const {
	INVALID_ID,
	USER_NOT_FOUND,
	UNFOLLOWED_SUCCESS,
} = require("../../utils/constants");

const createFollowRequest = async (req, res) => {
	try {
		const followerId = req.user._id;
		const { followingId } = req.body;
		if (
			!mongoose.Types.ObjectId.isValid(followerId) ||
			!mongoose.Types.ObjectId.isValid(followingId)
		) {
			return res.status(400).json({
				success: false,
				message: INVALID_ID,
			});
		}
		const [existingFollower, existingFollowingUser, existingFollowRequest] =
			await Promise.all([
				User.findById(followerId),
				User.findById(followingId),
				FollowRequest.findOne({ followerId, followingId }),
			]);
		if (!existingFollower || !existingFollowingUser) {
			return res.status(404).json({
				success: false,
				message: USER_NOT_FOUND,
			});
		}
		let createdFollowRequest;
		if (!existingFollowRequest) {
			createdFollowRequest = await FollowRequest.create({
				...req.body,
				followerId,
			});
		}
		res.status(201).json({
			success: true,
			data: existingFollowRequest
				? existingFollowRequest
				: createdFollowRequest,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

const unFollowRequest = async (req, res) => {
	try {
		const followerId = req.user._id;
		const { followingId } = req.body;
		if (
			!mongoose.Types.ObjectId.isValid(followerId) ||
			!mongoose.Types.ObjectId.isValid(followingId)
		) {
			return res.status(400).json({
				success: false,
				message: INVALID_ID,
			});
		}
		const [existingFollower, existingFollowingUser] = await Promise.all([
			User.findById(followerId),
			User.findById(followingId),
		]);
		if (!existingFollower || !existingFollowingUser) {
			return res.status(404).json({
				success: false,
				message: USER_NOT_FOUND,
			});
		}
		await FollowRequest.deleteOne({ followerId, followingId });
		res.status(201).json({
			success: true,
			message: UNFOLLOWED_SUCCESS,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

module.exports = { createFollowRequest, unFollowRequest };
