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

// load seller
// export const loadSeller = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: "LoadSellerRequest",
//     });
//     const { data } = await axios.get(`${server}/shop/getSeller`, {
//       withCredentials: true,
//     });
//     dispatch({
//       type: "LoadSellerSuccess",
//       payload: data.seller,
//     });
//   } catch (error) {
//     dispatch({
//       type: "LoadSellerFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// // user update information
// export const updateUserInformation =
//   (name, email, phoneNumber, password) => async (dispatch) => {
//     try {
//       dispatch({
//         type: "updateUserInfoRequest",
//       });

//       const { data } = await axios.put(
//         `${server}/user/update-user-info`,
//         {
//           email,
//           password,
//           phoneNumber,
//           name,
//         },
//         {
//           withCredentials: true,
//           headers: {
//             "Access-Control-Allow-Credentials": true,
//           },
//         }
//       );

//       dispatch({
//         type: "updateUserInfoSuccess",
//         payload: data.user,
//       });
//     } catch (error) {
//       dispatch({
//         type: "updateUserInfoFailed",
//         payload: error.response.data.message,
//       });
//     }
//   };

// // update user address
// export const updatUserAddress =
//   (country, city, address1, address2, zipCode, addressType) =>
//   async (dispatch) => {
//     try {
//       dispatch({
//         type: "updateUserAddressRequest",
//       });

//       const { data } = await axios.put(
//         `${server}/user/update-user-addresses`,
//         {
//           country,
//           city,
//           address1,
//           address2,
//           zipCode,
//           addressType,
//         },
//         { withCredentials: true }
//       );

//       dispatch({
//         type: "updateUserAddressSuccess",
//         payload: {
//           successMessage: "User address updated succesfully!",
//           user: data.user,
//         },
//       });
//     } catch (error) {
//       dispatch({
//         type: "updateUserAddressFailed",
//         payload: error.response.data.message,
//       });
//     }
//   };

// // delete user address
// export const deleteUserAddress = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "deleteUserAddressRequest",
//     });

//     const { data } = await axios.delete(
//       `${server}/user/delete-user-address/${id}`,
//       { withCredentials: true }
//     );

//     dispatch({
//       type: "deleteUserAddressSuccess",
//       payload: {
//         successMessage: "User deleted successfully!",
//         user: data.user,
//       },
//     });
//   } catch (error) {
//     dispatch({
//       type: "deleteUserAddressFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

// // get all users --- admin
// export const getAllUsers = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: "getAllUsersRequest",
//     });

//     const { data } = await axios.get(`${server}/user/admin-all-users`, {
//       withCredentials: true,
//     });

//     dispatch({
//       type: "getAllUsersSuccess",
//       payload: data.users,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllUsersFailed",
//       payload: error.response.data.message,
//     });
//   }
// };
