const authService = require("../service/auth");

/**
 * Req, res will handle by controllers
 */

const register = async (req, res, next) => {
	const { name, email, password, roles, accountStatus } = req.body;
	// simple validation
	if (!name || !email || !password) {
		return res.status(400).json({ message: "Invalid data" });
	}

	try {
		const user = await authService.register({ name, email, password });
		res.status(201).json({ message: "User registered successfully.", user });
	} catch (err) {
		next(err);
		console.log(err);
	}
};

const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const token = await authService.login({ email, password });
		res.status(200).json({ message: "Login successfully", token });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	register,
	login,
};
