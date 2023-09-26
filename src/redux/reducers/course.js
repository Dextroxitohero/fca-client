import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
	name: 'course',
	initialState: {
		loading: false,
		courses: [],
		courseSelected: []
	},
	reducers: {
		createCourseStart: (state) => {
			state.loading = true;
		},
		createCourseSuccess: (state) => {
			state.loading = false;
		},
		createCourseFailure: (state, action) => {
			state.loading = false;
		},
		getAllCoursesStart: (state) => {
			state.loading = true;
		},
		getAllCoursesSuccess: (state, { payload: {data} }) => {
			state.loading = false;
			state.courses = data;
		},
		getAllCoursesFailure: (state, action) => {
			state.loading = false;
		},
		getCourseByStart: (state) => {
			state.loading = true;
		},
		getCourseBySuccess: (state, { payload: {data} }) => {
			state.loading = false;
			state.courseSelected = data;
		},
		getCourseByFailure: (state, action) => {
			state.loading = false;
		},
	},
});

export const {
    createCourseStart,
	createCourseSuccess,
    createCourseFailure,
	getAllCoursesStart,
	getAllCoursesSuccess,
	getAllCoursesFailure,
	getCourseByStart,
	getCourseBySuccess,
	getCourseByFailure
} = courseSlice.actions;
export default courseSlice.reducer;