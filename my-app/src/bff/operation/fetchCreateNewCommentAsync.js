import { addComment } from '../api';
import { getRandomDate } from '../utils';
import { ROLE } from '../constants/role';
import { session } from '../session';

export const fetchCreateNewCommentAsync = async (user, newComment, postId) => {
	try {
		const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

		if (!session.checkAccess(user, accessRoles)) {
			return {
				error: 'Доступ запрещен',
				res: null,
			};
		}
		const constructorComment = {
			autor_id: user.login || 'guest',
			content: newComment,
			publishing_comment_at: getRandomDate(),
			post_id: postId,
		};

		const newpost = await addComment(constructorComment);
		return {
			error: null,
			res: newpost,
		};
	} catch (error) {
		console.log(error);
	}
};
