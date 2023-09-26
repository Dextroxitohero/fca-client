import { createSlice } from '@reduxjs/toolkit';

const optionsSlice = createSlice({
	name: 'options',
	initialState: {
		assessors: [],
		languages: [],
		colors: [],
		levels: [],
		teachers: [],
		loading: false,
	},
	reducers: {
		optionsStart: (state) => {
			state.loading = true;
		},
		optionsAssessorsSuccess: (state, { payload: { data } }) => {
			state.loading = false;
			state.assessors = data;
		},
		optionsLanguagesSuccess: (state, { payload: { data } }) => {
			state.loading = false;
			state.languages = data;
		},
		optionsColorsSuccess: (state, { payload: { data } }) => {
			state.loading = false;
			state.colors = data;
		},
		optionsLevelsSuccess: (state, { payload: { data } }) => {
			state.loading = false;
			state.levels = data;
		},
		optionsTeachersSuccess: (state, { payload: { data } }) => {
			state.loading = false;
			state.teachers = data;
		},
		optionsFailure: (state, action) => {
			state.loading = false;
		},
	},
});

export const {
	optionsStart,
	optionsAssessorsSuccess,
	optionsLanguagesSuccess,
	optionsColorsSuccess,
	optionsLevelsSuccess,
	optionsTeachersSuccess,
	optionsFailure,
} = optionsSlice.actions;
export default optionsSlice.reducer;