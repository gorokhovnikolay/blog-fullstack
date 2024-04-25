import { request } from '../../utils/request';

export const logOutUser = (user) => {
	request('/logout', 'POST');
	return { type: 'LOG_OUT_USER' };
};
