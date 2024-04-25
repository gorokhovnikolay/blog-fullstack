const Comment = require("../models/Comment");
const Post = require("../models/Post");

// create comment

async function createComment(postId, comment) {
	const newComment = await Comment.create(comment);

	await Post.findByIdAndUpdate(postId, {
		$push: { comments: newComment },
	}).populate({
		path: "comments",
		populate: "author",
	});
	await newComment.populate("author");
	return newComment;
}

// read comments

async function deleteComment(postId, commentId) {
	await Comment.deleteOne({ _id: commentId });

	await Post.findByIdAndUpdate(postId, {
		$pull: { comments: commentId },
	});
}

// delete comment

module.exports = {
	createComment,
	deleteComment,
};
