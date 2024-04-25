const mongoose = require("mongoose");
const mapComment = require("./map.comment");

module.exports = function (post) {
	return {
		id: post.id,
		imageUrl: post.image,
		title: post.title,
		publishedAt: post.createdAt,
		content: post.content,
		comments: post.comments.map((comment) =>
			mongoose.isObjectIdOrHexString(comment)
				? comment
				: mapComment(comment)
		),
	};
};
