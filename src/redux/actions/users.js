import {
	getAllUsersStart,
	getAllUsersSucSuccess,
	getAllUsersFailure,
	getAllStudentsStart,
	getAllStudentsSucSuccess,
	getAllStudentsFailure,
	getAllUserByIdStart,
	getAllUserByIdSucSuccess,
	getAllUserByIdFailure,
} from '../reducers/users';

import axios from "../../api/axios";



export const getAllUsers = () => async (dispatch) => {
	dispatch(getAllUsersStart());
	try {
		const response = await axios.get(`/users/getAllUsers`,
			{
				withCredentials: true,
			});
		dispatch(getAllUsersSucSuccess(response.data));
		return response.status;
	} catch (error) {
		dispatch(getAllUsersFailure());
	}
};

export const getAllStudents = () => async (dispatch) => {
	dispatch(getAllStudentsStart());
	try {
		const response = await axios.get(`/users/getAllStudents`,
			{
				withCredentials: true,
			});
		dispatch(getAllStudentsSucSuccess(response.data));
		return response.status;
	} catch (error) {
		dispatch(getAllStudentsFailure());
	}
};

export const getUserById = (idUser) => async (dispatch) => {
	dispatch(getAllUserByIdStart());
	try {

		const response = await axios.get(`/users/getUserById/${idUser}`,
			{
				withCredentials: true,
			});
		dispatch(getAllUserByIdSucSuccess(response.data))

	} catch (error) {
		console.log(error.response.data.message)
		dispatch(getAllUserByIdFailure());
	}
};

export const createNewUserByInvitation = ({ email, typeUser }) => async (dispatch) => {
	try {
		const response = await axios.post(`/users/newUserByInvitation`,
			{
				email,
				typeUser
			},
			{
				withCredentials: true,
			});
		if (response.status === 201) {

			return {
				status: response.status,
				message: response.data.message
			};
		}
	} catch (error) {
		return {
			status: error.response.status,
			message: error.response.data.message
		};
	}
};

export const createNewUser = (payload) => async (dispatch) => {

	const { firstName, secondName, lastName, secondSurname, email, location, typeUser, phone, dateBirth, password
	} = payload;

	try {
		const response = await axios.post(`/users/`,
			{
				firstName,
				secondName,
				lastName,
				secondSurname,
				email,
				location,
				typeUser,
				phone,
				dateBirth,
				password
			});
		if (response.status === 201) {

			return {
				status: response.status,
				message: response.data.message
			};
		}
	} catch (error) {
		return {
			status: error.response.status,
			message: error.response.data.message
		};
	}
};
