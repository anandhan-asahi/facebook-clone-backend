const { Schema, model } = require("mongoose");

const followRequestSchema = new Schema({
	follower_id: { type: Schema.Types.ObjectId, ref: "User" },
	following_id: { type: Schema.Types.ObjectId, ref: "User" },
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const FollowRequestModel = model("FollowRequest", followRequestSchema);

module.exports = FollowRequestModel;
