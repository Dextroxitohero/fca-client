import Reac, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ContainerFull } from '../../components/ContainerFull';
import { Heading } from '../../components/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById } from '../../redux/actions/course';
import { CardCourse } from './components/CardCourse';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { es } from 'react-date-range/dist/locale';
import { addDays } from 'date-fns';
import { ComboBox } from '../../components/comboBox/ComboBox';
import { optionsAllTeachers } from '../../redux/actions/options';
import { TimeInput } from '../../components/inputTime/InputTime';
import { InputDays } from '../../components/inputDays/InputDays';

export const CourseEdit = () => {
    const { idCourse } = useParams()
    const { course } = useSelector((state) => state.course.courseSelected);
    const { teachers } = useSelector((state) => state.options);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCourseById(idCourse))
    }, [dispatch]);

    useEffect(() => {
        dispatch(optionsAllTeachers())
    }, [dispatch]);

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
    const [teacherSelected, setTeacherSelected] = useState('');
    const filteredTeachers = findTeacher === ''
        ? teachers
        : teachers.filter((teacher) =>
            teacher.description
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(findTeacher.toLowerCase().replace(/\s+/g, ''))
        );

    const handleValidateData = () =>{
        console.log(selectedDates)
        console.log(selectedTimes)
        console.log(selectedDays)
        console.log(teacherSelected)
    }

    return (
        <ContainerFull>
            <Heading
                title={`Modulo de edicion curso`}
                subtitle={`Edita y modifica los paramatros asignado al curso`}
                center={false}
            />
            <div className="w-full flex flex-col md:flex-row mt-5 md:mt-10">
                <div className="w-full md:w-4/6 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
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
                    <div>
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
                    <div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Seleciona al profesor</h3>
                        </div>
                        <div className='p-0 md:p-2'>
                            <ComboBox
                                filterData={filteredTeachers}
                                query={findTeacher}
                                setQuery={setFindTeacher}
                                selected={teacherSelected}
                                setSelected={setTeacherSelected}
                            />
                        </div>

                    </div>

                </div>
                <div className="w-full md:w-2/6 my-5 md:mt-0 px-0 md:px-5 ">
                    {course && (
                        <CardCourse
                            isCreating={true}
                            clase={course.color.clase}
                            language={course.language.name}
                            nivel={course.level.name}
                            studentLimit={course.limitMembers}
                            flag={course.language.path === '' ? '' : `${course.language.name}.png`}
                            status={course.status}
                            hours={selectedTimes}
                            days={selectedDays}
                            teacher={teacherSelected}
                            startDate={selectedDates[0].startDate}
                            endDate={selectedDates[0].endDate}
                        />
                    )}
                    <div className='w-full mt-5 md:mt-10 md:mb-4'>
                        <button
                            type='button'
                            className='disabled:opacity-95 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition py-3 font-semibold text-md text-white bg-indigo-600 bg-cyan w-full'
                            onClick={handleValidateData}
                        >Agregar Nuevo Curso</button>
                        {/* <Button label={"Agregar nuevo curso"} onClick={handleCreateCourse} /> */}
                    </div>
                </div>

            </div>
        </ContainerFull>
    )
}
