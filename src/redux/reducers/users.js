import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
	name: 'users',
	initialState: {
		loading: false,
		users: [],
		students: [],
		userSelected: {},
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
		getAllStudentsStart: (state) => {
			state.loading = true;
		},
		getAllStudentsSucSuccess: (state, { payload: { students } }) => {
			state.loading = false;
            state.students = students;
		},
		getAllStudentsFailure: (state) => {
			state.loading = false;
		},
		getAllUserByIdStart: (state) => {
			state.loading = true;
		},
		getAllUserByIdSucSuccess: (state, { payload: { user } }) => {
			state.loading = false;
            state.userSelected = user;
		},
		getAllUserByIdFailure: (state) => {
			state.loading = false;
		},
	},
});

export const {
	getAllUsersStart,
	getAllUsersSucSuccess,
	getAllUsersFailure,
	getAllStudentsStart,
	getAllStudentsSucSuccess,
	getAllStudentsFailure,
	getAllUserByIdStart,
	getAllUserByIdSucSuccess,
	getAllUserByIdFailure,
} = usersSlice.actions;
export default usersSlice.reducer;