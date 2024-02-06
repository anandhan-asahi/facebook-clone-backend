const Post = require("./post.model");
const mongoose = require("mongoose");
const cloudinary = require("../../utils/cloudinary");

const createPost = async (req, res) => {
	try {
		const postData = req.body;
		const createdPost = await Post.create(postData);
		if (!createdPost) {
			return res.status(404).json({
				success: false,
				message: "Post creation failed",
				error: "Unable to create post",
			});
		}
		res.status(201).json({
			success: true,
			data: createdPost,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

const uploadImage = async (req, res) => {
	try {
		console.log(req.file);
		if (!req.file) {
			return res
				.status(400)
				.json({ success: false, message: "No image uploaded" });
		}

		const result = await cloudinary.uploader.upload(req.file.path, {
			folder: "facebook-clone",
		});
		res.status(200).json({ success: true, imageUrl: result.secure_url });
	} catch (error) {
		console.error("Error uploading image:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
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

module.exports = { createPost, uploadImage };
