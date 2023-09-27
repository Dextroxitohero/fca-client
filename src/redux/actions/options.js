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

import axios from "axios";

export const optionsAssessors = () => async (dispatch) => {
	try {
        
		dispatch(optionsStart());

		const response = await axios.get(`http://localhost:8000/options/assessors`);

        dispatch(optionsAssessorsSuccess(response.data));

	} catch (error) {
		
        dispatch(optionsFailure());

	}
};

export const optionsLanguages = () => async (dispatch) => {
	try {
        
		dispatch(optionsStart());

		const response = await axios.get(`http://localhost:8000/options/languages`);

        dispatch(optionsLanguagesSuccess(response.data));

	} catch (error) {
		
        dispatch(optionsFailure());

	}
};
export const optionsColors = () => async (dispatch) => {
	try {
        
		dispatch(optionsStart());

		const response = await axios.get(`http://localhost:8000/options/colors`);

        dispatch(optionsColorsSuccess(response.data));

	} catch (error) {
		
        dispatch(optionsFailure());

	}
};

export const optionsLevels = () => async (dispatch) => {
	try {
        
		dispatch(optionsStart());

		const response = await axios.get(`http://localhost:8000/options/levels`);

        dispatch(optionsLevelsSuccess(response.data));

	} catch (error) {
		
        dispatch(optionsFailure());

	}
};

export const optionsAllTeachers = () => async (dispatch) => {
	try {
        
		dispatch(optionsStart());

		const response = await axios.get(`http://localhost:8000/options/teachers`);

        dispatch(optionsTeachersSuccess(response.data));

	} catch (error) {
		
        dispatch(optionsFailure());

	}
};

