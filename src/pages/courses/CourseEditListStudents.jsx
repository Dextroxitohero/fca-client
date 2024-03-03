import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

import { ContainerFull } from '../../components/ContainerFull';
import { Wrapper } from '../../components/Wrapper';
import { Heading } from '../../components/Heading';
import { Button } from '../../components/buttons/Button';
import { capitalizarPalabras } from '../../common/upperCaseWord';
import { ModalDeleteStudentList } from './components/ModalDeleteStudentList';
import { ModalAddStudentToCourse } from './components/ModalAddStudentToCourse';

import { deleteStudentFromCourse, getListStudentsByIdCourse, getListStudentsNotInCourse } from '../../redux/actions/course';


export const CourseEditListStudents = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const idCourse = params?.idCourse;

	const [openModalDeleteStudentList, setModalOpenDeleteStudentList] = useState(false);
	const [selectStudentDelete, setSelectStudentDelete] = useState(null);
	const cancelDeleteStudentListRef = useRef(null);
	const [loadingDeleteStudent, setLoadingDeleteStudent] = useState(false);
	const [openAddStudentToCourseModal, setOpenAddStudentToCourseModal] = useState(false);

	const user = useSelector((state) => state.user);
	const { courseListSelected } = useSelector((state) => state.course);

	useEffect(() => {
		if (idCourse) {
			dispatch(getListStudentsByIdCourse(idCourse));
		}
	}, [idCourse]);


	useEffect(() => {
        dispatch(getListStudentsNotInCourse(idCourse))
    }, [dispatch]);


	useEffect(() => {
		if (openModalDeleteStudentList === false) {
			setSelectStudentDelete(null)
		}
	}, [openModalDeleteStudentList]);

	const handleDeleteStudentList = (student) => {
		setSelectStudentDelete(student);
		setModalOpenDeleteStudentList(true);
	}

	const handleConfirmDeleteStudentList = () => {
		setLoadingDeleteStudent(true);
		dispatch(deleteStudentFromCourse(idCourse, selectStudentDelete.id))
			.then((result) => {
				if (result.status === 200) {
					toast.success(result.message);
					setModalOpenDeleteStudentList(false);
					setSelectStudentDelete(null);
					dispatch(getListStudentsNotInCourse(idCourse));
				} else {
					toast.error(result.message);
				}
				setLoadingDeleteStudent(false);
			});
	}

	return (
		<ContainerFull>
			<Heading
				title={`Lista de estudiantes inscritos al curso`}
				center={false}
			/>
			{
				user.user?.roles === 'admin' && (
					<div className='w-full flex justify-end mt-4'>
						<Button label={"Agregar alumno"} onClick={() => setOpenAddStudentToCourseModal(true)} />
					</div>
				)
			}
			<Wrapper>
				<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					{courseListSelected.length > 0
						? courseListSelected.map(({ _id, avatarUrl = 'https://res.cloudinary.com/dax0v05jz/image/upload/v1708645791/uploads/hbzdzch5ldxw6pszwmej.png', matricula, firstName, lastName }) => (
							<div className='flex flex-wrap border-[2px] border-gray-200  rounded-lg p-4' key={_id}>
								<div
									className='w-full flex'>
									<div className='p-4'>
										<img className="ring-[4px] ring-gray-200 h-14 w-14 rounded-full" src={avatarUrl} alt="Imagen de usuario" />
									</div>
									<div className='ml-4'>
										<p className='text-[.8rem] font-semibold text-gray-500'>Matricula</p>
										<p className='text-[1rem] font-semibold text-gray-900'>{matricula}</p>
										<p className='text-[.8rem] font-semibold text-gray-500'>Nombre:</p>
										<p className='text-[1rem] font-semibold text-gray-900'>{capitalizarPalabras(`${firstName} ${lastName}`)}</p>
									</div>
								</div>
								{user.user?.roles === 'admin' && (
									<div className='w-full flex justify-end mt-4'>
										<button
											className='bg-red-600 hover:bg-red-700 text-white rounded-md py-1 px-4'
											onClick={() => handleDeleteStudentList({ id: _id, name: `${firstName} ${lastName}` })}
										>
											Eliminar
										</button>
									</div>
								)}
							</div>
						))
						: (<p>No hay alumnos inscriptos en este curso.</p>)
					}
				</div>
			</Wrapper>
			<ModalDeleteStudentList
				open={openModalDeleteStudentList}
				setOpen={setModalOpenDeleteStudentList}
				cancelButtonRef={cancelDeleteStudentListRef}
				confirmAction={handleConfirmDeleteStudentList}
				loadingDeleteStudent={loadingDeleteStudent}
				title={'Eliminar alumno del curso'}
				student={selectStudentDelete}
				labelButonConfirm={'Eliminar alumno'}
			/>
			<ModalAddStudentToCourse
				open={openAddStudentToCourseModal}
				setOpen={setOpenAddStudentToCourseModal}
				idCourse={idCourse}
			/>
		</ContainerFull>
	)
}