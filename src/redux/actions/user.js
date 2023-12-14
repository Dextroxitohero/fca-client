import {
	loginStart,
	loginSuccess,
	refreshTokenSuccess,
	loginFailure,
	logout
} from '../reducers/user';

import axios from "axios";
import { toast } from 'react-hot-toast';

// userActions login
export const loginUser = ({ email, password }) => async (dispatch) => {
	try {
		dispatch(loginStart());

		// Realiza la llamada al servidor para autenticar al usuario y obtener la respuesta
		const response = await axios.post(`http://localhost:8000/auth/login`,
			{
				email,
				password
			},
			{
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			});
		// Verifica si la respuesta es exitosa
		if (response.status === 200) {
			localStorage.setItem('token', response.data.accessToken);
			dispatch(loginSuccess(response.data));
			toast.success("Bienvenido");
		} else {
			dispatch(logout());
			// toast.error(response.data.message)
		}
	} catch (error) {
		// En caso de error en la llamada al servidor, muestra el mensaje de error
		dispatch(loginFailure());
		toast.error('Ocurrio un error.')
	}
};

export const signUp = ({ name, apellido ,email, password }) => async (dispatch) => {
	try {

		const response = await axios.post(`http://localhost:8000/auth/signup`,
			{
				name,
				apellido,
				email,
				password
			},
			{
				withCredentials: true,
			});
		// Verifica si la respuesta es exitosa
		if (response.status === 200 && response.data.success) {
			dispatch(loginSuccess(response.data));
			toast.success("Bienvenido");
		} else {
			// En caso de respuesta no exitosa, muestra el mensaje de error
			dispatch(loginFailure());
			toast.error(response.data.message)
		}
	} catch (error) {
		// En caso de error en la llamada al servidor, muestra el mensaje de error
		dispatch(loginFailure());
		toast.error('Ocurrio un error.')
	}
};



export const logoutUser = () => async (dispatch) => {
	try {
		// Realiza la llamada al servidor para hacer el logout
		const response = await axios.get(`http://localhost:8000/auth/logout`,
			{
				withCredentials: true,
			});
		localStorage.removeItem('token');
		dispatch(logout());

	} catch (error) {
		// En caso de error en la llamada al servidor, muestra el mensaje de error
		toast.error('Ocurrio un error.')
	}
};
export const refreshToken = () => async (dispatch) => {
	try {
		const response = await axios.get(`http://localhost:8000/auth/refresh-token`,
			{
				withCredentials: true,
			});
		console.log(response)
		dispatch(refreshTokenSuccess(response.data));

	} catch (error) {
		// En caso de error en la llamada al servidor, muestra el mensaje de error
		// toast.error('Ocurrio un error.')
	}
};

export const forgotPasswordEmail = ({ email }) => async (dispatch) => {
	try {
		const response = await axios.post(`http://localhost:8000/auth/forgot-password-email`,
			{
				email
			},
			{
				withCredentials: true,
			});
		toast.success(response.data.message)
	} catch (error) {
		toast.error('Ocurrio un error.')
	}
};

export const updatedPassword = ({ email, password }) => async (dispatch) => {
	console.log(email, password)
	try {
		const response = await axios.put(`http://localhost:8000/auth/update-password`,
			{	
				email,
				password
			});
		toast.success(response.data.message)
	} catch (error) {
		toast.error('Ocurrio un error.')
	}
};