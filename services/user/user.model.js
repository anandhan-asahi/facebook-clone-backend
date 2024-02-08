const { Schema, model } = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const UsersSchema = new Schema({
	firstName: { type: String, maxlength: 50, required: true },
	lastName: { type: String, maxlength: 50 },
	phone: { type: String },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	isPrivate: { type: Boolean, default: false },
	deleted: { type: Boolean },
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

UsersSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTSECRETKEY, {
		expiresIn: "24h",
	});
	return token;
};

const User = model("User", UsersSchema);

const validate = (user) => {
	const schema = Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		phone: Joi.string(),
		isPrivate: Joi.boolean(),
	});
	return schema.validate(user);
};

module.exports = { User, validate };
