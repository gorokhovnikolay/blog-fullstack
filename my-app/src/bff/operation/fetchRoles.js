import { getRoles } from '../api';
import { ROLE } from '../constants/role';
import { session } from '../session';

export const fetchRoles = async (user) => {
	try {
		const accessRoles = [ROLE.ADMIN];
		if (!session.checkAccess(user, accessRoles)) {
			return {
				error: 'Доступ запрещен',
				res: null,
			};
		}
		const roles = await getRoles();
		return {
			error: null,
			res: roles,
		};
	} catch (error) {
		console.log(error);
	}
};
