const initialState = [];

export const usersReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'GET_USERS':
			return [...payload];
		default:
			return state;
	}
};
