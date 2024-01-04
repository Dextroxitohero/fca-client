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
