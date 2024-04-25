const Post = require("../models/Post");

// create post

async function createPost(post) {
	const newPost = await Post.create(post);
	await newPost.populate({
		path: "comments",
		populate: "author",
	});
	return newPost;
}

// read post
async function readPost(id) {
	return Post.findById(id).populate({
		path: "comments",
		populate: "author",
	});
}

// read posts + search + pagination

async function readPosts(search = "", limit = 10, page = 1) {
	const [posts, count] = await Promise.all([
		await Post.find({ title: { $regex: search, $options: "i" } })
			.limit(limit)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 }),
		await Post.countDocuments({ title: { $regex: search, $options: "i" } }),
	]);
	return { posts, lastPage: Math.ceil(count / limit) };
}

// update post

async function updatePost(id, post) {
	const newPost = await Post.findByIdAndUpdate(id, post, {
		returnDocument: "after",
	});
	await newPost.populate({
		path: "comments",
		populate: "author",
	});
	return newPost;
}

// delete post
function deletePost(id) {
	return Post.deleteOne({ _id: id });
}

module.exports = {
	createPost,
	readPost,
	readPosts,
	updatePost,
	deletePost,
};
