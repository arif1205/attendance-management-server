const express = require("express");
const connectDB = require("./db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

app.post("/register", async (req, res, next) => {
	/**
	 * Request Input Sources:
	    - Req Body
			- Req Param
			- Req Query
			- Req Header
			- Req Cookies
	 */
	const { name, email, password, roles, accountStatus } = req.body;
	if (!name || !email || !password) {
		return res.status(400).json({ message: "Invalid data" });
	}

	try {
		let user = await User.findOne({ email });
		if (user)
			return res
				.status(400)
				.json({ message: "User already registered before" });

		// const salt = await bcrypt.genSalt(10);
		// const hash = await bcrypt.hash(password, salt);

		user = new User({ name, email, password });
		// user.password = hash;
		await user.save();

		res.status(201).json({ message: "User registered successfully.", user });
	} catch (err) {
		next(err);
	}
});

app.post("/login", async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Invalid credential" });
		}

		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword)
			return res.status(400).json({ message: "Invalid credential" });

		delete user._doc.password;
		res.status(200).json({ message: "Login successfully", user });
	} catch (error) {
		next(error);
	}
});

app.get("/", (_req, res) => {
	res.send("Thank your for your request");
});

app.use((err, _req, res, _next) => {
	console.log(err);
	res.status(500).json({ message: "Server error occured" });
});

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
