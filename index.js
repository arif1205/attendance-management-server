const express = require("express");
const connectDB = require("./db");
const authenticate = require("./middleware/authenticate");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(routes);

app.get("/", (_req, res) => {
	res.send("Thank your for your request");
});

/**
 * @returns global error
 */
app.use((err, _req, res, _next) => {
	console.log(err);
	const msg = err.message || "Server error occured";
	res.status(err.status || 500).json({ message: msg });
});

// Database connect function
connectDB("mongodb://localhost:27017/attendance-db")
	.then(() => {
		console.log("Database connected");
		// app.listen(port, hostname, backlogs)
		app.listen(4000, () => {
			console.log("Server is running on port 4000");
		});
	})
	.catch((e) => {
		console.log(e);
	});
