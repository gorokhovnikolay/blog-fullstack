export const addComment = async (newComment) => {
	return await fetch(`http://localhost:3003/comments`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(newComment),
	}).then((data) => data.json());
};
