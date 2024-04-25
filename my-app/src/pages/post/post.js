import { useEffect, useLayoutEffect, useState } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks/useServerRequest';
import { fetchPostAsync, fetchCreateNewCommentAsync } from '../../store/actions';
import { PostContent, Comments, PostContentEdit } from './components';
import { CheckContent, CheckAccess } from '../../components';
import { deletePostAsynk } from '../../store/actions';
import { checkAccess } from '../../utils';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ROLE } from '../../constants';

const PostContainer = ({ className }) => {
	const [isFlar, setIsFlag] = useState(true);
	const [error, setError] = useState('');
	const { postId } = useParams();
	const postEdit = useMatch('/post/:postId/edit');
	const newPost = useMatch('/post');
	const dispatch = useDispatch();
	const serverRequest = useServerRequest();
	const navigation = useNavigate();
	const roleId = useSelector(({ user }) => user.roleId);

	useLayoutEffect(() => {
		dispatch({ type: 'RESET_POST_DATA' });
	}, [dispatch, newPost]);

	useEffect(() => {
		if (newPost) {
			return;
		}
		dispatch(fetchPostAsync(postId)).then(({ error }) => setError(error));
	}, [dispatch, postId, isFlar, newPost]);

	const createNewComment = (newComment) => {
		if (newComment !== '') {
			dispatch(fetchCreateNewCommentAsync(newComment, postId, setIsFlag));
		}
	};
	const deletePost = () => {
		if (!checkAccess([ROLE.ADMIN], roleId)) {
			return;
		}
		dispatch({
			type: 'OPEN_MODAL',
			payload: {
				text: 'Удалить статью???',
				onComfirm: () => {
					dispatch(deletePostAsynk(postId)).then(() => navigation('/'));
					dispatch({ type: 'CLOSED_MODAL' });
				},
				onCancel: () => dispatch({ type: 'CLOSED_MODAL' }),
			},
		});
	};

	return (
		<div className={className}>
			{!postEdit & !newPost ? (
				<CheckContent error={error}>
					<PostContent postId={postId} deletePost={deletePost} />
					<Comments createNewComment={createNewComment} postId={postId} />
				</CheckContent>
			) : (
				<CheckContent error={error}>
					<CheckAccess access={checkAccess([ROLE.ADMIN], roleId)}>
						<PostContentEdit deletePost={deletePost} />
					</CheckAccess>
				</CheckContent>
			)}
		</div>
	);
};

export const Post = styled(PostContainer)`
	margin-top: 40px;
`;
