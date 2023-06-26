import { createSlice } from '@reduxjs/toolkit';

const userPreRegistration = createSlice({
	name: 'preRegistration',
	initialState: {
		// user: null,
		// token: null,
		// isAuthenticated: false,
		// loading: false,
		// error: null,
	},
	reducers: {
		preRegistrationStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		preRegistrationStartSuccess: (state, action) => {
			state.loading = false;
			state.isAuthenticated = true;
		},
		preRegistrationStartFailure: (state, action) => {
			state.loading = false;
		},
	},
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	LoadUserRequest,
	LoadUserSuccess,
	LoadUserFail,
	logout
} = userPreRegistration.actions;
export default userPreRegistration.reducer;