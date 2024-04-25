require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const routes = require("./routes");

const port = 3003;
const app = express();

app.use(express.static("../my-app/build"));

app.use(cookieParser());
app.use(express.json());

app.use("/", routes);

mongoose.connect(process.env.DB_URL_CONNECT).then(() => {
	app.listen(port, () => {
		console.log(`Server started port ${port}`);
	});
});
