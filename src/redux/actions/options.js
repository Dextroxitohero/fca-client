// import { useNavigate } from 'react-router-dom';
import {
	optionsStart,
	optionsSuccess,
	optionsFailure,
} from '../reducers/options';

import axios from "axios";


export const optionsAssessors = () => async (dispatch) => {
	try {
        
		dispatch(optionsStart());

		const response = await axios.get(`http://localhost:8000/options/assessors`);

        dispatch(optionsSuccess(response.data));

	} catch (error) {
		
        dispatch(optionsFailure());

	}
};

