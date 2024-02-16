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
		dispatch(preRegistrationSuccess(response));
		return {
			status: response.status,
			message: response.data.message
		};

	} catch (error) {
		dispatch(preRegistrationFailure(error.response));
		return {
			status: error.response.data.status,
			message: error.response.data.message
		};
	}
};

// payment voucher
export const validatePaymentVoucher = ({
	account,
	coordinador,
	file,
	email,
	id
}) => async (dispatch) => {
	dispatch(validatePaymentStart());
	try {

		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', 'fca-intranet');

		const res = await axios.post('https://api.cloudinary.com/v1_1/dax0v05jz/image/upload', formData);


		if(res.status === 200){
			const response = await axios.post('/preRegister/validatePaymentVoucher', {
				account,
				coordinador,
				urlName: res.data.secure_url,
				email,
				id
			});
			dispatch(validatePaymentSuccess(response));
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

export const getAllPreRegister = ({ id, roles }) => async (dispatch) => {
	dispatch(getAllPreRegisterStart());
	try {

		const response = await axios.get(`/preRegister/allPreRegister/${id}/${roles}`,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			});

		dispatch(getAllPreRegisterSuccess(response.data))

	} catch (error) {
		dispatch(getAllPreRegisterFailure());
	}
};

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


export const validateCandidate = (payload) => async (dispatch) => {
	const { coordinador, createdBy, paymentDeadlineDate, idCourse, idPreregister } = payload;
	try {

		const response = await axios.post(`/preRegister/validateCandidate`, {
			coordinador, createdBy, paymentDeadlineDate, idCourse, idPreregister
		}, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return {
			status: response.status,
			message: response.data.message
		};
	} catch (error) {
		console.log(error)
	}
};


