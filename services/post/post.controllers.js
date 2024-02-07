const Post = require("./post.model");
const PostLike = require("../post-like/post-like.model");
const PostComment = require("../post-comment/post-comment.model");
const mongoose = require("mongoose");
const cloudinary = require("../../utils/cloudinary");
const {
	INVALID_ID,
	IMAGE_NOT_FOUND,
	POST_NOT_FOUND,
	POST_DELETED_SUCCESS,
} = require("../../utils/constants");

const createPost = async (req, res) => {
	try {
		const postData = { ...req.body, userId: req.user._id };
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
				message: INVALID_ID,
			});
		}

		const updatedPost = await Post.findByIdAndUpdate(postId, postData, {
			new: true,
		});

		if (!updatedPost) {
			return res.status(404).json({
				success: false,
				message: POST_NOT_FOUND,
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
		if (!req.file) {
			return res
				.status(400)
				.json({ success: false, message: IMAGE_NOT_FOUND });
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
				message: INVALID_ID,
			});
		}
		const [existingPost, likeCount, comments] = await Promise.all([
			Post.findById(postId),
			PostLike.countDocuments({ postId }),
			PostComment.find({ postId })
				.select("_id description createdAt")
				.populate({
					path: "userId",
					select: "firstName lastName",
				}),
		]);

		if (!existingPost) {
			return res.status(404).json({
				success: false,
				message: POST_NOT_FOUND,
			});
		}

		const postData = {
			_id: existingPost._id,
			userId: existingPost.userId,
			description: existingPost.description,
			...(existingPost.imageUrl && { imageUrl: existingPost.imageUrl }),
			likeCount,
			comments,
		};

		res.status(200).json({
			success: true,
			data: postData,
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
				message: INVALID_ID,
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
				message: POST_NOT_FOUND,
			});
		}

		res.status(200).json({
			success: true,
			message: POST_DELETED_SUCCESS,
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
