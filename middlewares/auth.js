const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
	const token = req.headers["authorization"];

	if (!token) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized user",
		});
	}

	jwt.verify(
		token,
		"lvBwD84XsPdpi_MaJzZwko7kWhYoL6J1pToIy8f2s5IfngUSbmTwXrr5RsB6ps984L_8qhZrPxBUhwcmVPf4ew",
		(err, user) => {
			if (err) {
				if (err.name === "TokenExpiredError") {
					return res
						.status(401)
						.json({ success: false, error: "Token expired" });
				}
				return res
					.status(403)
					.json({ success: false, error: "Forbidden" });
			}
			req.user = user;
			next();
		}
	);
};

module.exports = authenticateToken;
