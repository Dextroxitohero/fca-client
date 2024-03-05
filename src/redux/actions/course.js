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
    cleanSelectedCourse,
    getListStudentByIdCourseStart,
    getListStudentByIdCourseSuccess,
    getListStudentByIdCourseFailure,
    deleteStudentFromCourseSuccess,
    getListStudentsNotCourseSuccess,
    addStudentToCourseSuccess,
    getChatMessagesCourseStart,
    getChatMessagesCourseSuccess,
    getChatMessagesCourseFailure,
    addChatMessagesCourseStart,
    addChatMessagesCourseSuccess,
    addChatMessagesCourseFailure,
    removeChatMessagesCourseStart,
    removeChatMessagesCourseSuccess,
    removeChatMessagesCourseFailure
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

export const getAllCourses = (userId, roles) => async (dispatch) => {
    console.log(userId, roles)
    try {
        dispatch(getAllCoursesStart());

        const response = await axios.get(`/course/getAllCourse/${userId}/${roles}`);
        console.log(response)
        if (response.status === 200) {
            dispatch(getAllCoursesSuccess(response.data));
        }
    } catch (error) {
        dispatch(getAllCoursesFailure());
        return {
            status: error.response.status || null,
            message: error.response.data.message
        };
    }
};

export const getCourseById = (idCourse) => async (dispatch) => {
    try {
        dispatch(getCourseByStart());

        const response = await axios.get(`/course/findCourseById/${idCourse}`);
        if (response.status === 200) {
            dispatch(getCourseBySuccess(response.data));
        }
    } catch (error) {
        dispatch(getCourseByFailure());
        toast.error('Ocurrio un error.')
    }
};

export const cleanActionSelectedCourse = () => async (dispatch) => {
    dispatch(cleanSelectedCourse());
};

export const getListStudentsByIdCourse = (courseId) => async (dispatch) => {
    try {
        dispatch(getListStudentByIdCourseStart());

        const response = await axios.get(`/course/getListStudentsCourseById/${courseId}`);
        if (response.status === 200) {
            dispatch(getListStudentByIdCourseSuccess(response.data));
        }
    } catch (error) {
        dispatch(getListStudentByIdCourseFailure());
        toast.error('Ocurrio un error.')
    }
};

export const getListStudentsNotInCourse = (courseId) => async (dispatch) => {
    try {
        dispatch(getListStudentByIdCourseStart());

        const response = await axios.get(`/course/getListStudentsNotInCourse/${courseId}`);
        if (response.status === 200) {
            dispatch(getListStudentsNotCourseSuccess(response.data));
        }
    } catch (error) {
        dispatch(getListStudentByIdCourseFailure());
        toast.error('Ocurrio un error.')
    }
}

export const addNewStudentToCourse = (courseId, userId) => async (dispatch) => {
    try {
        dispatch(getListStudentByIdCourseStart());

        const response = await axios.put(`/course/addStudentToCourse/${courseId}`, { userId });
        dispatch(addStudentToCourseSuccess(response.data));
        if (response?.status === 200) {
            return {
                status: response?.status || null,
                message: response?.data.message
            };
        }
    } catch (error) {
        dispatch(getListStudentByIdCourseFailure());
        return {
            status: error.response.status || null,
            message: error.response.data.message
        };
    }

}


export const deleteStudentFromCourse = (courseId, userId) => async (dispatch) => {
    try {
        dispatch(getListStudentByIdCourseStart());

        const response = await axios.delete(`/course/removeStudentFromCourse/${courseId}/${userId}`);
        dispatch(deleteStudentFromCourseSuccess(response.data));
        if (response?.status === 200) {
            return {
                status: response?.status || null,
                message: response?.data.message
            };
        }
    } catch (error) {
        dispatch(getListStudentByIdCourseFailure());
        toast.error('Ocurrio un error.')
    }
};

// chat course part
export const getChatByIdCourse = (courseId) => async (dispatch) => {
    try {
        dispatch(getChatMessagesCourseStart());

        const response = await axios.get(`/chat/getAllMessagesFromChatByIdCourse/${courseId}`);
        if (response.status === 200) {
            dispatch(getChatMessagesCourseSuccess(response.data));
        }
    } catch (error) {
        dispatch(getChatMessagesCourseFailure());
        toast.error('Ocurrio un error.')
    }
}

export const addChatMessageToCourse = (courseId, senderId, content, publicId, url, messageType) => async (dispatch) => {
    try {
        dispatch(addChatMessagesCourseStart());

        const response = await axios.post(`/chat/addMessageToChat/${courseId}`, {
            courseId,
            senderId,
            content,
            publicId,
            url,
            messageType
        });
        if (response?.status === 201) {
            dispatch(addChatMessagesCourseSuccess(response.data));
            return {
                status: response?.status || null,
                message: response?.data.message
            };
        }
    } catch (error) {
        dispatch(addChatMessagesCourseFailure());
        return {
            status: error.response.status || null,
            message: error.response.data.message
        };
    }
}

export const addChatMessageFileToCourse = (file, courseId, senderId, content, publicId, url, messageType) => async (dispatch) => {
    try {
        dispatch(addChatMessagesCourseStart());

        const formData = new FormData();
        formData.append('file', file);
        formData.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
        formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
        formData.append('upload_preset', 'fca-intranet');
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, formData);

        if (res.status === 200) {
            const response = await axios.post(`/chat/addMessageToChat/${courseId}`, {
                courseId,
                senderId,
                content,
                publicId: res.data.public_id,
                url: res.data.secure_url,
                messageType
            });
            if (response?.status === 201) {
                dispatch(addChatMessagesCourseSuccess(response.data));
                return {
                    status: response?.status || null,
                    message: response?.data.message
                };
            }
        }
    } catch (error) {
        dispatch(addChatMessagesCourseFailure());
        return {
            status: error.response.status || null,
            message: error.response.data.message
        };
    }
}

export const removeChatMessageToCourse = (courseId, chatId, userId, messageId, typeMessage, publicId) => async (dispatch) => {
    try {
        dispatch(removeChatMessagesCourseStart());
        const response = await axios.post(`/chat/deleteMessageToChat/${courseId}`, {
            chatId,
            userId,
            messageId,
            typeMessage,
            publicId
        });

        if (response?.status === 200) {
            dispatch(removeChatMessagesCourseSuccess(response.data));
            return {
                status: response?.status || null,
                message: response?.data.message
            };
        }
    } catch (error) {
        dispatch(removeChatMessagesCourseFailure());
        return {
            status: error.response.status || null,
            message: error.response.data.message
        };
    }
}