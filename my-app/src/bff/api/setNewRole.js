export const setNewRole = async (id, newRoleId) => {
	fetch(`http://localhost:3003/users/${id}`, {
		method: 'PATCH',
		headers: { 'Content-type': 'application/json; charset=UTF-8' },
		body: JSON.stringify({ role_id: newRoleId }),
	}).catch((e) => console.log(e));
};
