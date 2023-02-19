const { Schema, model } = require("mongoose");

const studentAttendanceSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		adminAttendanceId: {
			type: Schema.Types.ObjectId,
			ref: "AdminAttendance",
			required: true,
		},
	},
	{ timestamps: true }
);

const studentAttendance = model("studentAttendance", studentAttendanceSchema);
module.exports = studentAttendance;
