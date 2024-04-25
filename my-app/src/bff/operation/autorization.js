import { getUser } from '../api';

export const autorization = async (authLogin, authPassword) => {
	const user = await getUser(authLogin);

	if (!user) {
		return {
			error: 'Такого логина не существует',
			res: null,
		};
	}
	if (user.password !== authPassword) {
		return {
			error: 'Пароль введен некорректно',
			res: null,
		};
	}

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
