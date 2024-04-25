import PropTypes from 'prop-types';
import styled from 'styled-components';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</button>
			<button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</button>
			<div className="curent-page">Страница: {page}</div>
			<button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</button>
			<button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	padding: 0 20px;
	& .curent-page,
	button {
		width: 100%;
		margin: 0 5px;
	}
`;

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
};
