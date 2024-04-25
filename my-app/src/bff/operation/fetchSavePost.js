import { addPost, updatePost } from '../api';
import { ROLE } from '../constants/role';
import { session } from '../session';

export const fetchSavePost = async (user, newPost) => {
	try {
		const accessRoles = [ROLE.ADMIN];

		if (!session.checkAccess(user, accessRoles)) {
			return {
				error: 'Доступ запрещен',
				res: null,
			};
		}

		const post =
			newPost.id !== '' ? await updatePost(newPost) : await addPost(newPost);

		return {
			error: null,
			res: {
				id: post.id,
				title: post.title,
				content: post.content,
				imageUrl: post.image_url,
				publishedAt: post.published_at,
			},
		};
	} catch (error) {
		console.log(error);
	}
};
