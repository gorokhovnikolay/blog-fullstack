export const deletePost = async (postid) => {
	fetch(`http://localhost:3003/posts/${postid}`, {
		method: 'DELETE',
	}).catch((error) => console.log(error));
};
