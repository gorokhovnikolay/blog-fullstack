import { useSelector } from 'react-redux';
import { server } from '../bff';
import { useCallback } from 'react';

export const useServerRequest = () => {
	const user = useSelector(({ user }) => user);
	return useCallback(
		(operation, ...params) => {
			const request = [
				'autorization',
				'registration',
				'fetchPost',
				'fetchComments',
				'fetchPosts',
			].includes(operation)
				? params
				: [user, ...params];
			return server[operation](...request);
		},
		[user],
	);
};
