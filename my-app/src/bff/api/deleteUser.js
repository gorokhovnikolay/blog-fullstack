export const deleteUser = async (id) => {
	fetch(`http://localhost:3003/users/${id}`, {
		method: 'DELETE',
	}).catch((error) => console.log(error));
};
