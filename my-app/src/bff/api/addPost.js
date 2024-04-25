import { getRandomDate } from '../utils';

export const addPost = async (newPost) => {
	return await fetch(`http://localhost:3003/posts`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({
			image_url: newPost.newImageValue,
			title: newPost.newTitleValue,
			content: newPost.newContentRef,
			publishing_at: getRandomDate(),
		}),
	}).then((data) => data.json());
};
