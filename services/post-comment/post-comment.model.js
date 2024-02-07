const { Schema, model } = require("mongoose");

const PostCommentSchema = new Schema({
	postId: { type: Schema.Types.ObjectId, ref: "Post" },
	userId: { type: Schema.Types.ObjectId, ref: "User" },
	description: { type: String },
	deleted: { type: Boolean, default: false },
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const PostCommentModel = model("PostComment", PostCommentSchema);

module.exports = PostCommentModel;
