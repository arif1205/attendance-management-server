const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authenticate(req, res, next) {
	/**
	 * Pass jwt token with req header
	 */

	try {
		const token = req.headers.authorization;
		if (!token) return res.status(401).json({ message: "Unauthorized" });

		const decoded = jwt.verify(token.split(" ")[1], "Secret-key");
		const user = await User.findOne({ _id: decoded._id });

		if (!user) {
			return res.status(400).json({ message: "Invalid token" });
		}

		req.user = user;
		next();
	} catch (error) {
		return res.status(400).json({ message: "Invalid token" });
	}
}

module.exports = authenticate;
