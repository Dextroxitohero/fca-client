import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
		isAuthenticated: false,
		loading: false,
	},
	reducers: {
		loginStart: (state) => {
			state.loading = true;
		},
		loginSuccess: (state, { payload: {user} }) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.user = user;
		},
		loginFailure: (state, action) => {
			state.loading = false;
		},
		// reducer load user
		LoadUserStart: (state) => {
			state.loading = true;
		},
		LoadUserSuccess: (state, { payload: { success, user  } } ) => {
			state.isAuthenticated = success;
			state.loading = false;
			state.user = user;
		},
		LoadUserFail: (state, action) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.user = null;
		},
		logout: (state, action) => {
			state.user = null;
			state.loading = false;
			state.isAuthenticated = false;
		},
	},
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	LoadUserStart,
	LoadUserSuccess,
	LoadUserFail,
	logout
} = userSlice.actions;
export default userSlice.reducer;