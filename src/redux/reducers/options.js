import { createSlice } from '@reduxjs/toolkit';

const optionsSlice = createSlice({
	name: 'options',
	initialState: {
		assessors: [],
		loading: false,
	},
	reducers: {
		optionsStart: (state) => {
			state.loading = true;
		},
		optionsSuccess: (state, { payload: { data } }) => {

			state.loading = false;
			state.assessors = data;
		},
		optionsFailure: (state, action) => {
			state.loading = false;
		},
	},
});

export const {
	optionsStart,
	optionsSuccess,
	optionsFailure,
} = optionsSlice.actions;
export default optionsSlice.reducer;