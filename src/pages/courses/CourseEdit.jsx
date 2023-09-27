import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContainerFull } from '../../components/ContainerFull';
import { Heading } from '../../components/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, getCourseById } from '../../redux/actions/course';
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
    const course  = useSelector((state) => state.course.courseSelected);
    const { teachers, levels, colors, languages } = useSelector((state) => state.options);
    useEffect(() => {
        if(idCourse){
            dispatch(getCourseById(idCourse));
        }
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(optionsAllTeachers());
        dispatch(optionsLevels());
        dispatch(optionsColors());
        dispatch(optionsLanguages());
    }, [dispatch]);

    console.log(course)
    
    const [openModalCreate, setModalOpenCreate] = useState(false);
    const cancelCreateCourseRef = useRef(null);

    const [values, setValues] = useState('')
    //state languages
    const [selectedLanguage, setSelectedLanguage] = useState( course !== '' ? course.language : '' );
    //state Colors
    const [selectedColor, setSelectedColor] = useState(course !== '' ? course.color : '' )
    // state levels
    const [selectedLevels, setSelectedLevels] = useState('')
    // state dates
    const [selectedDates, setSelectedDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    // times state
    const [selectedTimes, setSelectedTimes] = useState([]);
    // days state
    const [selectedDays, setSelectedDays] = useState([]);
    // state comboBox find
    const [findTeacher, setFindTeacher] = useState('');
    // here is the teacher selected
    const [selectedTeacher, setSelectedTeacher] = useState('');
    //state limit 
    const [selectedLimit, setSelectedLimit] = useState(0)
    const filteredTeachers = findTeacher === ''
        ? teachers
        : teachers.filter((teacher) =>
            teacher.description
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(findTeacher.toLowerCase().replace(/\s+/g, ''))
        );

    const handleCreatedCourse = () => {
        dispatch(createCourse(values))
            .then((response) => {

                navigate(`/cursos`);

            })
            .catch((error) => {
                console.error('Error:', error);
            });
            setModalOpenCreate(false)
    }

    const handleValidateData = () => {
        setValues({
            language: selectedLanguage !== '' ? selectedLanguage.id : '',
            level: selectedLevels !== '' ? selectedLevels.id : '',
            color: selectedColor !== '' ? selectedColor.id : '',
            limitMembers: selectedLimit,
            startDate: selectedDates[0].startDate,
            endDate: selectedDates[0].endDate,
            hours: selectedTimes,
            days: selectedDays,
            teacher: selectedTeacher !== '' ? selectedTeacher.value : '',
        })
        console.log(values)
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
                                date={new Date()}
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
                                <InputDays
                                    selectedDays={selectedDays}
                                    setSelectedDays={setSelectedDays}
                                />
                            </div>

                        </div>
                        <div className='mt-8'>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Seleciona el horario</h3>
                            </div>
                            <div className='mt-4'>
                                <TimeInput
                                    selectedTimes={selectedTimes}
                                    setSelectedTimes={setSelectedTimes}
                                />
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
                                    selectedColor={selectedColor}
                                    setSelectedColor={setSelectedColor}
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
                                    selectedLevels={selectedLevels}
                                    setSelectedLevels={setSelectedLevels}
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
                                    selectedLanguage={selectedLanguage}
                                    setSelectedLanguage={setSelectedLanguage}
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
                                    selected={selectedTeacher}
                                    setSelected={setSelectedTeacher}
                                    placeholder='Seleciona un profesor'
                                />
                            </div>
                        </div>
                        {/* limit */}
                        <div className='pb-4'>
                            <InputLimit
                                selectedLimit={selectedLimit}
                                setSelectedLimit={setSelectedLimit}
                            />
                        </div>
                        <div className='w-full mt-4 md:mt-4 mb-4 md:mb-0'>
                            <button
                                type='button'
                                className='disabled:opacity-95 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition py-2.5 font-semibold text-md text-white bg-indigo-600 bg-cyan w-full'
                                onClick={handleValidateData}
                            >Agregar Nuevo Curso</button>
                            {/* <Button label={"Agregar nuevo curso"} onClick={handleCreateCourse} /> */}
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-[30%] my-5 md:mt-0 md:px-4 ">
                    {course && (
                        <CardCourse
                            isCreating={true}
                            clase={selectedColor !== '' ? selectedColor.value : ''}
                            language={selectedLanguage !== '' ? selectedLanguage?.value : ''}
                            nivel={selectedLevels !== '' ? selectedLevels?.name : ''}
                            studentLimit={selectedLimit}
                            // flag={course.language.path === '' ? '' : `${selectedLanguage?.value}.png`}
                            // status={course.status}
                            hours={selectedTimes}
                            days={selectedDays}
                            teacher={selectedTeacher}
                            startDate={selectedDates[0].startDate}
                            endDate={selectedDates[0].endDate}
                        />
                    )}
                </div>

            </div>
            <ModalCreateCourse
                open={openModalCreate}
                setOpen={setModalOpenCreate}
                cancelButtonRef={cancelCreateCourseRef}
                confirmAction={handleCreatedCourse}
            />
        </ContainerFull>
    )
}
