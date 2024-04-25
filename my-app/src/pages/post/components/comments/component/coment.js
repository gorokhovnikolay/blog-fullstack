import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '../../../../../components';
import { useServerRequest } from '../../../../../hooks/useServerRequest';
import { deleteCommentAsynk } from '../../../../../store/actions';
import { useDispatch } from 'react-redux';
import { ROLE } from '../../../../../constants';
import { useSelector } from 'react-redux';
import { checkAccess } from '../../../../../utils';

const CommentContainer = ({ className, comment, postId }) => {
	const { id, title, autor } = comment;
	const dispatch = useDispatch();

	const roleId = useSelector(({ user }) => user.roleId);
	const isDeleteComment = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], roleId);

	const deleteComment = (id) => {
		dispatch({
			type: 'OPEN_MODAL',
			payload: {
				text: 'Удалить комментарий???',
				onComfirm: () => {
					dispatch(deleteCommentAsynk(postId, id));
					dispatch({ type: 'CLOSED_MODAL' });
				},
				onCancel: () => dispatch({ type: 'CLOSED_MODAL' }),
			},
		});
	};

	return (
		<div className={className}>
			<div className="comment-container">
				<div className="comment-header">
					<div>
						<Icon
							id={'fa-user-circle-o'}
							size={'15px'}
							margin={'0 5px 0 0'}
						/>
						{autor}
					</div>
				</div>
				<div className="comment-content">{title}</div>
			</div>
			{isDeleteComment && (
				<div onClick={() => deleteComment(id)}>
					<Icon id={'fa-trash '} margin={'0 5px'} />
				</div>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	& .comment-container {
		width: 100%;
		border: 1px solid black;
		margin: 5px 0 5px 0;
		padding: 5px;
	}
	& .comment-header {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		margin-bottom: 5px;
	}
	& .comment-content {
		text-align: justify;
	}
	& .comment-header div {
		display: flex;
		align-items: center;
	}
`;

Comment.propTypes = {
	comment: PropTypes.shape({
		id: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		autor_id: PropTypes.string.isRequired,
		publishing_comment_at: PropTypes.string.isRequired,
	}),
};
