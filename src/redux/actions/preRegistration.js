import {
	preRegistrationStart,
	preRegistrationSuccess,
	preRegistrationFailure,
	emailVerificationStart,
	emailVerificationSuccess,
	emailVerificationFailure,
	resetEmailVarification,
	validatePaymentStart,
	validatePaymentSuccess,
	validatePaymentFailure,
	getAllPreRegisterStart,
	getAllPreRegisterSuccess,
	getAllPreRegisterFailure,
	getSelectedPreRegisterStart,
	getSelectedPreRegisterSuccess,
	getSelectedPreRegisterFailure,
} from '../reducers/preRegistration';

import axios from '../../api/axios';
import { toast } from 'react-hot-toast';

export const emailVerification = (email) => async (dispatch) => {
	try {
		dispatch(emailVerificationStart(email));
		// Realiza la llamada al servidor para email existente
		const response = await axios.get(`/preRegister/emailVerification/${email}`);

		// Verifica si la respuesta es exitosa
		dispatch(emailVerificationSuccess(response));
		if (!response.data.emailExist) {
			dispatch(resetEmailVarification())
			toast.error(response.data.message)
		}

	} catch (error) {
		dispatch(emailVerificationFailure());
		toast.error(error.response.data.message)
	}
};

export const registerPreRegitration = ({
	firstName,
	lastName,
	email,
	phone,
	dateBirth,
	location,
	education,
	language
}) => async (dispatch) => {
	try {
		
		dispatch(preRegistrationStart());

		const response = await axios.post(`/preRegister`,
			{
				firstName,
				lastName,
				email,
				phone,
				dateBirth,
				location,
				education,
				language
			});
		// Verifica si la respuesta es exitosa
		dispatch(preRegistrationSuccess(response));
		toast.success(response.data.message);

	} catch (error) {
		dispatch(preRegistrationFailure(error.response));
		toast.error(error.response.data.message)
	}
};

// payment voucher
export const validatePaymentVoucher = ({
	account,
	assessor,
	file,
	email,
	id
}) => async (dispatch) => {
	dispatch(validatePaymentStart());
	try {

		const formData = new FormData();
		formData.append('account', account);
		formData.append('assessor', assessor);
		formData.append('email', email);
		formData.append('id', id);
		formData.append('file', file);

		const response = await axios.post('/preRegister/validatePaymentVoucher', formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);

		dispatch(validatePaymentSuccess(response));

		if (response.status === 200) {
			return {
				status: response.status,
				message: response.data.message
			};
		}

	} catch (error) {
		dispatch(validatePaymentFailure());
		toast.error(error.response.data.message)
	}
};

export const getAllPreRegister = () => async (dispatch) => {
	dispatch(getAllPreRegisterStart());
	try {

		const response = await axios.get('/preRegister/allPreRegister', {
			headers: {
				'Content-Type': 'application/json'
			}
		});

		dispatch(getAllPreRegisterSuccess(response.data))

	} catch (error) {
		dispatch(getAllPreRegisterFailure());
	}
};

// Get selected pre register
export const getSelectedPreRegister = (preRegisterId) => async (dispatch) => {
	dispatch(getSelectedPreRegisterStart());
	try {

		const response = await axios.get(`/preRegister/getPreRegisterById/${preRegisterId}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		dispatch(getSelectedPreRegisterSuccess(response.data))

	} catch (error) {
		console.log(error.response.data.message)
		dispatch(getSelectedPreRegisterFailure());
	}
};


