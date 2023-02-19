const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./user");
const adminAttendanceRoutes = require("../routes/admin-attendance");
const authenticate = require("../middleware/authenticate");
const studentAttendance = require("../models/StudentAttendance");

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/users", authenticate, userRoutes);
router.use("/api/v1/adminAttendance", authenticate, adminAttendanceRoutes);
router.use("/api/v1/studentAttendance", authenticate, studentAttendance);

module.exports = router;
