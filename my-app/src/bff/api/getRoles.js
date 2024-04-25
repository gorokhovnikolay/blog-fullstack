export const getRoles = async () => {
	const roles = await fetch('http://localhost:3003/roles').then((data) => data.json());

	return roles;
};
