const User = require("./user.model");
const Post = require("../post/post.model");
const mongoose = require("mongoose");

const createUser = async (req, res) => {
	try {
		const userData = req.body;
		const createdUser = await User.create(userData);
		if (!createUser) {
			return res.status(404).json({
				success: false,
				message: "User creation failed",
				error: "Unable to create user",
			});
		}
		res.status(201).json({
			success: true,
			data: createdUser,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

const getUser = async (req, res) => {
	try {
		const _id = req.params.id;
		if (!mongoose.Types.ObjectId.isValid(_id)) {
			return res.status(400).json({
				success: false,
				message: "Invalid user ID",
				error: "Invalid user ID",
			});
		}
		const [existingUser, existingUserPosts] = await Promise.all([
			User.findById(_id),
			Post.find({ userId: _id, deleted: false }),
		]);
		if (!existingUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
				error: "User not found",
			});
		}
		const userData = {
			_id: existingUser._id,
			name: `${existingUser.firstName} ${existingUser.lastName}`,
			email: existingUser.email,
			...(existingUser.isVisible && { posts: existingUserPosts }),
		};
		res.status(200).json({
			success: true,
			data: userData,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

module.exports = { createUser, getUser };
