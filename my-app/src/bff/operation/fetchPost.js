import { getPost } from '../api';

export const fetchPost = async (postId) => {
	const post = await getPost(postId);
	if (!post) {
		return {
			error: 'Страница не найдена',
			res: null,
		};
	}

	return {
		error: null,
		res: post,
	};
};
