const User = require("../models/User");
const userService = require("../service/user");
const authService = require("../service/auth");
const error = require("../utils/errors");

const getUserById = async (req, res, next) => {
	const id = req.params.id;
	try {
		const user = await userService.findUserByProperty("_id", id);
		if (!user) throw new error("User not found", 404);
		return res.status(200).json({ message: "User find successfully", user });
	} catch (e) {
		next(e);
	}
};

const getUserByEmail = (req, res) => {};

const getUser = async (_req, res) => {
	/**
	 * TODO: filter, sort, pagination, select
	 */
	try {
		const users = await userService.getUsers();
		res.status(200).json({ message: "Successfully get all users", users });
	} catch (e) {
		next(e);
	}
};

const postUser = async (req, res, next) => {
	const { name, email, password, roles, accountStatus } = req.body;

	try {
		const user = await authService.register({
			name,
			email,
			password,
			roles: roles ? roles : ["Student"],
			accountStatus: accountStatus ? accountStatus : "Pending",
		});

		delete user._doc.password;

		res.status(201).json({ message: "User created successfully", user });
	} catch (error) {
		next(error);
	}
};

// update total user
const putUserById = async (req, res, next) => {
	const id = req.params.id;
	const { name, roles, accountStatus } = req.body;
	try {
		const user = await userService.updateUser(id, {
			name,
			roles,
			accountStatus,
		});
		if (!user) throw error("User not found", 404);

		res.status(201).json({ message: "User updated", user });
	} catch (error) {
		next(error);
	}
};

const patchUserById = async (req, res, next) => {
	const id = req.params.id;
	const { name, roles, accountStatus } = req.body;

	try {
		const user = await userService.findUserByProperty("_id", id);
		if (!user) throw error("User not found", 404);

		// ?? null specified operator
		user.name = name ?? user.name;
		user.roles = roles ?? user.roles;
		user.accountStatus = accountStatus ?? user.accountStatus;

		await user.save();
		return res.status(200).json({ message: "User updated successfully", user });
	} catch (error) {
		next(error);
	}
};

const deleteUserById = async (req, res) => {
	const id = req.params.id;
	try {
		const user = await userService.findUserByProperty("_id", id);
		if (!user) throw new error("User not found", 404);

		await user.remove();
		res.status(203).json({ message: "User Deleted Successfully" });
	} catch (error) {}
};

module.exports = {
	getUserById,
	putUserById,
	deleteUserById,
	getUserByEmail,
	getUser,
	postUser,
	patchUserById,
};
