const FollowRequest = require("./follow-request.model");
const User = require("../user/user.model");
const mongoose = require("mongoose");

const createFollowRequest = async (req, res) => {
	try {
		const { followerId, followingId } = req.body;
		if (
			!mongoose.Types.ObjectId.isValid(followerId) ||
			!mongoose.Types.ObjectId.isValid(followingId)
		) {
			return res.status(400).json({
				success: false,
				message: "Invalid user ID",
				error: "Invalid user ID",
			});
		}
		const [existingFollower, existingFollowingUser] = await Promise.all([
			User.findById(followerId),
			User.findById(followingId),
		]);
		if (!existingFollower || !existingFollowingUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
				error: "User not found",
			});
		}
		const createdFollowRequest = await FollowRequest.create(req.body);
		res.status(201).json({
			success: true,
			data: createdFollowRequest,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

// const getUser = async (req, res) => {
// 	try {
// 		const _id = req.params.id;
// 		if (!mongoose.Types.ObjectId.isValid(_id)) {
// 			return res.status(400).json({
// 				success: false,
// 				message: "Invalid user ID",
// 				error: "Invalid user ID",
// 			});
// 		}
// 		const existingUser = await User.findById(_id);
// 		if (!existingUser) {
// 			return res.status(404).json({
// 				success: false,
// 				message: "User not found",
// 				error: "User not found",
// 			});
// 		}
// 		res.status(200).json({
// 			success: true,
// 			data: existingUser,
// 		});
// 	} catch (error) {
// 		res.status(500).json({
// 			success: false,
// 			message: "Internal server error",
// 			error: error.message,
// 		});
// 	}
// };

module.exports = { createFollowRequest };
