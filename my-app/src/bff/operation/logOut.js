import { session } from '../session';
export const logOut = async (user) => {
	session.removeHash(user);
	sessionStorage.removeItem('hash');
};
