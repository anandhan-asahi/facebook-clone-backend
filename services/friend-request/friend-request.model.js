const { Schema, model } = require("mongoose");

const FriendRequestSchema = new Schema({
	senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
	receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
	status: {
		type: String,
		enum: ["pending", "accepted", "rejected"],
		default: "pending",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const FriendRequestModel = model("FriendRequest", FriendRequestSchema);

module.exports = FriendRequestModel;
