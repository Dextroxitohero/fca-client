import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		// user: null,
		// token: null,
		isAuthenticated: false,
		// loading: false,
		// error: null,
	},
	reducers: {
		loginStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		loginSuccess: (state, action) => {
			state.loading = false;
			state.isAuthenticated = true;
		},
		loginFailure: (state, action) => {
			state.loading = false;
		},
		// reducer load user
		LoadUserRequest: (state) => {
			state.loading = true;
		},
		LoadUserSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.loading = false;
			state.user = action.payload.user;
		},
		LoadUserFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.isAuthenticated = false;
		},
		logout: (state) => {
			state.isAuthenticated = false;
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
} = userSlice.actions;
export default userSlice.reducer;