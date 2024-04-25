import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconContainer = ({ className, id, ...params }) => {
	return (
		<div className={className} {...params}>
			<i className={`fa ${id}`} aria-hidden="true"></i>
		</div>
	);
};

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};
`;

IconContainer.propTypes = {
	id: PropTypes.string,
};
