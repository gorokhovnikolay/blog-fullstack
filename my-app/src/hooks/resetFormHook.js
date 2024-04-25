import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useStore } from 'react-redux';

export const useResetFormHook = (reset) => {
	const store = useStore();

	useEffect(() => {
		let currentState = store.getState().app.reset;

		return store.subscribe(() => {
			let prevState = store.getState().app.reset;
			if (currentState !== prevState) {
				reset();
			}
		});
	}, [reset, store]);
};

useResetFormHook.propTypes = {
	reset: PropTypes.func.isRequired,
};
