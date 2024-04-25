import { getRandomDate } from '../utils';

export const addUser = (login, password) =>
	fetch('http://localhost:3003/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json:charset=utf-8',
		},
		body: JSON.stringify({
			login,
			password,
			role_id: 2,
			registred_at: getRandomDate(),
		}),
	}).then((data) => data.json());
