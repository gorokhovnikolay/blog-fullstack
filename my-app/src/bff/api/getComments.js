export const getComments = async (postId) => {
	const url =
		postId === undefined
			? `http://localhost:3003/comments`
			: `http://localhost:3003/comments?post_id=${postId}`;

	const comments = await fetch(url).then((data) => {
		return data.json();
	});

	return comments;
};
