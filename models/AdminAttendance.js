const { Schema, model } = require("mongoose");

const adminAttendanceSchema = new Schema(
	{
		timeLimit: {
			type: Number,
			required: true,
			max: 30,
			min: 5,
			default: 5,
		},
		status: {
			type: String,
			required: true,
			enum: {
				values: ["RUNNING", "COMPLETED"],
				message: "{VALUE} is not valid",
			},
			default: "RUNNING",
		},
	},
	{ timestamps: true }
);

const adminAttendance = model("AdminAttendance", adminAttendanceSchema);
module.exports = adminAttendance;
