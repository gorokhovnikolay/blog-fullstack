export const getUser = async (login) => {
	const users = await fetch('http://localhost:3003/users').then((data) => data.json());

	return users.find((item) => {
		return item.login === login;
	});
};
