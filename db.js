const mongoose = require("mongoose");

function connectDB(connectionstr) {
	return mongoose.connect(connectionstr, {
		serverSelectionTimeoutMS: 10000,
	});
}

module.exports = connectDB;
