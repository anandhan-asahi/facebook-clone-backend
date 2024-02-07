const PostComment = require("./post-comment.model");
const Post = require("../post/post.model");
const User = require("../user/user.model");
const mongoose = require("mongoose");
const {
	INVALID_ID,
	USER_NOT_FOUND,
	POST_NOT_FOUND,
} = require("../../utils/constants");

const createPostComment = async (req, res) => {
	try {
		const postId = req.params.id;
		const userId = req.user._id;
		if (
			!mongoose.Types.ObjectId.isValid(userId) ||
			!mongoose.Types.ObjectId.isValid(postId)
		) {
			return res.status(400).json({
				success: false,
				message: INVALID_ID,
			});
		}
		const [existingUser, existingUserPost] = await Promise.all([
			User.findById(userId),
			Post.findById(postId),
		]);
		if (!existingUser) {
			return res.status(404).json({
				success: false,
				message: USER_NOT_FOUND,
			});
		} else if (!existingUserPost) {
			return res.status(404).json({
				success: false,
				message: POST_NOT_FOUND,
			});
		}
		const createdPostComment = await PostComment.create({
			...req.body,
			userId,
			postId,
		});
		res.status(201).json({
			success: true,
			data: createdPostComment,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

module.exports = { createPostComment };
