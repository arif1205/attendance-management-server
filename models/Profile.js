// - First Name - Last Name - Phone no - Profile picture - UserId
const { model, Schema } = require("mongoose");

const profileSchema = new Schema({
	fname: String,
	lname: String,
	phone: String,
	avatar: [String],
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;
