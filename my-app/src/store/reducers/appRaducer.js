const initialState = {
	reset: false,
	modal: {
		text: '',
		isOpen: false,
		onComfirm: () => {},
		onCancel: () => {},
	},
};

export const appReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'LOG_OUT_USER':
			return { ...state, reset: !state.reset };
		case 'RESET':
			return { ...state, reset: !state.reset };
		case 'OPEN_MODAL':
			return {
				...state,
				modal: {
					...state.modal,
					text: payload.text,
					isOpen: !state.modal.isOpen,
					onComfirm: payload.onComfirm,
					onCancel: payload.onCancel,
				},
			};
		case 'CLOSED_MODAL':
			return initialState;
		default:
			return state;
	}
};
