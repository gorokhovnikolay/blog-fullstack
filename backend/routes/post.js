const express = require("express");
const mapPost = require("../helpers/map.post");
const autenticated = require("../midllewares/isAutenticated");
const hasRole = require("../midllewares/hasRole");
const ROLE = require("../constants/role");
const {
	createPost,
	readPosts,
	readPost,
	deletePost,
	updatePost,
} = require("../controllers/post");
const { createComment, deleteComment } = require("../controllers/comment");
const mapComment = require("../helpers/map.comment");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
	try {
		const { posts, lastPage } = await readPosts(
			req.query.search,
			req.query.limit,
			req.query.page
		);
		res.send({
			error: null,
			data: {
				lastPage,
				posts: posts.map(mapPost),
			},
		});
	} catch (e) {
		res.send({ error: e.message, post: null });
	}
});
router.get("/:id", async (req, res) => {
	try {
		const post = await readPost(req.params.id);
		res.send({ error: null, post: mapPost(post) });
	} catch (e) {
		res.send({ error: e.message, post: null });
	}
});

router.delete(
	"/:postId/comments/:commentId",
	autenticated,
	hasRole([ROLE.ADMIN, ROLE.MODERATOR]),
	async (req, res) => {
		try {
			await deleteComment(req.params.postId, req.params.commentId);
			res.send({ error: null, message: "коментарий удален" });
		} catch (e) {
			res.send({ error: e.message });
		}
	}
);

router.post("/:id/comments", autenticated, async (req, res) => {
	const newComment = {
		title: req.body.title,
		author: req.user.id,
	};
	try {
		const comment = await createComment(req.params.id, newComment);
		res.send({ error: null, comment: mapComment(comment) });
	} catch (e) {
		res.send({ error: e.message });
	}
});

router.post("/", autenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const post = await createPost(req.body);
		res.send({ error: null, post: mapPost(post) });
	} catch (e) {
		res.send({ error: e.message, post: null });
	}
});

router.delete("/:id", autenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		await deletePost(req.params.id);
		res.send({ error: null, message: "Пост удален" });
	} catch (e) {
		res.send({ error: e.message, post: null });
	}
});

router.patch("/:id", autenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const post = await updatePost(req.params.id, req.body);
		res.send({ error: null, post: mapPost(post) });
	} catch (e) {
		res.send({ error: e.message, post: null });
	}
});

module.exports = router;
