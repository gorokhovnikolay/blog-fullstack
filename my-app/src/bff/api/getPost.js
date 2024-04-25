export const getPost = (postId) => {
	return fetch(`http://localhost:3003/posts/${postId}`)
		.then((data) => (data.ok ? data.json() : null))
		.catch();
};
