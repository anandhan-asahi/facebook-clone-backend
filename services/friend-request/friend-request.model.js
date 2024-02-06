const { Schema, model } = require("mongoose");

const FriendRequestSchema = new Schema({
	sender_id: { type: Schema.Types.ObjectId, ref: "User" },
	receiver_id: { type: Schema.Types.ObjectId, ref: "User" },
	approved: { type: Boolean },
	approvedAt: {
		type: Date,
		default: null,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const FriendRequestModel = model("FriendRequest", FriendRequestSchema);

module.exports = FriendRequestModel;
