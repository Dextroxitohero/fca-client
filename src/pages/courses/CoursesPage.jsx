import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ContainerFull } from '../../components/ContainerFull';
import { Heading } from '../../components/Heading';
import { Button } from '../../components/buttons/Button';
import { Wrapper } from '../../components/Wrapper';
import { CardCourse } from './components/CardCourse';

import { useDispatch, useSelector } from 'react-redux';
import { cleanActionSelectedCourse, getAllCourses } from '../../redux/actions/course';
import { CardCourseUser } from './components/CardCourseUser';

export const CoursesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(cleanActionSelectedCourse())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllCourses(user.user._id, user.user.roles))
    }, [dispatch]);

    const courses = useSelector((state) => state.course.courses);

    const handleCreateNewCourse = () => {
        navigate('/nuevo-curso');
    }

    return (
        <ContainerFull>
            <Heading
                title={`Lista de cursos`}
                center={false}
            />

            {
                user.user?.roles === 'admin' && (
                    <div className='w-full flex justify-end mt-4'>
                        <Button label={"Agregar nuevo curso"} onClick={handleCreateNewCourse} />
                    </div>
                )
            }

            <Wrapper>
                <input
                    type="text"
                    placeholder="Buscar un curso"
                    value={''}
                    onChange={() => { }}
                    className='block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ' />
            </Wrapper>

            <Wrapper>
                <div className="w-full">

                    {
                        user.user?.roles === 'admin' ? (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lx:grid-cols-4 gap-6'>
                                {courses.length ?
                                    (courses && courses.map(course => (
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
                                            fromDate={course?.fromDate}
                                            toDate={course?.toDate}
                                            headerImage={course?.headerImage?.urlName}
                                        />
                                    ))) : <h1>No hay ningun curso</h1>
                                }
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 lg:grid-cols-1 gap-6'>
                                {courses.length ?
                                    (courses && courses.map(course => (
                                        <CardCourseUser
                                            key={course._id}
                                            idCourse={course?._id}
                                            color={course?.color}
                                            language={course?.language}
                                            path={course?.path}
                                            nivel={course?.level}
                                            status={course?.status}
                                            hours={course?.hours}
                                            days={course?.days}
                                            teacher={course?.teacher}
                                            fromDate={course?.fromDate}
                                            toDate={course?.toDate}
                                        />
                                    ))) : <h1>No hay ningun curso</h1>
                                }
                            </div>
                        )
                    }
                    {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {courses.length ? 
                        (courses && courses.map(course => (
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
                                fromDate={course?.fromDate}
                                toDate={course?.toDate}
                                headerImage={course?.headerImage?.urlName}
                            />
                        ))) : <h1>No hay ningun curso</h1>
                        }
                    </div> */}
                </div>
            </Wrapper>
        </ContainerFull>
    )
}
