const { User, validate } = require("./user.model");
const Post = require("../post/post.model");
const FriendRequest = require("../friend-request/friend-request.model");
const FollowRequest = require("../follow-requests/follow-request.model");
const LoginDetail = require("../login-detail/login-detail.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const {
	USER_NOT_FOUND,
	INVALID_ID,
	PASSWORD_MISMATCHED,
	EMAIL_ALREADY_EXISTS,
	USER_CREATION_FAILED,
	USER_CREATION_SUCCESS,
	ACCEPTED,
} = require("../../utils/constants");

const createUser = async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(409).json({
				success: false,
				message: error.details[0].message,
			});

		const userData = req.body;
		const existingUser = await User.findOne({ email: userData.email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: EMAIL_ALREADY_EXISTS,
			});
		}

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		userData.password = await bcrypt.hash(userData.password, salt);
		const createdUser = await User.create(userData);
		if (!createUser) {
			return res.status(404).json({
				success: false,
				message: USER_CREATION_FAILED,
			});
		}
		res.status(201).json({
			success: true,
			message: USER_CREATION_SUCCESS,
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
		const userId = req.user._id;

		if (!mongoose.Types.ObjectId.isValid(_id)) {
			return res.status(400).json({
				success: false,
				message: INVALID_ID,
			});
		}
		const [
			existingUser,
			existingUserPosts,
			existingFriends1,
			existingFriends2,
			existingFollowersCount,
			existingFollowingUsersCount,
			existingFollowerData,
		] = await Promise.all([
			User.findById(_id),
			Post.find({ userId: _id, deleted: false }),
			FriendRequest.find({ senderId: _id, status: ACCEPTED }),
			FriendRequest.find({ receiverId: _id, status: ACCEPTED }),
			FollowRequest.countDocuments({ followingId: _id }),
			FollowRequest.countDocuments({ followerId: _id }),
			FollowRequest.findOne({ followerId: userId, followingId: _id }),
		]);

		if (!existingUser) {
			return res.status(404).json({
				success: false,
				message: USER_NOT_FOUND,
			});
		}
		const userData = {
			_id: existingUser._id,
			name: `${existingUser.firstName} ${existingUser.lastName}`,
			email: existingUser.email,
			followersCount: existingFollowersCount,
			followingCount: existingFollowingUsersCount,
			...(existingUser.isPrivate
				? existingFriends1.length || existingFriends2.length
					? { posts: existingUserPosts }
					: {}
				: existingFollowerData
				? { posts: existingUserPosts }
				: {}),
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

const login = async (req, res) => {
	try {
		const { error } = validateLoginRequest(req.body);
		if (error)
			return res.status(400).json({
				success: false,
				message: error.details[0].message,
			});

		const existingUser = await User.findOne({ email: req.body.email });
		if (!existingUser)
			return res.status(400).json({
				success: false,
				message: USER_NOT_FOUND,
			});

		const validPassword = await bcrypt.compare(
			req.body.password,
			existingUser.password
		);
		if (!validPassword)
			return res.status(400).json({
				success: false,
				message: PASSWORD_MISMATCHED,
			});

		const authToken = existingUser.generateAuthToken();
		await LoginDetail.findByIdAndUpdate(
			existingUser._id,
			{
				lastLogin: Date.now(),
				deviceToken: req.body?.deviceToken ? req.body?.deviceToken : "",
			},
			{
				upsert: true,
			}
		);

		res.status(200).json({
			success: true,
			data: { auth: { token: authToken } },
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

const validateLoginRequest = (user) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		deviceToken: Joi.string(),
	});
	return schema.validate(user);
};

module.exports = { createUser, getUser, login };
