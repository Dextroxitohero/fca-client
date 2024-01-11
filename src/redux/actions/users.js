import {
	getAllUsersStart,
	getAllUsersSucSuccess,
	getAllUsersFailure,
} from '../reducers/users';

import axios from "../../api/axios";
import { toast } from 'react-hot-toast';



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
