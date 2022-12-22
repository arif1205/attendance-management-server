const { registerService, loginService } = require("../service/auth");

/**
 * Req, res will handle by controllers
 */

const registerController = async (req, res, next) => {
	const { name, email, password, roles, accountStatus } = req.body;
	// simple validation
	if (!name || !email || !password) {
		return res.status(400).json({ message: "Invalid data" });
	}

	try {
		const user = await registerService({ name, email, password });
		res.status(201).json({ message: "User registered successfully.", user });
	} catch (err) {
		next(err);
	}
};

const loginController = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const token = await loginService({ email, password });
		res.status(200).json({ message: "Login successfully", token });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	registerController,
	loginController,
};
