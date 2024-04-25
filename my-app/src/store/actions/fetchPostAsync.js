import { request } from '../../utils/request';

export const fetchPostAsync = (postId) => (dispatch) => {
	return request(`/post/${postId}`).then(({ error, post }) => {
		if (post) {
			const { id, content, imageUrl, publishedAt, title, comments } = post;
			dispatch({
				type: 'GET_POST',
				payload: {
					id,
					content,
					imageUrl: imageUrl,
					publishingAt: publishedAt,
					title,
					comments,
				},
			});
			return {
				post: {
					id,
					content,
					imageUrl: imageUrl,
					publishingAt: publishedAt,
					title,
					comments,
				},
				error: null,
			};
		}
		return { error, post: null };
	});
};
