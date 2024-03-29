import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

import { ContainerFull } from '../../components/ContainerFull';
import { Wrapper } from '../../components/Wrapper';
import { Heading } from '../../components/Heading';
import { Button } from '../../components/buttons/Button';
import { AddNewHeaderImagen } from './AddNewHeaderImagen';

import { firstCapitalLetter } from '../../common/upperCaseWord';
import { getAllHeadersImages, removeHeaderImage } from '../../redux/actions/setting';
import { ConfirmirRemoverHeaderImage } from './ConfirmirRemoverHeaderImage';
import { EditHeaderImagen } from './EditHeaderImage';

export const SettingImageHeader = () => {
	const dispatch = useDispatch();
	const [openAddNewHeaderImage, setOpenAddNewHeaderImagen] = useState(false);
	const [openEditHeaderImage, setOpenEditHeaderImagen] = useState(false);
	const [openconfirmRemoveHeaderImage, setOpenconfirmRemoveHeaderImage] = useState(false);
	const [selectedEditHeaderImage, setSelectedEditImage] = useState(null);
	const [selectedRemoveHeaderImage, setSelectedRemoveHeaderImage] = useState(null);
	const headersImage = useSelector((state) => state.setting.headersImage);

	useEffect(() => {
		dispatch(getAllHeadersImages())
	}, []);

	useEffect(() => {
		setSelectedEditImage(null);
	}, [openEditHeaderImage]);

	const confirmRemoveHeaderImage = (header) => {
		setOpenconfirmRemoveHeaderImage(true);
		setSelectedRemoveHeaderImage(header);
	}

	const editHeaderImage = (header) => {
		setSelectedEditImage(header);
		setOpenEditHeaderImagen(true);
	}

	const handleRemoveHeaderImage = (header) => {
		dispatch(removeHeaderImage(header))
			.then((result) => {
				if (result.status === 200) {
					toast.success(result.message);
					dispatch(getAllHeadersImages());
				}
				if (result.status === 404) {
					toast.error(result.message);
				}
				if (result.status === 500) {
					toast.error(result.message);
				}
				setSelectedRemoveHeaderImage(null);
				setOpenconfirmRemoveHeaderImage(false);

			});
	}

	return (
		<ContainerFull>
			<Heading
				title={'Imagenes de encabezado'}
				center={false}
			/>
			<div className='w-full flex justify-end mt-4'>
				<Button label={"Nuevo encabezado"} onClick={() => setOpenAddNewHeaderImagen(true)} />
			</div>

			<Wrapper>
				<div className="w-full">
					<div className='mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
						{
							headersImage.length ? (headersImage.map((header, index) => (
								<div key={index}>
									<div className='text-lg font-semibold text-gray-600 flex justify-center flex-col items-center border p-4 rounded-md'>
										<h3 className='mb-4'>{firstCapitalLetter(header.name)}</h3>
										<img src={header.urlName} alt={header.name} className="mx-auto mb-6 w-11/12 flex-shrink-0 rounded-md shadow-sm" />
										<div className='w-full flex justify-around'>
											<Button
												label={'Editar'}
												onClick={() => editHeaderImage(header)}
												/>
											<Button
												label={'Eliminar'}
												onClick={() => confirmRemoveHeaderImage(header)}
											/>
										</div>
									</div>
								</div>
							))) : <h1>No hay encabezados de imagenes</h1>
						}
					</div>
				</div>
			</Wrapper>
			<AddNewHeaderImagen
				open={openAddNewHeaderImage}
				setOpen={setOpenAddNewHeaderImagen}
			/>
			<EditHeaderImagen
				open={openEditHeaderImage}
				setOpen={setOpenEditHeaderImagen}
				state={selectedEditHeaderImage}
			/>
			<ConfirmirRemoverHeaderImage
				open={openconfirmRemoveHeaderImage}
				setOpen={setOpenconfirmRemoveHeaderImage}
				title={'Eliminacion de encabezado de imagen'}
				message={'Estas seguro que deseas eliminar este encabezado de imagen?'}
				confirmAction={() => handleRemoveHeaderImage(selectedRemoveHeaderImage)}
				labelButonConfirm={'Eliminar'}
			/>
		</ContainerFull>
	)
}
