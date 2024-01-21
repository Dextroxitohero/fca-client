// import { useNavigate } from 'react-router-dom';
import {
	optionsStart,
	optionsCoordinadorsSuccess,
	optionsLanguagesSuccess,
	optionsColorsSuccess,
	optionsLevelsSuccess,
	optionsFailure,
	optionsTeachersSuccess,
	optionsAccountsBankSuccess,
	optionsCourseListSuccess
} from '../reducers/options';

import axios from '../../api/axios';

export const optionsCoordinadors = () => async (dispatch) => {
	try {
        
		dispatch(optionsStart());

		const response = await axios.get(`/options/coordinadors`);

        dispatch(optionsCoordinadorsSuccess(response.data));

	} catch (error) {
		
        dispatch(optionsFailure());

	}
};

export const optionsLanguages = () => async (dispatch) => {
	try {
        
		dispatch(optionsStart());

		const response = await axios.get(`/options/languages`);

        dispatch(optionsLanguagesSuccess(response.data));

	} catch (error) {
		
        dispatch(optionsFailure());

	}
};
export const optionsColors = () => async (dispatch) => {
	try {
        
		dispatch(optionsStart());

		const response = await axios.get(`/options/colors`);

        dispatch(optionsColorsSuccess(response.data));

	} catch (error) {
		
        dispatch(optionsFailure());

	}
};

export const optionsLevels = () => async (dispatch) => {
	try {
        
		dispatch(optionsStart());

		const response = await axios.get(`/options/levels`);

        dispatch(optionsLevelsSuccess(response.data));

	} catch (error) {
		
        dispatch(optionsFailure());

	}
};

export const optionsAllTeachers = () => async (dispatch) => {
	try {
        
		dispatch(optionsStart());

		const response = await axios.get(`/options/teachers`);

        dispatch(optionsTeachersSuccess(response.data));

	} catch (error) {
		
        dispatch(optionsFailure());

	}
};

export const optionsAllAccountsBank = () => async (dispatch) => {
	try {
        
		dispatch(optionsStart());

		const response = await axios.get(`/options/accountsBank`);

        dispatch(optionsAccountsBankSuccess(response.data));

	} catch (error) {
		
        dispatch(optionsFailure());

	}
};

export const optionsAllCourseList = () => async (dispatch) => {
	try {
        
		dispatch(optionsStart());

		const response = await axios.get(`/options/coursesList`);

        dispatch(optionsCourseListSuccess(response.data));

	} catch (error) {
		
        dispatch(optionsFailure());

	}
};

