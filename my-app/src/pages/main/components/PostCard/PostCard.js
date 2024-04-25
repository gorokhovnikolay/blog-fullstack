import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import styled from 'styled-components';

const PostCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	publishingAt,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className="card-footer">
					<h3>{title}</h3>
					<div className="card-info">
						<div className="card-info_calendar">
							<Icon id={'fa-calendar'} size={'15px'} margin={'0 5px 0 0'} />
							{publishingAt}
						</div>
						<div className="card-info_comment">
							<Icon
								id={'fa-comment-o'}
								size={'15px'}
								margin={'0 5px 0 0'}
							/>
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	width: 265px;
	margin: 20px;
	display: block;
	border: 1px solid black;
	& img {
		width: 100%;
	}
	& .card-footer {
		padding: 5px;
	}
	& .card-info {
		display: flex;
		justify-content: space-between;
		margin-top: 14px;
	}
	& .card-info_calendar,
	.card-info_comment {
		display: flex;
	}
	& h3 {
		margin: 0;
		text-align: left;
		font-size: 14px;
	}
`;

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	publishingAt: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
};
