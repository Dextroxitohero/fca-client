// import { useNavigate } from 'react-router-dom';
import {
    createCourseStart,
    createCourseSuccess,
    createCourseFailure,
    updateCourseStart,
	updateCourseSuccess,
    updateCourseFailure,
    getAllCoursesStart,
    getAllCoursesSuccess,
    getAllCoursesFailure,
    getCourseByStart,
    getCourseBySuccess,
    getCourseByFailure,
    cleanSelectedCourse
} from '../reducers/course';

// import axios from "axios";
import axios from '../../api/axios';
import { toast } from 'react-hot-toast';


export const createCourse = ({ language, level, color, limitMembers, fromDate, toDate, hours, days, teacher, headerImage, createdBy, updatedBy }) => async (dispatch) => {
    try {
        dispatch(createCourseStart());
        const response = await axios.post(`/course`,
            {
                language,
                level,
                limitMembers,
                fromDate,
                hours,
                days,
                teacher,
                toDate,
                color,
                headerImage,
                createdBy,
                updatedBy
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

export const updateCourse = ({ id, language, level, color, limitMembers, fromDate, toDate, hours, days, teacher, headerImage, updatedBy }) => async (dispatch) => {
    try {
        dispatch(updateCourseStart());
        const response = await axios.put(`/course/${id}`,
            {
                language,
                level,
                limitMembers,
                fromDate,
                hours,
                days,
                teacher,
                toDate,
                color,
                headerImage,
                updatedBy
            });

        if (response.status === 200) {
            dispatch(updateCourseSuccess());
            toast.success(response.data.message);
        } else {
            dispatch(updateCourseFailure());
            toast.error(response.data.message)
        }
    } catch (error) {
        dispatch(updateCourseFailure());
        toast.error('Ocurrio un error.')
    }
};

export const getAllCourses = ({ id, roles }) => async (dispatch) => {
    try {
        dispatch(getAllCoursesStart());

        const response = await axios.get(`/course/${id}/${roles}`);

        if (response.status === 200) {
            dispatch(getAllCoursesSuccess(response.data));
        } else {
            dispatch(getAllCoursesFailure());
        }
    } catch (error) {
        dispatch(getAllCoursesFailure());
        toast.error('Ocurrio un error.')
    }
};

export const getCourseById = (idCourse) => async (dispatch) => {
    try {
        dispatch(getCourseByStart());

        const response = await axios.get(`/course/findById/${idCourse}`);

        if (response.status === 200) {
            dispatch(getCourseBySuccess(response.data));
        } else {
            dispatch(getCourseByFailure());
        }
    } catch (error) {
        dispatch(getCourseByFailure());
        toast.error('Ocurrio un error.')
    }
};

export const cleanActionSelectedCourse = () => async (dispatch) => {
    dispatch(cleanSelectedCourse());
};
