import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';

const PostContentContainer = ({ className, postId, deletePost }) => {
	const { imageUrl, title, publishingAt, content } = useSelector(({ post }) => {
		return post;
	});
	const navigation = useNavigate();
	const roleId = useSelector(({ user }) => user.roleId);
	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<div className="post-title"> {title}</div>
			<div className="post-block">
				{publishingAt}
				<div className="post-block__button">
					{isAdmin && (
						<>
							<Icon
								id={'fa-pencil-square-o'}
								margin={'0 0 0 15px;'}
								onClick={() => navigation(`/post/${postId}/edit`)}
							/>
							<Icon
								id={'fa-trash'}
								margin={'0 0 0 15px;'}
								onClick={deletePost}
							/>
						</>
					)}
				</div>
			</div>
			<div className="post-content">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 15px 15px 0;
	}
	& .post-title {
		font-size: 20px;
		font-weight: 800;
	}
	& .post-content {
		text-align: justify;
		white-space: break-spaces;
	}
	& .post-block {
		display: flex;
		margin: 15px 0 15px 0;
		justify-content: space-between;
		align-items: center;
	}
	& .post-block__button {
		display: flex;
	}
`;

PostContent.propTypes = {
	postId: PropTypes.string.isRequired,
	deletePost: PropTypes.func.isRequired,
};
