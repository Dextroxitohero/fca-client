import {
	headerImageStart,
	uploadHeaderImageSuccess,
	headerImageRemoveSuccess,
	headerImageSuccess,
	headerImageFailure,
} from '../reducers/setting';
import axios from '../../api/axios';

import { toast } from 'react-hot-toast';

export const getAllHeadersImages = () => async (dispatch) => {
	dispatch(headerImageStart());
	try {
		const response = await axios.get(`/headerImage`);
		if (response.status === 200) {
			dispatch(headerImageSuccess(response.data));
		}
	} catch (error) {
		toast.error('Ocurrio un error.')
		dispatch(headerImageFailure());
	}
};


export const addNewHeaderImage = ({
	name,
	file,
}) => async (dispatch) => {
	dispatch(headerImageStart());
	try {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', 'fca-intranet');
		const res = await axios.post('https://api.cloudinary.com/v1_1/dax0v05jz/image/upload', formData);

		if(res.status === 200){
			const response = await axios.post('/headerImage', {
				name,
				urlName: res.data.secure_url
			});
			if (response.status === 201) {
				dispatch(uploadHeaderImageSuccess());
				return {
					status: response.status,
					message: response.data.message
				};
			}
		}

	} catch (error) {
		console.log(error)
		// toast.error(error.response.data.message);
		dispatch(headerImageFailure());
	}
};

export const removeHeaderImage = (headerImageId) => async (dispatch) => {
	dispatch(headerImageStart());
	try {
		const response = await axios.delete(`/headerImage/${headerImageId}`);
		if (response.status === 200) {
			dispatch(headerImageRemoveSuccess());
			return {
				status: response.status,
				message: response.data.message
			};
		}
	} catch (error) {
		toast.error(error.response.data.message);
		dispatch(headerImageFailure());
	}
}