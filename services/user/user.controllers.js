const User = require("./user.model");

const createUser = async (req, res) => {
	try {
		const userData = req.body;
		const createdUser = await User.create(userData);
		if (!createUser) {
			return res.status(404).json({
				success: false,
				message: "User creation failed",
				error: "Unable to create user",
			});
		}
		res.status(201).json({
			success: true,
			data: createdUser,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

module.exports = { createUser };
