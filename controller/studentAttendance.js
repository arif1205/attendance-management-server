const AdminAttendace = require("../models/AdminAttendance");
const studentAttendance = require("../models/StudentAttendance");
const error = require("../utils/errors");

const getAttendance = async (req, res, next) => {
	const { id } = req.params;
	try {
		/**
		 * step 1 - Find admin attendance by Id
		 * Step 2 - check if it is running or not
		 * step 3 - Check already registred or not
		 * Step 4 - Register Entry
		 */

		const adminAttendance = await AdminAttendace.findById(id);

		if (!adminAttendance) throw error("Invalid Attendance ID", 400);

		if (adminAttendance.status !== "RUNNING")
			throw error("Attendance Not Running", 404);

		let attendance = await studentAttendance.findOne({
			adminAttendance: id,
			user: req.user._id,
		});

		if (attendance) throw error("Already Registered", 400);

		attendance = new studentAttendance({
			user: req.user._id,
			adminAttendance: id,
		});

		await attendance.save();

		return res.status(201).json(attendance);
	} catch (error) {
		next(error);
	}
};

const getAttendanceStatus = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAttendance,
	getAttendanceStatus,
};
