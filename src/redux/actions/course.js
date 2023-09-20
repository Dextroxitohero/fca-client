// import { useNavigate } from 'react-router-dom';
import {
    createCourseStart,
    createCourseSuccess,
    createCourseFailure,
    getAllCoursesStart,
    getAllCoursesSuccess,
    getAllCoursesFailure
} from '../reducers/course';

import axios from "axios";
import { toast } from 'react-hot-toast';


// userActions login
export const createCourse = ({ name, color, language, level, limit }) => async (dispatch) => {
    try {
        dispatch(createCourseStart());

        const response = await axios.post(`http://localhost:8000/course`,
            {
                name,
                color,
                language,
                level,
                limitMembers: limit
            });

        if (response.status === 201) {
            dispatch(createCourseSuccess(response.data));
            toast.success(response.data.message);
        } else {
            dispatch(createCourseFailure());
            toast.error(response.data.message)
        }
    } catch (error) {
        dispatch(createCourseFailure());
        toast.error('Ocurrio un error.')
    }
};

export const getAllCourses = () => async (dispatch) => {
    try {
        dispatch(getAllCoursesStart());

        const response = await axios.get(`http://localhost:8000/course`);

        if (response.status === 200) {
            dispatch(getAllCoursesSuccess(response));
        } else {
            dispatch(getAllCoursesFailure());
        }
    } catch (error) {
        dispatch(getAllCoursesFailure());
        toast.error('Ocurrio un error.')
    }
};
