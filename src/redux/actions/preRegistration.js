// import { useNavigate } from 'react-router-dom';
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

import axios from '../../api/axios'
import { toast } from 'react-hot-toast';

// userActions login
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

// userActions 
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
		// Realiza la llamada al servidor para autenticar al usuario y obtener la respuesta
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

		// Realizamos la llamada al servidor para validar el comprobante de pago
		const response = await axios.post('/preRegister/validatePaymentVoucher', formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);
		toast.success(response.data.message);
		dispatch(validatePaymentSuccess(response))

	} catch (error) {
		console.log(error)
		dispatch(validatePaymentFailure());
		toast.error(error.response.data.message)
	}
};

// Get all pre register
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


