const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "User" },
	description: { type: String },
	deleted: { type: Boolean, default: false },
	imageUrl: { type: String },
	likeCount: { type: Number },
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const PostModel = model("Post", PostSchema);

module.exports = PostModel;
