/**
 * - Name
 * - Email
 * - Password
 * - Roles
 * - AccountStatus
 */
const { model, Schema } = require("mongoose");

const userSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: [true, "You must need to add a name."],
		maxlength: [
			30,
			"Please enter a name within 30 characters, you wrote {VALUE}",
		],
		minlength: [2, "Please enter a name more than 2 characters."],
	},
	email: {
		type: String,
		required: [true, "You must enter your email."],
		validate: {
			validator: function (v) {
				return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
			},
			message: "You have entered a invalid email.",
		},
	},
	password: {
		type: String,
		required: [true, "You must enter a password."],
		minlength: [6, "Your password must contain Minimum 6 characters"],
	},
	roles: {
		type: [String],
		required: [true, "Please select your roles"],
		default: ["Student"],
	},
	accountStatus: {
		type: String,
		enum: ["Pending", "Active", "Rejected"],
		default: "Pending",
	},
});

const User = model("User", userSchema);

module.exports = User;
