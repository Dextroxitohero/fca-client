import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
		roles: null,
		isAuthenticated: false,
		accessToken: null,
		persist: true,
		loading: false,
	},
	reducers: {
		loginStart: (state) => {
			state.loading = true;
		},
		loginSuccess: (state, { payload: { user, accessToken, roles } }) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.user = user;
			state.roles = roles;
			state.accessToken = accessToken;
		},
		refreshTokenSuccess: (state, { payload: { user, accessToken, roles } }) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.user = user;
			state.roles = roles;
			state.accessToken = accessToken;
		},
		loginFailure: (state, action) => {
			state.loading = false;
		},
		logout: (state, action) => {
			state.user = null;
			state.roles = null;
			state.loading = false;
			state.isAuthenticated = false;
		},
	},
});

export const {
	loginStart,
	loginSuccess,
	refreshTokenSuccess,
	loginFailure,
	logout
} = userSlice.actions;
export default userSlice.reducer;