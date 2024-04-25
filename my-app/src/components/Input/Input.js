import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import styled from 'styled-components';

const inputContainer = forwardRef(({ className, width, ...props }, ref) => {
	return <input className={className} ref={ref} {...props} />;
});

export const Input = styled(inputContainer)`
	width: ${({ width = '100%' }) => width};
	height: 32px;
	margin-bottom: 13px;
`;

inputContainer.propTypes = {
	width: PropTypes.string,
};
