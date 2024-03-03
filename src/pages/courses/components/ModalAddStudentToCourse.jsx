import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dialog } from '@headlessui/react';
import { toast } from 'react-hot-toast';

import { ButtonLoader } from '../../../components/buttons/ButtonLoader';
import { ComboBox } from '../../../components/comboBox/ComboBox';
import { Modal } from '../../../components/modal/Modal';

import { addNewStudentToCourse, getListStudentsNotInCourse } from '../../../redux/actions/course';

export const ModalAddStudentToCourse = ({ open, setOpen, idCourse }) => {
    const dispatch = useDispatch();
    const cancelButtonRef = useRef(null);
    const { studentsNotInCourse } = useSelector((state) => state.course);
    const [findStudentNotAtCourse, setFindStudentNotAtCourse] = useState('');
    const [loadingAddStudent, setLoadingAddStudent] = useState(false)
    const [formData, setFormData] = useState({
        student: '',
    });

    useEffect(() => {
        if(!open){
            setFormData({
                student: ''
            });
        }
    }, [open]);

    const handleAddStudentToCourse = () => {
        setLoadingAddStudent(true);
        const { student } = formData;
        if (student === '') {
            toast.error('Selecciona un estudiante');
            setLoadingAddStudent(false);
            return;
        }
        dispatch(addNewStudentToCourse(idCourse, student.id))
            .then((result) => {
                if (result.status === 200) {
                    toast.success(result.message);
                    setOpen(false);
                    setFormData({
                        student: ''
                    });
                    dispatch(getListStudentsNotInCourse(idCourse));
                } else {
                    toast.error(result.message);
                }
                setLoadingAddStudent(false);
            });

    }



    const filteredStudentsNotAtCourse = findStudentNotAtCourse === ''
        ? studentsNotInCourse
        : studentsNotInCourse.filter((student) =>
            student.description
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(findStudentNotAtCourse.toLowerCase().replace(/\s+/g, ''))
        );

    return (
        <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
            <div className='flex flex-wrap justify-center'>

                <Dialog.Title as="h3" className="text-center text-lg font-semibold leading-6 text-gray-950">
                    Agregar estudiante al curso
                </Dialog.Title>
                <div className='w-[80%] flex flex-col justify-start items-start min-h-[350px] mt-6'>
                    <div className='w-full mt-4'>
                        <p className="text-sm font-semibold text-center text-gray-900">Seleciona al estudiante que quieres agregar al curso</p>
                    </div>
                    <div className='w-full mt-4'>

                        <ComboBox
                            filterData={filteredStudentsNotAtCourse}
                            query={findStudentNotAtCourse}
                            setQuery={setFindStudentNotAtCourse}
                            selected={formData}
                            setSelected={setFormData}
                            placeholder='Seleciona al estudiante'
                            property='student'
                        />
                    </div>
                    <p className="text-sm text-center text-gray-600 mt-6">
                        Al agregar al estudiante al curso, este podra ver el contenido del curso. El alumno no podra ver el contenido si su fecha pago esta vencida.
                    </p>
                    <div className='w-full mt-[80px]'>
                        <button
                            type='button'
                            disabled={loadingAddStudent}
                            className='disabled:cursor-not-allowed rounded-lg transition py-2.5 font-semibold text-md text-white text-center bg-indigo-600 w-full'
                            onClick={() => handleAddStudentToCourse()}
                        >
                            {loadingAddStudent
                                ? <ButtonLoader />
                                : 'Agregar estudiante al curso'
                            }
                        </button>
                    </div>

                </div>
            </div>
        </Modal>
    )
}
