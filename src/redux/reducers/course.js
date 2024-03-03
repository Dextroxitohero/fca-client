import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
	name: 'course',
	initialState: {
		loading: false,
		courses: [],
		courseSelected: [],
		courseListSelected: [],
		studentsNotInCourse: [],
		messagesCourse: [],
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
			state.courseListSelected = [];
			state.messagesCourse = [];
			state.studentsNotInCourse = [];
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
		// Chat course
		getChatMessagesCourseStart: (state) => {
			state.loading = true;
		},
		getChatMessagesCourseSuccess: (state, { payload: { messages } }) => {
			state.loading = false;
			state.messagesCourse = messages;
		},
		getChatMessagesCourseFailure: (state) => {
			state.loading = false;
		},
		addChatMessagesCourseStart: (state) => {
			state.loading = true;
		},
		addChatMessagesCourseSuccess: (state, { payload: { messages } }) => {
			state.loading = false;
			state.messagesCourse = messages;
		},
		addChatMessagesCourseFailure: (state) => {
			state.loading = false;
		},
		removeChatMessagesCourseStart: (state) => {
			state.loading = true;
		},
		removeChatMessagesCourseSuccess: (state, { payload: { messages } }) => {
			state.loading = false;
			state.messagesCourse = messages;
		},
		removeChatMessagesCourseFailure: (state) => {
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
	getChatMessagesCourseStart,
	getChatMessagesCourseSuccess,
	getChatMessagesCourseFailure,
	addChatMessagesCourseStart,
	addChatMessagesCourseSuccess,
	addChatMessagesCourseFailure,
	removeChatMessagesCourseStart,
	removeChatMessagesCourseSuccess,
	removeChatMessagesCourseFailure
} = courseSlice.actions;
export default courseSlice.reducer;