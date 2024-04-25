import PropTypes from 'prop-types';
import styled from 'styled-components';

const CheckContentContainer = ({ error = 'Страница не найдена', children }) => {
	return error ? (
		<div>
			<h2>Ошибка</h2>
			<div>{error}</div>
		</div>
	) : (
		children
	);
};

export const CheckContent = styled(CheckContentContainer)``;

CheckContentContainer.propTypes = {
	error: PropTypes.string,
	children: PropTypes.node,
};
