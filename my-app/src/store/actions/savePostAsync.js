import { request } from '../../utils/request';

export const savePostAsync = (method, newPost) => (dispatch) => {
	const url = newPost.id ? `/post/${newPost.id}` : '/post';

	return request(url, method, newPost).then((data) => {
		dispatch({ type: 'GET_POST', payload: data.post });
		return data.post;
	});
};
