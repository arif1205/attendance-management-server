// - First Name - Last Name - Phone no - Profile picture - UserId
const { model, Schema } = require("mongoose");

const profileSchema = new Schema({
	fname: { type: String, required: [true, "Your must enter your first name"] },
	lname: { type: String, required: [true, "Your must enter your last name"] },
	phone: {
		type: String,
		validate: {
			validator: function (v) {
				return /^(01)(3|4|5|6|7|8|9)\d{8}$/.test(v);
			},
			message: "Please enter a valid phone number of 11 digits.",
		},
	},
	avatar: [String],
	bio: {
		type: String,
		required: false,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;
