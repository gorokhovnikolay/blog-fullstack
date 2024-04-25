import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Pagination, PostCard, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce } from '../../bff/utils/debounce';
import { request } from '../../utils/request';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [goSearchPhrase, setGoSearchPhrase] = useState('');

	useEffect(() => {
		request(
			`/post?search=${goSearchPhrase}&limit=${PAGINATION_LIMIT}&page=${page}`,
		).then(({ data, error }) => {
			if (error) {
				return;
			}
			setPosts(data.posts);
			setLastPage(data.lastPage);
		});
	}, [page, goSearchPhrase]);

	// const debounceFunction = useMemo(() => debounce(setGoSearchPhrase, 2000), []);
	const debounceFunction = useRef(debounce(setGoSearchPhrase, 2000)).current;

	const onChange = ({ target }) => {
		setSearchPhrase(target.value);
		debounceFunction(target.value);
	};

	return (
		<div className={className}>
			<Search onChange={onChange} searchPhrase={searchPhrase} />
			<div className="posts-container">
				{posts.map(({ id, title, imageUrl, publishedAt, comments }) => (
					<PostCard
						key={id}
						id={id}
						title={title}
						imageUrl={imageUrl}
						publishingAt={publishedAt}
						commentsCount={comments.length}
					/>
				))}
			</div>

			{lastPage > 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .posts-container {
		display: flex;
		flex-wrap: wrap;
	}
`;
