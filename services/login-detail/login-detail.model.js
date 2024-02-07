const { Schema, model } = require("mongoose");

const LastLoginSchema = new Schema({
	lastLogin: {
		type: Date,
	},
	userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
	deviceToken: { type: String },
});
const LastLoginModel = model("LastLogin", LastLoginSchema);

module.exports = LastLoginModel;
