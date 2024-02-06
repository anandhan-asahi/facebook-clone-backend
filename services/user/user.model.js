const { Schema, model } = require("mongoose");

const UsersSchema = new Schema({
	firstName: { type: String, maxlength: 50 },
	lastName: { type: String, maxlength: 50 },
	phone: { type: String },
	email: { type: String },
	password: { type: String },
	isVisible: { type: Boolean },
	deleted: { type: Boolean },
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
const User = model("User", UsersSchema);

module.exports = User;
