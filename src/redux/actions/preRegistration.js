// import { useNavigate } from 'react-router-dom';
import {
	loginStart,
	loginSuccess,
	loginFailure,
	LoadUserRequest,
	LoadUserSuccess,
	LoadUserFail,
	logout
} from '../reducers/user';

import axios from "axios";
import { toast } from 'react-hot-toast';

// userActions login
export const registerPreRegitration = ({ email, password }) => async (dispatch) => {
	try {
		dispatch(loginStart());

		// Realiza la llamada al servidor para autenticar al usuario y obtener la respuesta
		const response = await axios.post(`http://localhost:8000/auth/login`,
			{
				email,
				password
			},
			{
				withCredentials: true,
			});
		// Verifica si la respuesta es exitosa
		if (response.status === 200 && response.data.success) {
			dispatch(loginSuccess());
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

// load user
export const loadUser = () => async (dispatch) => {
	try {
		dispatch(LoadUserRequest());
		const data = await axios.get(`http://localhost:8000/users`, {
			withCredentials: true,
		});
		dispatch(LoadUserSuccess({ user: data.data.user }))
	} catch (error) {
		dispatch(LoadUserFail({ error: error.response.data.message }));
	}
};

export const logoutUser = () => async (dispatch) => {
	try {
		// Realiza la llamada al servidor para hacer el logout
		const response = await axios.get(`http://localhost:8000/auth/logout`,
			{
				withCredentials: true,
			});

		dispatch(logout());

	} catch (error) {
		// En caso de error en la llamada al servidor, muestra el mensaje de error
		toast.error('Ocurrio un error.')
	}
};

