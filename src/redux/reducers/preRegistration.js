import { createSlice } from '@reduxjs/toolkit';

const userPreRegistration = createSlice({
	name: 'preRegistration',
	initialState: {
		loading: false,
		success: null,
		email:'',
		emailExist: false,
		userPreRegister: null,
		allPreRegisters: [],
		preRegisterSelected: []
	},
	reducers: {
		// Email verification
		emailVerificationStart: (state, action) => {
			state.loading = true;
			state.email = action.payload;
		},
		emailVerificationSuccess: (state, action) => {
			state.loading = false;
			state.emailExist = action.payload.data.emailExist;
			state.userPreRegister = action.payload.data?.userPreRegister;
		},
		emailVerificationFailure: (state, action) => {
			state.loading = false;
		},
		// Reset email
		resetEmailVarification: (state, action ) => {
			state.emailExist = false;
			state.email = '';
			state.userPreRegister = null;
			state.success = null;
			state.loading = false;
		},
		// Pre registration data
		preRegistrationStart: (state) => {
			state.loading = true;
		},
		preRegistrationSuccess: (state, action) => {
			state.loading = false;
			state.success = action.payload.data.success;
		},
		preRegistrationFailure: (state, action) => {
			state.loading = false;
			state.success = action.payload.data.success;
		},
		// Validate payment 
		validatePaymentStart: (state, action) => {
			state.loading = true;
		},
		validatePaymentSuccess: (state, action) => {
			state.loading = false;
			state.success = action.payload.data.success
		},
		validatePaymentFailure: (state, action) => {
			state.loading = false;
		},
		// Get all pre register
		getAllPreRegisterStart: (state, action) => {
			state.loading = true;
		},
		getAllPreRegisterSuccess: (state, { payload: { data } }) => {
			state.loading = false;
			state.allPreRegisters = data;
		},
		getAllPreRegisterFailure: (state, action) => {
			state.loading = false;
		},
		// User pre register selected
		getSelectedPreRegisterStart: (state, action) => {
			state.loading = true;
		},
		getSelectedPreRegisterSuccess: (state, { payload: { data } }) => {
			state.loading = false;
			state.preRegisterSelected = data;
		},
		getSelectedPreRegisterFailure: (state, action) => {
			state.loading = false;
		},
	},
});

export const {
	emailVerificationStart,
	emailVerificationSuccess,
	emailVerificationFailure,
	preRegistrationStart,
	preRegistrationSuccess,
	preRegistrationFailure,
	validatePaymentStart,
	validatePaymentSuccess,
	validatePaymentFailure,
	resetEmailVarification,
	getAllPreRegisterStart,
	getAllPreRegisterSuccess,
	getAllPreRegisterFailure,
	getSelectedPreRegisterStart,
	getSelectedPreRegisterSuccess,
	getSelectedPreRegisterFailure
} = userPreRegistration.actions;
export default userPreRegistration.reducer;