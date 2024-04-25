import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Input } from '../../../../components';
import styled from 'styled-components';
import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sanitizeContent } from '../../utils/sanitizeContent';
import { savePostAsync } from '../../../../store/actions';

const PostContentEditContainer = ({ className, deletePost }) => {
	const { id, imageUrl, title, publishingAt, content } = useSelector(({ post }) => {
		return post;
	});

	const navigation = useNavigate();

	const [newTitleValue, setNewTitleValue] = useState(title);
	const [newImageValue, setNewImageValue] = useState(imageUrl);
	const contentRef = useRef();

	const dispatch = useDispatch();

	useLayoutEffect(() => {
		setNewTitleValue(title);
		setNewImageValue(imageUrl);
	}, [title, imageUrl]);

	const onSave = () => {
		const newContentRef = sanitizeContent(contentRef.current.innerHTML);
		dispatch(
			savePostAsync('PATCH', {
				id,
				image: newImageValue,
				title: newTitleValue,
				content: newContentRef,
			}),
		).then(({ id }) => navigation(`/post/${id}`));
	};
	const onCreate = () => {
		const newContentRef = sanitizeContent(contentRef.current.innerHTML);
		dispatch(
			savePostAsync('POST', {
				id,
				image: newImageValue,
				title: newTitleValue,
				content: newContentRef,
			}),
		).then(({ id }) => navigation(`/post/${id}`));
	};

	return (
		<div className={className}>
			<Input
				value={newImageValue}
				placeholder="URL изображения"
				onChange={({ target }) => setNewImageValue(target.value)}
			/>
			<Input
				value={newTitleValue}
				placeholder="Заголовок..."
				onChange={({ target }) => setNewTitleValue(target.value)}
			/>
			<div className="post-block">
				<div>{publishingAt}</div>
				<div className="post-block__button">
					{!publishingAt && (
						<Icon
							id={'fa-floppy-o'}
							margin={'0 0 0 15px;'}
							onClick={onCreate}
						/>
					)}
					{publishingAt && (
						<Icon
							id={'fa-floppy-o'}
							margin={'0 0 0 15px;'}
							onClick={onSave}
						/>
					)}
					{publishingAt && (
						<Icon
							id={'fa-trash'}
							margin={'0 0 0 15px;'}
							onClick={deletePost}
						/>
					)}
				</div>
			</div>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="post-content"
			>
				{content}
			</div>
		</div>
	);
};

export const PostContentEdit = styled(PostContentEditContainer)`
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
		min-height: 80px;
		border: solid 1px #a1a1a1;
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

PostContentEdit.propTypes = {
	deletePost: PropTypes.func.isRequired,
};
