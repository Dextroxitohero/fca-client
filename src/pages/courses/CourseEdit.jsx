import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContainerFull } from '../../components/ContainerFull';
import { Heading } from '../../components/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, getCourseById, updateCourse } from '../../redux/actions/course';
import { CardCourse } from './components/CardCourse';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { es } from 'react-date-range/dist/locale';
import { addDays } from 'date-fns';
import { ComboBox } from '../../components/comboBox/ComboBox';
import { optionsAllTeachers, optionsColors, optionsLanguages, optionsLevels } from '../../redux/actions/options';
import { TimeInput } from '../../components/inputTime/InputTime';
import { InputDays } from '../../components/inputDays/InputDays';
import { InputLeves } from '../../components/inputLeves/InputLeves';
import { InputColor } from '../../components/inputColor/InputColor';
import { InputLanguage } from '../../components/inputLanguage/InputLanguage';
import { InputLimit } from '../../components/inputLimit/InputLimit';
import { ModalCreateCourse } from './components/ModalCreateCourse';

export const CourseEdit = ({ isCreating }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const idCourse = params?.idCourse;
    const course = useSelector((state) => state.course.courseSelected);
    const [courseSelected, setCourseSelected] = useState();
    const { teachers, levels, colors, languages } = useSelector((state) => state.options);
    const [selectedDates, setSelectedDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
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
            teacher: course.teacher !== undefined ? { _id: course?.teacher?._id, name: `${course?.teacher?.firstName} ${course?.teacher?.lastName}` } : ''
        })
    }, [course])

    useEffect(() => {
        if (course.startDate) {
            setSelectedDates([
                {
                    startDate: new Date(course.startDate),
                    endDate: new Date(course.endDate),
                    key: 'selection'
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
        setCourseSelected({ ...courseSelected, startDate: selectedDates[0].startDate, endDate: selectedDates[0].endDate })
        setModalOpenCreate(true)
    }

    return (
        <ContainerFull>
            <Heading
                title={isCreating ? 'Modulo de creacion de curso' : 'Modulo de edcion de curso'}
                center={false}
            />
            <div className="w-full flex flex-col md:flex-row mt-5 md:mt-10">
                <div className="w-full md:w-[70%] grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
                    {/* Grid 1 */}
                    <div className="overflow-hidden">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Seleciona la periodo</h3>
                        </div>
                        <div className='flex justify-center md:justify-start md:px-4 mt-2 md:my-4'>
                            <DateRange
                                editableDateInputs={true}
                                onChange={item => setSelectedDates([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={selectedDates}
                                months={2}
                                direction='vertical'
                                locale={es}
                                rangeColors={['#4f46e5']}
                                minDate={addDays(new Date(), 0)}
                            />
                        </div>

                    </div>
                    {/* Grid 2 */}
                    <div className='md:px-4'>
                        <div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Seleciona los dias</h3>
                            </div>
                            <div className='mt-4'>
                                {courseSelected && (

                                    <InputDays
                                        courseSelected={courseSelected}
                                        setCourseSelected={setCourseSelected}
                                    />
                                )}
                            </div>

                        </div>
                        <div className='mt-8'>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Seleciona el horario</h3>
                            </div>
                            <div className='mt-4'>
                                {courseSelected && (
                                    <TimeInput
                                        courseSelected={courseSelected}
                                        setCourseSelected={setCourseSelected}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Grid 3 */}
                    <div className='md:px-4'>
                        {/* colors */}
                        <div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Seleciona la etiqueta</h3>
                            </div>
                            <div className='py-4'>
                                <InputColor
                                    colors={colors}
                                    courseSelected={courseSelected}
                                    setCourseSelected={setCourseSelected}
                                />
                            </div>
                        </div>
                        {/* leves */}
                        <div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Seleciona el nivel</h3>
                            </div>
                            <div className='py-4'>
                                <InputLeves
                                    levels={levels}
                                    courseSelected={courseSelected}
                                    setCourseSelected={setCourseSelected}
                                />
                            </div>
                        </div>
                        {/* languages */}
                        <div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Seleciona al idioma</h3>
                            </div>
                            <div className='py-4'>
                                <InputLanguage
                                    languages={languages}
                                    courseSelected={courseSelected}
                                    setCourseSelected={setCourseSelected}
                                />
                            </div>
                        </div>
                        {/* teacher */}
                        <div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Seleciona al profesor</h3>
                            </div>
                            <div className='py-4'>
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
                        {/* limit */}
                        <div className='pb-4'>
                            <InputLimit
                                selected={courseSelected}
                                setSelected={setCourseSelected}
                            />
                        </div>
                        <div className='w-full mt-4 md:mt-4 mb-4 md:mb-0'>
                            <button
                                type='button'
                                className='disabled:opacity-95 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition py-2.5 font-semibold text-md text-white bg-indigo-600 bg-cyan w-full'
                                onClick={handleValidateData}
                            >{isCreating ? 'Agregar nuevo curso' :  'Actulizar curso'}</button>
                            {/* <Button label={"Agregar nuevo curso"} onClick={handleCreateCourse} /> */}
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-[30%] my-5 md:mt-0 md:px-4 ">
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
                            startDate={selectedDates[0].startDate}
                            endDate={selectedDates[0].endDate}
                            studentLimit={courseSelected?.limitMembers}
                        />
                    )}
                </div>

            </div>
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
