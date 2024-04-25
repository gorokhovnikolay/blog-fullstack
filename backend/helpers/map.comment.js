module.exports = function (comment) {
	return {
		title: comment.title,
		author: comment.author?.login,
		id: comment._id,
	};
};
