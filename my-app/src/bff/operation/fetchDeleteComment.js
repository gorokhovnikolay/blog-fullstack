import { deleteComment } from '../api';
import { ROLE } from '../constants/role';
import { session } from '../session';

export const fetchDeleteComment = async (user, commentId) => {
	try {
		const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

		if (!session.checkAccess(user, accessRoles)) {
			return {
				error: 'Доступ запрещен',
				res: null,
			};
		}
		await deleteComment(commentId);
		return {
			error: null,
			res: 'коммент удален',
		};
	} catch (error) {
		console.log(error);
	}
};
