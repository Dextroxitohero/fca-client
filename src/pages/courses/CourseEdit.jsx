import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { optionsAllTeachers, optionsColors, optionsLanguages, optionsLevels } from '../../redux/actions/options';
import { createCourse, getCourseById, updateCourse } from '../../redux/actions/course';
import { getAllHeadersImages } from '../../redux/actions/setting';

import { ContainerFull } from '../../components/ContainerFull';
import { Wrapper } from '../../components/Wrapper';
import { Heading } from '../../components/Heading';
import { CardCourse } from './components/CardCourse';
import { ComboBox } from '../../components/comboBox/ComboBox';
import { TimeInput } from '../../components/inputTime/InputTime';
import { InputDays } from '../../components/inputDays/InputDays';
import { InputLeves } from '../../components/inputLeves/InputLeves';
import { InputColor } from '../../components/inputColor/InputColor';
import { InputLanguage } from '../../components/inputLanguage/InputLanguage';
import { InputLimit } from '../../components/inputLimit/InputLimit';
import { ModalCreateCourse } from './components/ModalCreateCourse';
import { InputDateRange } from '../../components/inputDateRange/InputDateRange';
import { InputHeaderImage } from '../../components/inputHeaderImage/InputHeaderImage';




export const CourseEdit = ({ isCreating }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const idCourse = params?.idCourse;
    const course = useSelector((state) => state.course.courseSelected);
    const headersImage = useSelector((state) => state.setting.headersImage);
    const { teachers, levels, colors, languages } = useSelector((state) => state.options);
    const [courseSelected, setCourseSelected] = useState();
    const [headerImageSelected, setHeaderImageSelected] = useState(null);
    const [selectedDates, setSelectedDates] = useState([
        {
            from: '',
            to: '',
        }
    ]);

    useEffect(() => {
        if (idCourse) {
            dispatch(getCourseById(idCourse));
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(optionsAllTeachers());
        dispatch(optionsLevels());
        dispatch(optionsColors());
        dispatch(optionsLanguages());
        dispatch(getAllHeadersImages());
    }, [dispatch]);

    useEffect(function initialState() {
        setCourseSelected({
            id: idCourse ? idCourse : '',
            language: course !== '' ? course.language : '',
            level: course !== '' ? course.level : '',
            color: course !== '' ? course.color : '',
            limitMembers: course.limitMembers !== undefined ? course.limitMembers : 0,
            hours: course !== '' ? course.hours : [],
            days: course !== '' ? course.days : [],
            teacher: course.teacher !== undefined ? { _id: course?.teacher?._id, name: `${course?.teacher?.firstName} ${course?.teacher?.lastName}` } : '',
            headerImage: course.headerImage !== undefined ? course.headerImage : '',
        })
    }, [course]);

    useEffect(() => {
        setCourseSelected({ ...courseSelected, headerImage: headerImageSelected })
    }, [headerImageSelected]);

    console.log(courseSelected)

    useEffect(() => {
        if (course?.startDate) {
            setSelectedDates([
                {
                    from: new Date(course.startDate),
                    to: new Date(course.endDate),
                }
            ])
        }
    }, [course])

    const [openModalCreate, setModalOpenCreate] = useState(false);
    const cancelCreateCourseRef = useRef(null);
    const [findTeacher, setFindTeacher] = useState('');
    const filteredTeachers = findTeacher === ''
        ? teachers
        : teachers.filter((teacher) =>
            teacher.description
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(findTeacher.toLowerCase().replace(/\s+/g, ''))
        );

    const handleCreatedCourse = () => {
        if (idCourse) {
            dispatch(updateCourse(courseSelected))
                .then((response) => {
                    navigate(`/cursos`);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            dispatch(createCourse(courseSelected))
                .then((response) => {
                    navigate(`/cursos`);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        setModalOpenCreate(false);
    }

    const handleValidateData = () => {
        setCourseSelected({ ...courseSelected, startDate: selectedDates.from, endDate: selectedDates.to })
        setModalOpenCreate(true)
    }

    return (
        <ContainerFull>
            <Heading
                title={isCreating ? 'Modulo de creacion de curso' : 'Modulo de edcion de curso'}
                center={false}
            />
            <Wrapper>
                <div className="w-full flex flex-col lg:flex-row gap-4">
                    <div className='w-full lg:w-[70%]'>
                        <div className="w-full flex flex-col lg:flex-row gap-4">
                            <div className='w-full lg:w-[50%]'>
                                <div className='flex flex-col justify-start items-center px-8 pt-4 pb-8 border rounded-md mb-4'>
                                    <h3 className="text-lg mb-4 font-semibold text-gray-900">Selecciona la duracion del curso</h3>
                                    <InputDateRange
                                        id={'rangeCourse'}
                                        label={'Seleciona el inicio y el fin del curso'}
                                        selected={selectedDates}
                                        onChange={setSelectedDates}
                                    />
                                </div>
                                <div className='flex flex-col justify-start items-center px-8 pt-4 pb-8 border rounded-md mb-4'>
                                    <h3 className="text-lg mb-4 font-semibold text-gray-900">Seleciona el nivel</h3>
                                    <div className='w-full'>
                                        <InputLeves
                                            levels={levels}
                                            courseSelected={courseSelected}
                                            setCourseSelected={setCourseSelected}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col justify-start items-center px-8 pt-4 pb-8 border rounded-md mb-4'>
                                    <h3 className="text-lg mb-4 font-semibold text-gray-900">Seleciona al idioma</h3>
                                    <div className='w-full'>
                                        <InputLanguage
                                            languages={languages}
                                            courseSelected={courseSelected}
                                            setCourseSelected={setCourseSelected}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col justify-start items-center px-8 pt-4 pb-8 border rounded-md mb-4'>
                                    <h3 className="text-lg mb-4 font-semibold text-gray-900">Seleciona la etiqueta</h3>
                                    <InputColor
                                        colors={colors}
                                        courseSelected={courseSelected}
                                        setCourseSelected={setCourseSelected}
                                    />
                                </div>
                                <div className='flex flex-col justify-start items-center px-8 pt-4 pb-8 border rounded-md mb-4'>
                                    <h3 className="text-lg mb-4 font-semibold text-gray-900">Limite alumnos en el curso</h3>
                                    <div className='w-full'>
                                        <InputLimit
                                            selected={courseSelected}
                                            setSelected={setCourseSelected}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full lg:w-[50%]'>
                                <div className='flex flex-col justify-start overflow-auto px-8 max-h-[200px] pt-4 pb-8 border rounded-md mb-4'>
                                    <InputHeaderImage
                                        headersImage={headersImage}
                                        headerImageSelected={headerImageSelected}
                                        setHeaderImageSelected={setHeaderImageSelected}
                                    />

                                </div>
                                <div className='flex flex-col justify-start items-center px-8 pt-4 pb-8 border rounded-md mb-4'>
                                    <h3 className="text-lg mb-4 font-semibold text-gray-900">Seleciona al profesor</h3>
                                    <div className='w-full'>
                                        <ComboBox
                                            filterData={filteredTeachers}
                                            query={findTeacher}
                                            setQuery={setFindTeacher}
                                            selected={courseSelected}
                                            setSelected={setCourseSelected}
                                            placeholder='Seleciona un profesor'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col justify-start items-center px-8 pt-4 pb-8 border rounded-md mb-4'>
                                    <h3 className="text-lg mb-4 font-semibold text-gray-900">Seleciona los dias</h3>
                                    {courseSelected && (
                                        <InputDays
                                            courseSelected={courseSelected}
                                            setCourseSelected={setCourseSelected}
                                        />
                                    )}
                                </div>
                                <div className='flex flex-col justify-start items-center px-8 pt-4 pb-8 border rounded-md'>
                                    <h3 className="text-lg mb-4 font-semibold text-gray-900">Seleciona el horario</h3>
                                    {courseSelected && (
                                        <TimeInput
                                            courseSelected={courseSelected}
                                            setCourseSelected={setCourseSelected}
                                        />
                                    )}
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className='w-full lg:w-[30%]'>
                        <div className='flex flex-col justify-start items-center pt-4 mb-4'>
                            <div className='w-full mb-8'>

                                {courseSelected && (
                                    <CardCourse
                                        isCreating={true}
                                        color={courseSelected.color?.clase}
                                        language={courseSelected.language?.name}
                                        path={courseSelected.language?.path}
                                        nivel={courseSelected.level?.name}
                                        hours={courseSelected?.hours}
                                        days={courseSelected?.days}
                                        teacher={courseSelected?.teacher?.name}
                                        startDate={selectedDates.from}
                                        endDate={selectedDates.to}
                                        studentLimit={courseSelected?.limitMembers}
                                        headerImage={courseSelected?.headerImage?.fileName}
                                    />
                                )}
                            </div>
                            <div className='w-full'>
                                <button
                                    type='button'
                                    className='disabled:opacity-95 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition py-2.5 font-semibold text-md text-white bg-indigo-600 bg-cyan w-full'
                                    onClick={handleValidateData}
                                >{isCreating ? 'Agregar nuevo curso' : 'Actulizar curso'}</button>
                            </div>
                        </div>
                    </div>

                </div>
            </Wrapper>
            <ModalCreateCourse
                open={openModalCreate}
                setOpen={setModalOpenCreate}
                cancelButtonRef={cancelCreateCourseRef}
                confirmAction={handleCreatedCourse}
                title={isCreating ? 'Agregar nuevo curso' : 'Actualizar informacion curso'}
                message={isCreating ? 'Estas seguro que quieres agregar el curso?' : 'Estas seguro que quieres actulizar la informacion del curso?'}
                labelButonConfirm={isCreating ? 'Agregar nuevo curso' : 'Actulizar curso'}
            />
        </ContainerFull>
    )
}
