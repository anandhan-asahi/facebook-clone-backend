const { Schema, model } = require("mongoose");

const FollowRequestSchema = new Schema({
	followerId: { type: Schema.Types.ObjectId, ref: "User" },
	followingId: { type: Schema.Types.ObjectId, ref: "User" },
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const FollowRequestModel = model("FollowRequest", FollowRequestSchema);

module.exports = FollowRequestModel;
