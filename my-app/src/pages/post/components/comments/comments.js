import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Comment, NewComment } from './component';
import { ROLE } from '../../../../constants/role';

const CommentsContainer = ({ className, createNewComment, postId }) => {
	const comments = useSelector(({ post }) => post.comments);
	const roleId = useSelector(({ user }) => user.roleId);

	return (
		<div className={className}>
			<div>Комментарии:</div>
			{roleId !== ROLE.GUEST && <NewComment createNewComment={createNewComment} />}

			<div>
				{comments.map((comment) => (
					<Comment key={comment.id} comment={comment} postId={postId} />
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	max-width: 500px;
	margin: auto;

	& .commets-send-block {
		display: flex;
		margin: 26px 0 26px 0;
		& textarea {
			width: 100%;
			min-height: 100px;
		}
	}
`;

Comments.propTypes = {
	createNewComment: PropTypes.func.isRequired,
};
