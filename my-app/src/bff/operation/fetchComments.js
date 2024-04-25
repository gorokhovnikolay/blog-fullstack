import { getComments } from '../api';

export const fetchComments = async (postId) => {
	try {
		const comments = await getComments(postId);
		return {
			error: null,
			res: comments,
		};
	} catch (error) {
		console.log(error);
	}
};
