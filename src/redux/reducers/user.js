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
		refreshTokenStart: (state) => {
			state.loading = true;
			state.isAuthenticated = false;
			state.user = null;
			state.roles = null;
			state.accessToken = null;
		},
		refreshTokenSuccess: (state, { payload: { user, accessToken, roles } }) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.user = user;
			state.roles = roles;
			state.accessToken = accessToken;
		},
		loginFailure: (state) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.user = null;
			state.roles = null;
			state.accessToken = null;
		},
		logout: (state) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.user = null;
			state.roles = null;
			state.accessToken = null;
		},
	},
});

export const {
	loginStart,
	loginSuccess,
	refreshTokenStart,
	refreshTokenSuccess,
	loginFailure,
	logout
} = userSlice.actions;
export default userSlice.reducer;