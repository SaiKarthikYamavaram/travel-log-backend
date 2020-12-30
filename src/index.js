/* eslint-disable linebreak-style */
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./middleware");
const logs = require("./api/logs");

const app = express();
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(morgan("common"));
app.use(helmet());
app.use(
	cors({
		// origin: process.env.CORS_ORIGIN,
	})
);
app.use(express.json());
app.get("/", (req, res) => {
	res.json({
		message: "Hello World",
	});
});
app.use("/api/logs", logs);
// Should be last middleware
app.use(middleware.notFound);

app.use(middleware.errorHandler);
const port = process.env.PORT || 1337;

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Listening at port:${port}`);
});
