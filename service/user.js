const User = require("../models/User");
const bcrypt = require("bcryptjs");
/**
 * Work with database service with user model
 */

const getUsers = () => {
	return User.find();
};

const findUserByProperty = (key, value) => {
	if (key === "_id") return User.findById(value);
	return User.findOne({ [key]: value });
};

const createNewUser = async ({
	name,
	email,
	password,
	roles,
	accountStatus,
}) => {
	const user = new User({
		name,
		email,
		password,
		roles: roles ? roles : ["Student"],
		accountStatus: accountStatus ? accountStatus : "Pending",
	});

	return user.save();
};

const updateUser = (id, doc) => {
	return User.findByIdAndUpdate(id, { ...doc }, { new: true });
};

module.exports = {
	findUserByProperty,
	createNewUser,
	getUsers,
	updateUser,
};
