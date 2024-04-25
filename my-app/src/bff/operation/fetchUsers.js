import { getUsers } from '../api';
import { ROLE } from '../constants/role';
import { session } from '../session';

export const fetchUsers = async (user) => {
	try {
		const accessRoles = [ROLE.ADMIN];
		if (!session.checkAccess(user, accessRoles)) {
			return {
				error: 'Доступ запрещен',
				res: null,
			};
		}
		const users = await getUsers();
		return {
			error: null,
			res: users,
		};
	} catch (error) {
		console.log(error);
	}
};
