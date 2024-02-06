const { Schema, model } = require("mongoose");

const LastLoginSchema = new Schema({
	lastLogin: {
		type: Date,
		default: Date.now,
	},
	deviceToken: { type: String },
});
const LastLoginModel = model("LastLogin", LastLoginSchema);

module.exports = LastLoginModel;
