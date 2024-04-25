import { getComments, getPosts } from '../api';

export const fetchPosts = async (page, goSearchPhrase, limit) => {
	try {
		const { count, posts } = await getPosts(page, goSearchPhrase, limit);

		const comments = await getComments();

		return {
			error: null,
			res: {
				lastPage: Math.ceil(count.length / limit),
				posts: posts.map((post) => {
					const commentsCount = comments.filter((comment) => {
						return post.id === comment.post_id;
					}).length;
					return { ...post, commentsCount };
				}),
			},
		};
	} catch (error) {
		console.log(error);
	}
};
