const { Schema, model } = require("mongoose");

const adminAttendanceSchema = new Schema({
	timeLimit: Number,
	status: {
		type: String,
		enum: { values: ["active", "inactive"], message: "{VALUE} is not valid" },
	},
	createdAt: { type: Date, default: Date.now },
});

const adminAttendance = model("AdminAttendance", adminAttendanceSchema);
module.exports = adminAttendance;
