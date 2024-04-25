import { deleteUser } from '../api';
import { ROLE } from '../constants/role';
import { session } from '../session';

export const fetchDeleteUser = async (user, id) => {
	console.log(user);
	try {
		const accessRoles = [ROLE.ADMIN];

		if (!session.checkAccess(user, accessRoles)) {
			return {
				error: 'Нет прав удалять пользавателей',
				res: null,
			};
		}
		await deleteUser(id);
		return {
			error: null,
			res: 'Пользаватель удален',
		};
	} catch (error) {
		console.log(error);
	}
};
