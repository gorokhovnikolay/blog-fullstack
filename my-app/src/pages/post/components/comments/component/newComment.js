import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '../../../../../components';

export const NewComment = ({ createNewComment }) => {
	const [newComment, setNewComment] = useState('');

	const onAddComment = () => {
		createNewComment(newComment);
		setNewComment('');
	};

	return (
		<div className="commets-send-block">
			<textarea
				placeholder="Добавьте свой комментарий"
				value={newComment}
				onChange={({ target }) => setNewComment(target.value)}
			></textarea>
			<div onClick={onAddComment}>
				<Icon id={'fa-paper-plane-o '} margin={'0 5px'} />
			</div>
		</div>
	);
};

NewComment.propTypes = {
	createNewComment: PropTypes.func.isRequired,
};
