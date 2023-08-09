import { createSlice } from '@reduxjs/toolkit';

const userPreRegistration = createSlice({
	name: 'preRegistration',
	initialState: {
		loading: false,
		success: null,
		email:'',
		emailExist: false,
		userPreRegister: null,
		allPreRegisters: []
	},
	reducers: {
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
		resetEmailVarification: (state, action ) => {
			state.emailExist = false;
			state.email = '';
			state.userPreRegister = null;
			state.success = null;
			state.loading = false;
		},
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
		

		getAllPreRegisterStart: (state, action) => {
			state.loading = true;
		},
		getAllPreRegisterSuccess: (state, action) => {
			state.loading = false;
			state.allPreRegisters = action.payload.data.data;
		},
		getAllPreRegisterFailure: (state, action) => {
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
	getAllPreRegisterFailure
} = userPreRegistration.actions;
export default userPreRegistration.reducer;