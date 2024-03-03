import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-hot-toast';

import { Modal } from '../../../components/modal/Modal';
import { ButtonLoader } from '../../../components/buttons/ButtonLoader';
import { InputText } from '../../../components/inputs/InputText';
import { validUrl } from '../../../common/urlValid';

import { addChatMessageToCourse } from '../../../redux/actions/course';


export const ModalAddMessageUrl = ({ open, setOpen, courseId, userId }) => {
	const dispatch = useDispatch();
	const cancelButtonRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		url: '',
		message: '',
	});

	useEffect(() => {
		setFormData({
			url: '',
			message: ''
		});
		setLoading(false);
	}, [open]);


	const onChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	const validateForm = () => {
		if (!validUrl(formData.url)) {
			toast.error('Ingresa un enlance url valido');
			return false;
		}
		if (formData.message === '') {
			toast.error('Ingresa un mensaje');
			return false;
		}
		return true;	
	}

	const handleAddMessageUrl = async () => {
		const valid = validateForm();
		if (valid) {
			setLoading(true);
			dispatch(addChatMessageToCourse(courseId, userId, formData.message,  '', formData.url, 'url'))
				.then((result) => {
					if (result.status === 201) {
						setOpen(false);
						setFormData({
							url: '',
							message: ''
						});
						setLoading(false);
					} else {
						toast.error(result.message);
						setOpen(false);
						setFormData({
							url: '',
							message: ''
						});
						setLoading(false);
					}
				});
		}

	}


	return (
		<Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
			<div className="bg-white p-4">
				<div className="flex flex-col">

					<Dialog.Title as="h3" className="text-center text-lg font-semibold leading-6 text-gray-950">
						Crear un mensaje con enlace
					</Dialog.Title>
					<div className="mt-6">
						<p className="text-sm text-center text-gray-600">
							Aqui puedes crear un mensaje con un enlace que se enviara a tus estudiantes para que puedan acceder a la informacion que necesitas compartir.
						</p>

					</div>
					<div className='w-[90%] mx-auto grid grid-cols-1 gap-4 m-8'>
						<div>
							<InputText
								id={'url'}
								name={'url'}
								type={'url'}
								label={'Ingresa tu enlace'}
								onChange={(e) => onChange(e)}
								value={formData.url}
								placeholder={'Ingresa tu enlace'}
							/>
						</div>
						<div>
							<InputText
								id={'message'}
								name={'message'}
								type={'message'}
								label={'Ingresa tu mensaje'}
								onChange={(e) => onChange(e)}
								value={formData.message}
								placeholder={'Ingresa tu mensaje'}
							/>
						</div>
						<div className='mt-[20px]'>
							<button
								type='button'
								disabled={loading}
								className='disabled:cursor-not-allowed rounded-lg transition py-2.5 font-semibold text-md text-white text-center bg-indigo-600 w-full'
								onClick={() => handleAddMessageUrl()}
							>
								{loading
									? <ButtonLoader />
									: 'Agregar enlace'
								}
							</button>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	)
}
