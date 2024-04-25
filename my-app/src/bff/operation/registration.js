import { getUser, addUser } from '../api';

export const registration = async (regLogin, regPassword) => {
	const candidatUser = await getUser(regLogin);

	if (candidatUser) {
		return {
			error: 'Такй логин занят',
			res: null,
		};
	}

	const user = await addUser(regLogin, regPassword);
	return {
		error: null,
		res: {
			id: user.id,
			login: user.login,
			roleId: user.role_id,
			session: Date.now() + Math.random().toFixed(50),
		},
	};
};
