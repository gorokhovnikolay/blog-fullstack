import PropTypes from 'prop-types';

export const Content = ({ children, error }) => {
	return error ? (
		<>
			<h2>Ошибка</h2>
			<div>{error}</div>
		</>
	) : (
		children
	);
};

Content.propTypes = {
	error: PropTypes.string,
	children: PropTypes.node,
};
