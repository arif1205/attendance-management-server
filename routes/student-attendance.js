const studentAttendanceController = require("../controller/studentAttendance");

const router = require("express").Router();

router.get("/status", studentAttendanceController.getAttendanceStatus);
router.get("/:id", studentAttendanceController.getAttendance);

module.exports = router;
