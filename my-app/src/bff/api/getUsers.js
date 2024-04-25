export const getUsers = async () => {
	const users = await fetch('http://localhost:3003/users').then((data) => data.json());

	return users;
};
