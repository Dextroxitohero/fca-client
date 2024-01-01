import {
	loginStart,
	loginSuccess,
	refreshTokenStart,
	refreshTokenSuccess,
	loginFailure,
	logout
} from '../reducers/user';

import axios from "../../api/axios";
import { toast } from 'react-hot-toast';

// userActions login
export const loginUser = ({ email, password }) => async (dispatch) => {
	try {
		dispatch(loginStart());

		// Realiza la llamada al servidor para autenticar al usuario y obtener la respuesta
		const response = await axios.post(`/auth/login`,
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

export const signUp = ({ name, apellido, email, password }) => async (dispatch) => {
	try {

		const response = await axios.post(`/auth/signup`,
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
		toast.error('Ocurrio un error.');
	}
};



export const logoutUser = () => async (dispatch) => {

	try {
		// Realiza la llamada al servidor para hacer el logout
		const response = await axios.get(`/auth/logout`,
			{
				withCredentials: true,
			});
		localStorage.removeItem('token');
		localStorage.removeItem('lastRoutevisited');
		dispatch(logout());

	} catch (error) {
		// En caso de error en la llamada al servidor, muestra el mensaje de error
		toast.error('Ocurrio un error.')
	}
};
export const refreshToken = () => async (dispatch) => {
	dispatch(refreshTokenStart());
	try {
		const response = await axios.get(`/auth/refresh-token`,
			{
				withCredentials: true,
			});
		dispatch(refreshTokenSuccess(response.data));
		return response.status;
	} catch (error) {
		dispatch(logout());
		// En caso de error en la llamada al servidor, muestra el mensaje de error
		// toast.error('Ocurrio un error.')
	}
};

export const forgotPasswordEmail = ({ email }) => async (dispatch) => {
	try {
		const response = await axios.post(`/auth/forgot-password-email`,
			{
				email
			},
			{
				withCredentials: true,
			});
		return {
			status: response.status,
			message: response.data.message
		};
	} catch (error) {
		toast.error('Ocurrio un error.')
	}
};

export const updatedPassword = ({ email, password }) => async (dispatch) => {
	try {
		const response = await axios.put(`/auth/update-password`,
			{
				email,
				password
			});
		return {
			status: response.status,
			message: response.data.message
		};
	} catch (error) {
		toast.error('Ocurrio un error.')
	}
};