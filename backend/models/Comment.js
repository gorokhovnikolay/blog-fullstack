const mongoose = require("mongoose");
const validator = require("validator");

const CommentShema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User",
		},
		post: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Post",
		},
	},
	{ timestamp: true }
);

const Comment = mongoose.model("Comment", CommentShema);

module.exports = Comment;
