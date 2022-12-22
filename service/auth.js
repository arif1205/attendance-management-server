const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const error = require("../utils/errors");
const { findUserByProperty, createNewUser } = require("./user");

/**
 * Work with business logic, calculations and anything else
 */

const registerService = async ({ name, email, password }) => {
	let user = await findUserByProperty("email", email);
	if (user) {
		throw error("User already registered before", 400);
		return res.status(400).json({ message: "User already registered before" });
	}

	user = await createNewUser({ name, email, password });
	// Hash user password in schema model
	delete user._doc.password;

	return user;
};

const loginService = async ({ email, password }) => {
	const user = await findUserByProperty("email", email);
	if (!user) {
		throw error("Invalid credential", 400);
		return res.status(400).json({ message: "Invalid credential" });
	}

	const isValidPassword = await bcrypt.compare(password, user.password);
	if (!isValidPassword) {
		throw error("Invalid credential", 400);
		return res.status(400).json({ message: "Invalid credential" });
	}

	delete user._doc.password;

	/**
	 * Add jWT
	 */
	const payload = {
		_id: user._id,
		name: user.name,
		email: user.email,
		roles: user.roles,
		accountStatus: user.accountStatus,
	};
	const token = jwt.sign(payload, "Secret-key", { expiresIn: "2h" });

	return token;
};

module.exports = {
	registerService,
	loginService,
};
