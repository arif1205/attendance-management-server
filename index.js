const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.send("Thank your for your request");
});

// app.listen(port, hostname, backlogs)
app.listen(4000, () => {
	console.log("Server is running on port 4000");
});
