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
			state.loading = true;
            state.users = users;
		},
		getAllUsersFailure: (state) => {
			state.loading = true;
		},
	},
});

export const {
	getAllUsersStart,
	getAllUsersSucSuccess,
	getAllUsersFailure,
} = usersSlice.actions;
export default usersSlice.reducer;