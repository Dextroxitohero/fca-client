import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

import { ContainerFull } from '../../components/ContainerFull';
import { Wrapper } from '../../components/Wrapper';
import { TimeElapsed } from '../../common/TimeElapsed';
import { MessageImage } from './components/MessageImage';
import { MessageText } from './components/MessageText';
import { MessageUrl } from './components/MessageUrl';
import { MessageFile } from './components/MessageFile';
import { MessageMenu } from './components/MessageMenu';
import { ModalAddMessageUrl } from './components/ModalAddMessageUrl';

import { addChatMessageToCourse, getChatByIdCourse, getCourseById, getListStudentsByIdCourse } from '../../redux/actions/course';

import { LinkIcon, PhotoIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { ModalAddMessageImage } from './components/ModalAddMessageImage';

export const CourseDisplay = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const idCourse = params?.idCourse;
    const chatContainerRef = useRef(null);
    const [openAddMessageUrlModal, setOpenAddMessageUrlModal] = useState(false);
    const [openAddMessageImageModal, setOpenAddMessageImageModal] = useState(false);

    const { courseListSelected, messagesCourse, courseSelected } = useSelector((state) => state.course);
    const { user } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        message: '',
    })

    const scrollToBottom = () => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    };

    useEffect(() => {
        scrollToBottom();
    }, [messagesCourse]);

    useEffect(() => {
        if (idCourse) {
            dispatch(getCourseById(idCourse));
            dispatch(getListStudentsByIdCourse(idCourse));
            dispatch(getChatByIdCourse(idCourse));
        }
    }, [idCourse]);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.message.trim() === '') {
            return toast.error('Ingresa un mensaje');
        }
        dispatch(addChatMessageToCourse(idCourse, user._id, formData.message, '', '', 'text'))
            .then((result) => {
                if (result.status === 201) {
                    setFormData({
                        message: ''
                    });
                } else {
                    toast.error(result.message);
                    setFormData({
                        message: ''
                    });
                }
            });
    }


    return (
        <ContainerFull>
            <Wrapper>
                <div className='w-full flex flex-row gap-4'>
                    <div className='hidden lg:flex flex-col lg:w-[25%] h-[80vh] gap-4'>
                        <div className=' border border-gray-200 rounded-lg p-4 h-[10%]'>
                            <p className='text-[.9rem] text-gray-600'>Profesor</p>
                            <p className='text-[1rem] text-gray-950 font-semibold mt-2'>Felipe Martinez Ramirez</p>
                        </div>

                        <div className='border border-gray-200 rounded-lg p-4 h-[90%]'>
                            <p className='text-[.9rem] text-gray-600'>Estudiantes</p>
                            <div className='h-[95%] overflow-auto p-4'>
                                {
                                    courseListSelected?.length
                                        ? courseListSelected.map(({ _id, firstName, lastName, matricula }) => (
                                            <p className='text-[.8rem] text-gray-950 p-2 border-b border-gray-200 capitalize' key={_id}>{(`[${matricula}] - ${firstName} ${lastName}`)}</p>

                                        ))
                                        : <p className='text-[1rem] text-gray-950 p-2 border-b border-gray-200'>No hay alumnos inscritos</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='w-full lg:w-[75%] border-[1px] border-gray-200 rounded-lg h-[80vh]'>

                        <div className='p-6 h-[90%] overflow-auto' ref={chatContainerRef}>
                            {
                                messagesCourse?.length
                                    ? messagesCourse.map(({ _id: messageId, timestamp, publicId, content, url, messageType, sender }) => {
                                        const { _id: userId, firstName, lastName, typeUser, matricula } = sender;
                                        return (
                                            <div
                                                className={classNames(
                                                    typeUser === 'estudiante' ? `bg-gray-50 mr-auto` : `bg-indigo-100 ml-auto`,
                                                    'w-full lg:w-[80%] px-4 py-2 border rounded-lg mb-2'
                                                )}
                                                key={messageId}
                                            >
                                                <div className='flex justify-between'>
                                                    <p className='capitalize text-[.9rem] font-semibold'>{`${firstName} ${lastName}`}
                                                        {/* <small className='text-indigo-600'>{` - [ ${matricula} ]`}</small> */}
                                                    </p>
                                                    {
                                                        userId === user?._id
                                                            ? <MessageMenu
                                                                courseId={idCourse}
                                                                chatId={courseSelected.idChat}
                                                                userId={userId}
                                                                messageId={messageId}
                                                                typeMessage={messageType}
                                                                publicId={publicId}
                                                            />
                                                            : null
                                                    }
                                                </div>
                                                {
                                                    messageType === 'text'
                                                        ? <MessageText content={content} />
                                                        : messageType === 'image'
                                                            ? <MessageImage content={content} url={url} />
                                                            : messageType === 'url'
                                                                ? <MessageUrl content={content} url={url} />
                                                                : messageType === 'file'
                                                                    ? <MessageFile content={content} url={url} />
                                                                    : null
                                                }

                                                <p className='capitalize text-[.7rem] text-right text-gray-500'><TimeElapsed date={timestamp} /></p>
                                            </div>
                                        )
                                    })
                                    : <p className='text-[1rem] text-gray-950 p-2 border-b border-gray-200'>No hay mensajes</p>
                            }
                        </div>
                        <div className='flex px-2 h-[10%]'>
                            <div className='w-full flex flex-row justify-between items-center gap-2 border-t border-gray-100'>
                                <button
                                    onClick={() => setOpenAddMessageUrlModal(true)}
                                    className='w-[15%] lg:w-[5%] flex justify-center items-center border border-gray-200 rounded-md lg:rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'>
                                    <LinkIcon className='text-indigo-600 w-[16px] py-1 lg:py-0  lg:w-[24px]' />
                                </button>
                                <button
                                    onClick={() => setOpenAddMessageImageModal(true)}
                                    className='w-[15%] lg:w-[5%] flex justify-center items-center border border-gray-200 rounded-md lg:rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'>
                                    <PhotoIcon className='text-indigo-600 w-[16px] py-1 lg:py-0  lg:w-[24px]' />
                                </button>
                                <form className='flex w-full gap-2' onSubmit={handleSubmit}>
                                    <input
                                        name='message'
                                        type="text"
                                        value={formData.message}
                                        onChange={onChange}
                                        placeholder='Mensaje de texto'
                                        className='w-[80%] lg:w-[95%] border border-gray-200 rounded-md lg:rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                                    />
                                    <button
                                        type='submit'
                                        className='w-[20%] lg:w-[5%] flex justify-center items-center border border-gray-200 rounded-md lg:rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'>
                                        <PaperAirplaneIcon className='text-indigo-600 w-[16px] py-1 lg:py-0  lg:w-[24px]' />
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </Wrapper>
            <ModalAddMessageUrl
                open={openAddMessageUrlModal}
                setOpen={setOpenAddMessageUrlModal}
                courseId={idCourse}
                userId={user._id}
            />
            <ModalAddMessageImage
                open={openAddMessageImageModal}
                setOpen={setOpenAddMessageImageModal}
                courseId={idCourse}
                userId={user._id}
            />

        </ContainerFull>
    )
}
