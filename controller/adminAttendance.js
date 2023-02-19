const adminAttendance = require("../models/AdminAttendance");
const error = require("../utils/errors");
const { addMinutes, isAfter } = require("date-fns");

const getEnable = async (_req, res, next) => {
	try {
		const running = await adminAttendance.findOne({ status: "RUNNING" });
		if (running) throw error("Already Running", 400);

		// default value given
		const attendance = new adminAttendance({});
		await attendance.save();
		return res.status(201).json({ message: "Success", attendance });
	} catch (error) {
		next(error);
	}
};
const getDisable = async (_req, res, next) => {
	try {
		const running = await adminAttendance.findOne({ status: "RUNNING" });
		if (!running) throw error("Not Running", 400);

		running.status = "COMPLETED";
		await running.save();

		return res.status(200).json(running);
	} catch (error) {
		next(error);
	}
};

const getStatus = async (_req, res, next) => {
	try {
		const running = await adminAttendance.findOne({ status: "RUNNING" });
		if (!running) throw error("Not Running", 400);

		const expiredLimit = addMinutes(
			new Date(running.createdAt),
			running.timeLimit
		);

		const currentTime = isAfter(new Date(), expiredLimit);
		if (currentTime) {
			running.status = "COMPLETED";
			await running.save();
		}

		return res.status(200).json(running);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getEnable,
	getDisable,
	getStatus,
};
