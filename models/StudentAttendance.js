const { Schema, model } = require("mongoose");

const studentAttendanceSchema = new Schema({
	createdAt: { type: Date, default: Date.now },
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	adminAttendanceId: {
		type: Schema.Types.ObjectId,
		ref: "AdminAttendance",
	},
});

const studentAttendance = model("studentAttendance", studentAttendanceSchema);
module.exports = studentAttendance;
