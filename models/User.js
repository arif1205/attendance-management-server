// - Name - Email - Password - Roles - AccountStatus
const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

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
		validate: {
			validator: function (v) {
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
					v
				);
			},
			message:
				"Your password must contain Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
		},
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

userSchema.pre("save", async function (next) {
	// check if this is the first time or not
	if (!this.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(this.password, salt);
	this.password = hash;
	next();
});

const User = model("User", userSchema);

module.exports = User;
