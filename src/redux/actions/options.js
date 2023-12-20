// import { useNavigate } from 'react-router-dom';
import {
	optionsStart,
	optionsAssessorsSuccess,
	optionsLanguagesSuccess,
	optionsColorsSuccess,
	optionsLevelsSuccess,
	optionsFailure,
	optionsTeachersSuccess,
} from '../reducers/options';

import axios from '../../api/axios';

export const optionsAssessors = () => async (dispatch) => {
	try {
        
		dispatch(optionsStart());

		const response = await axios.get(`/options/assessors`);

        dispatch(optionsAssessorsSuccess(response.data));

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

