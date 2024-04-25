import { deleteComment, deletePost, getComments } from '../api';
import { ROLE } from '../constants/role';
import { session } from '../session';

export const fetchDeletePost = async (user, postId) => {
	try {
		const accessRoles = [ROLE.ADMIN];

		if (!session.checkAccess(user, accessRoles)) {
			return {
				error: 'Доступ запрещен',
				res: null,
			};
		}
		await deletePost(postId);

		const comments = await getComments(postId);

		await Promise.all(comments.map(({ id }) => deleteComment(id)));

		return {
			error: null,
			res: 'Статья удалена',
		};
	} catch (error) {
		console.log(error);
	}
};
