export const updatePost = async ({ id, newImageValue, newTitleValue, newContentRef }) =>
	fetch(`http://localhost:3003/posts/${id}`, {
		method: 'PATCH',
		headers: { 'Content-type': 'application/json; charset=UTF-8' },
		body: JSON.stringify({
			image_url: newImageValue,
			title: newTitleValue,
			content: newContentRef,
		}),
	}).then((newPost) => newPost.json());
