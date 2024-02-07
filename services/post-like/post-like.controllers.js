const PostLike = require("./post-like.model");

const createPostLike = async (req, res) => {
	try {
		const postId = req.params.id;
		const { userId } = req.body;
		if (
			!mongoose.Types.ObjectId.isValid(userId) ||
			!mongoose.Types.ObjectId.isValid(postId)
		) {
			return res.status(400).json({
				success: false,
				message: "Invalid user ID",
				error: "Invalid user ID",
			});
		}
		const [existingUser, existingUserPost] = await Promise.all([
			User.findById(userId),
			Post.findById(postId),
		]);
		if (!existingUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
				error: "User not found",
			});
		} else if (!existingUserPost) {
			return res.status(404).json({
				success: false,
				message: "Post not found",
				error: "Post not found",
			});
		}
		const createdPostLike = await PostLike.create(req.body);
		res.status(201).json({
			success: true,
			data: createdPostLike,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

module.exports = { createPostLike };
