import { createSlice } from '@reduxjs/toolkit';

const optionsSlice = createSlice({
	name: 'options',
	initialState: {
		coordinadors: [],
		languages: [],
		accountsBank: [],
		colors: [],
		levels: [],
		teachers: [],
		coursesList: [],
		loading: false,
	},
	reducers: {
		optionsStart: (state) => {
			state.loading = true;
		},
		optionsCoordinadorsSuccess: (state, { payload: { data } }) => {
			state.loading = false;
			state.coordinadors = data;
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
		optionsAccountsBankSuccess: (state, { payload: { data } }) => {
			state.loading = false;
			state.accountsBank = data;
		},
		optionsCourseListSuccess: (state, { payload: { data } }) => {
			state.loading = false;
			state.coursesList = data;
		},
		optionsFailure: (state, action) => {
			state.loading = false;
		},
	},
});

export const {
	optionsStart,
	optionsCoordinadorsSuccess,
	optionsLanguagesSuccess,
	optionsColorsSuccess,
	optionsLevelsSuccess,
	optionsTeachersSuccess,
	optionsAccountsBankSuccess,
	optionsCourseListSuccess,
	optionsFailure,
} = optionsSlice.actions;
export default optionsSlice.reducer;