export const deleteComment = async (id) => {
	fetch(`http://localhost:3003/comments/${id}`, {
		method: 'DELETE',
	}).catch((error) => console.log(error));
};
