const mongoose = require("mongoose");

const database = async () => {
	const username = encodeURIComponent("anand-guna");
	const password = encodeURIComponent("Asahi@123");
	try {
		const connection = await mongoose.connect(
			`mongodb+srv://${username}:${password}@cluster0.c0z4upk.mongodb.net/facebook-clone?retryWrites=true&w=majority`
		);
		console.log(`MongoDB connected at ${connection.connection.host}`);
	} catch (error) {
		console.error(`Error while connecting to mongodb : ${error}`);
	}
};

module.exports = database;
