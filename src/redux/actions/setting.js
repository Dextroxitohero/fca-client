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
	createdBy,
	updatedBy
}) => async (dispatch) => {
	dispatch(headerImageStart());
	try {
		const formData = new FormData();
		formData.append('file', file);
		formData.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
		formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
		formData.append('upload_preset', 'fca-intranet');
		const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, formData);
		if (res.status === 200) {
			const response = await axios.post('/headerImage', {
				name,
				urlName: res.data.secure_url,
				publicId: res.data.public_id,
				createdBy,
				updatedBy
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
		dispatch(headerImageFailure());
	}
};

export const editHeaderImage = ({
	id: headerImageId,
	name,
	file,
	publicId,
	updatedBy
}) => async (dispatch) => {
	dispatch(headerImageStart());
	try {
		if (file !== null) {
			const responseDeleteImage = await axios.delete(`/headerImage/deleteHeader/${headerImageId}/${publicId.replace("uploads/", "")}`);
			if (responseDeleteImage.status === 200) {
				const formData = new FormData();
				formData.append('file', file);
				formData.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
				formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
				formData.append('upload_preset', 'fca-intranet');
				const responseReplaceImage = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, formData);
				if (responseReplaceImage.status === 200) {
					const responseReplaceDataImage = await axios.put(`/headerImage/${headerImageId}`, {
						name,
						urlName: responseReplaceImage.data.secure_url,
						publicId: responseReplaceImage.data.public_id,
						updatedBy
					});
					if (responseReplaceDataImage.status === 200) {
						dispatch(uploadHeaderImageSuccess());
						return {
							status: responseReplaceDataImage.status,
							message: responseReplaceDataImage.data.message
						};
					}
				}
			}
		} else {
			const responseUpdateName = await axios.put(`/headerImage/${headerImageId}`, {
				name,
			});
			if (responseUpdateName.status === 200) {
				dispatch(uploadHeaderImageSuccess());
				return {
					status: responseUpdateName.status,
					message: responseUpdateName.data.message,
					updatedBy
				};
			}
		}

	} catch (error) {
		dispatch(headerImageFailure());
	}
};


export const removeHeaderImage = (header) => async (dispatch) => {
	const { _id: headerImageId, publicId } = header;

	dispatch(headerImageStart());
	try {
		const response = await axios.delete(`/headerImage/deleteHeader/${headerImageId}/${publicId.replace("uploads/", "")}`);
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