import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
	name: 'course',
	initialState: {
		loading: false,
		courses: [],
		courseSelected: [],
		courseListSelected: [],
		studentsNotInCourse: []
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
		updateCourseStart: (state) => {
			state.loading = true;
		},
		updateCourseSuccess: (state) => {
			state.loading = false;
		},
		updateCourseFailure: (state, action) => {
			state.loading = false;
		},
		getAllCoursesStart: (state) => {
			state.loading = true;
		},
		getAllCoursesSuccess: (state, { payload: { courses } }) => {
			state.loading = false;
			state.courses = courses;
		},
		getAllCoursesFailure: (state, action) => {
			state.loading = false;
		},
		getCourseByStart: (state) => {
			state.loading = true;
		},
		getCourseBySuccess: (state, { payload: { course } }) => {
			state.loading = false;
			state.courseSelected = course;
		},
		getCourseByFailure: (state, action) => {
			state.loading = false;
		},
		cleanSelectedCourse: (state, action) => {
			state.courseSelected = [];
		},
		//List students by course
		getListStudentByIdCourseStart: (state) => {
			state.loading = true;
		},
		getListStudentByIdCourseSuccess: (state, { payload: { students } }) => {
			state.loading = false;
			state.courseListSelected = students;
		},
		getListStudentsNotCourseSuccess: (state, { payload: { students } }) => {
			state.loading = false;
			state.studentsNotInCourse = students;
		},
		addStudentToCourseSuccess: (state, { payload: { students } }) => {
			state.loading = false;
			state.courseListSelected = students;
		},
		deleteStudentFromCourseSuccess: (state, { payload: { updatedStudents } }) => {
			state.loading = false;
			state.courseListSelected = updatedStudents;
		},
		getListStudentByIdCourseFailure: (state, action) => {
			state.loading = false;
		},
	},
});

export const {
    createCourseStart,
	createCourseSuccess,
    createCourseFailure,
    updateCourseStart,
	updateCourseSuccess,
    updateCourseFailure,
	getAllCoursesStart,
	getAllCoursesSuccess,
	getAllCoursesFailure,
	getCourseByStart,
	getCourseBySuccess,
	getCourseByFailure,
	cleanSelectedCourse,
	getListStudentByIdCourseStart,
	getListStudentByIdCourseSuccess,
	getListStudentsNotCourseSuccess,
	addStudentToCourseSuccess,
	deleteStudentFromCourseSuccess,
	getListStudentByIdCourseFailure,
} = courseSlice.actions;
export default courseSlice.reducer;