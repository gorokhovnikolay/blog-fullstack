import { setNewRole } from '../api';
import { ROLE } from '../constants/role';
import { session } from '../session';

export const fetchSetNewRole = async (user, id, newRoleId) => {
	try {
		const accessRoles = [ROLE.ADMIN];

		if (!session.checkAccess(user, accessRoles)) {
			return {
				error: 'Доступ запрещен',
				res: null,
			};
		}
		await setNewRole(id, newRoleId);

		return {
			error: null,
			res: 'Роль успешно изменена',
		};
	} catch (error) {
		console.log(error);
	}
};
