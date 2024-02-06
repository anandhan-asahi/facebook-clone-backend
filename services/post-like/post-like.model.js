const { Schema, model } = require("mongoose");

const PostLikeSchema = new Schema({
	postId: { type: Schema.Types.ObjectId, ref: "Post" },
	userId: { type: Schema.Types.ObjectId, ref: "User" },
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const PostLike = model("PostLike", PostLikeSchema);

module.exports = PostLike;
