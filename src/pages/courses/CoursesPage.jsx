import { useEffect } from 'react';
import { ContainerFull } from '../../components/ContainerFull';
import { Heading } from '../../components/Heading';
import { Button } from '../../components/buttons/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cleanActionSelectedCourse, getAllCourses } from '../../redux/actions/course';
import { CardCourse } from './components/CardCourse';

export const CoursesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(cleanActionSelectedCourse())
    }, []);
    
    useEffect(() => {
        dispatch(getAllCourses())
    }, []);

    const  courses  = useSelector((state) => state.course.courses);

    const handleCreateNewCourse = () => {
        navigate('/nuevo-curso');
    }

    return (
        <ContainerFull>
            <Heading
                title={`Lista de cursos`}
                center={false}
            />

            <div className='w-full flex justify-end mt-10'>
                <Button label={"Agregar nuevo curso"} onClick={handleCreateNewCourse} />
            </div>

            <div className="w-full md:w-6/6 py-5 px-10">
                <div className='grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8'>
                    {courses && courses.map(course => (
                        <CardCourse
                            key={course._id}
                            isCreating={false}
                            idCourse={course?._id}
                            color={course?.color}
                            language={course?.language}
                            path={course?.path}
                            nivel={course?.level}
                            studentLimit={course.limitMembers}
                            status={course?.status}                            
                            hours={course?.hours}
                            days={course?.days}
                            teacher={course?.teacher}
                            startDate={course?.startDate}
                            endDate={course?.endDate}
                        />
                    ))}
                </div>
            </div>

        </ContainerFull>
    )
}