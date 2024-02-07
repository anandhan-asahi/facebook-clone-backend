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

const updatePost = async (req, res) => {
	try {
		const postId = req.params.id;
		const postData = req.body;

		if (!mongoose.Types.ObjectId.isValid(postId)) {
			return res.status(400).json({
				success: false,
				message: "Invalid post ID",
				error: "Invalid post ID",
			});
		}

		const updatedPost = await Post.findByIdAndUpdate(postId, postData, {
			new: true,
		});

		if (!updatedPost) {
			return res.status(404).json({
				success: false,
				message: "Post not found",
				error: "Post not found",
			});
		}

		res.status(200).json({
			success: true,
			data: updatedPost,
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

const getPost = async (req, res) => {
	try {
		const postId = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(postId)) {
			return res.status(400).json({
				success: false,
				message: "Invalid post ID",
				error: "Invalid post ID",
			});
		}

		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({
				success: false,
				message: "Post not found",
				error: "Post not found",
			});
		}

		res.status(200).json({
			success: true,
			data: post,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

const deletePost = async (req, res) => {
	try {
		const postId = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(postId)) {
			return res.status(400).json({
				success: false,
				message: "Invalid post ID",
				error: "Invalid post ID",
			});
		}
		const deletedPost = await Post.findByIdAndUpdate(
			postId,
			{ $set: { deleted: true } },
			{
				new: true,
			}
		);

		if (!deletedPost) {
			return res.status(404).json({
				success: false,
				message: "Post not found",
				error: "Post not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Post deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

module.exports = { createPost, uploadImage, updatePost, getPost, deletePost };
