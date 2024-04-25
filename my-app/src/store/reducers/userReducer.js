import { ROLE } from '../../constants';

const initialState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SET_USER':
			return { ...state, ...payload };
		case 'LOG_OUT_USER':
			return { ...state, ...initialState };
		default:
			return state;
	}
};
