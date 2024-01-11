import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
	name: 'users',
	initialState: {
		loading: false,
		users: [],
	},
	reducers: {
		getAllUsersStart: (state) => {
			state.loading = true;
		},
		getAllUsersSucSuccess: (state, { payload: { users } }) => {
			state.loading = false;
            state.users = users;
		},
		getAllUsersFailure: (state) => {
			state.loading = false;
		},
	},
});

export const {
	getAllUsersStart,
	getAllUsersSucSuccess,
	getAllUsersFailure,
} = usersSlice.actions;
export default usersSlice.reducer;