import { request } from '../../utils/request';

export const deleteCommentAsynk = (postId, commentId) => (dispatch) => {
	request(`/post/${postId}/comments/${commentId}`, 'DELETE').then(({ error }) => {
		if (error) {
			return;
		}
		dispatch({ type: 'DELETE_COMMENT', payload: commentId });
	});
};
