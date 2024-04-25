const mongoose = require("mongoose");
const validator = require("validator");

const PostShema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
			validate: {
				validator: validator.isURL,
			},
		},
		content: {
			type: String,
			required: true,
		},
		comments: [
			{
				type: mongoose.SchemaTypes.ObjectId,
				ref: "Comment",
			},
		],
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", PostShema);

module.exports = Post;
