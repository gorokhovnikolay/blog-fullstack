import PropTypes from 'prop-types';
import styled from 'styled-components';

const CheckAccessContainer = ({ access, children }) => {
	return access ? (
		children
	) : (
		<div>
			<h2>Ошибка</h2>
			<div>Доступ запрещен</div>
		</div>
	);
};

export const CheckAccess = styled(CheckAccessContainer)``;

CheckAccessContainer.propTypes = {
	access: PropTypes.bool,
	children: PropTypes.node,
};
