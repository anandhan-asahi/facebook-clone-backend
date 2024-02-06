const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
	user_id: { type: Schema.Types.ObjectId, ref: "User" },
	description: { type: String },
	deleted: { type: Boolean },
	imageUrl: { type: String },
	likeCount: { type: Number },
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const PostModel = model("Post", PostSchema);

module.exports = PostModel;
