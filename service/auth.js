const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const error = require("../utils/errors");
const userService = require("./user");

/**
 * Work with business logic, calculations and anything else
 */

const register = async ({ name, email, password, roles, accountStatus }) => {
	let user = await userService.findUserByProperty("email", email);
	if (user) {
		throw error("User already registered before", 400);
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	user = await userService.createNewUser({
		name,
		email,
		password: hash,
		roles,
		accountStatus,
	});
	// Hash user password in schema model
	delete user._doc.password;

	return user;
};

const login = async ({ email, password }) => {
	const user = await userService.findUserByProperty("email", email);
	if (!user) {
		throw error("Invalid credential", 400);
	}

	const isValidPassword = await bcrypt.compare(password, user.password);
	if (!isValidPassword) {
		throw error("Invalid credential", 400);
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
	register,
	login,
};
