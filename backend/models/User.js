const mongoose = require("mongoose");
const role = require("../constants/role");

const UserShema = mongoose.Schema(
	{
		login: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: Number,
			default: role.USER,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserShema);

module.exports = User;
