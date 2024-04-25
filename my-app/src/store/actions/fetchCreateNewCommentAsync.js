import { request } from '../../utils/request';

export const fetchCreateNewCommentAsync = (newComment, postId) => (dispatch) => {
	request(`/post/${postId}/comments`, 'POST', { title: newComment }).then((data) => {
		dispatch({ type: 'ADD_COMMENT', payload: data.comment });
	});
};
