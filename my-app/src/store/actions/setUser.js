import { session } from '../../bff/session';

export const setUser = (user) => {
	session.addHash(user);
	sessionStorage.setItem('hash', JSON.stringify(user));
	return { type: 'SET_USER', payload: user };
};
