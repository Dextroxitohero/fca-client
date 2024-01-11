import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog } from '@headlessui/react'
import { Modal } from '../../components/modal/Modal';
import { toast } from 'react-hot-toast';

import { validateEmail } from '../../common/validations';

import { InputText } from '../../components/inputs/InputText';
import { InputSelect } from '../../components/inputs/InputSelect';
import { ButtonLoader } from '../../components/buttons/ButtonLoader';
import { typeUserOptions } from '../../static/data';
import { createNewUserByInvitation } from '../../redux/actions/users';

export const AddNewUserModal = ({ open, setOpen }) => {
	const dispatch = useDispatch();
	const cancelButtonRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		typeUser: '',
	});

	const onChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	const formValidations = () => {
		const { email, typeUser } = formData;
		const emailValid = validateEmail(email);

		if (!emailValid && !typeUser) {
			toast.error('Ingresa un correo electronico valido y selecciona el tipo de usuario');
			setLoading(false);
			return false;
		}

		if (!emailValid) {
			toast.error('Ingresa un correo electronico valido');
			setLoading(false);
			return false;
		}

		if (!typeUser) {
			toast.error('Selecciona el tipo de usuario');
			setLoading(false);
			return false;
		}

		return true;
	}

	const handleSendEmail = () => {
		setLoading(true);
		const { email, typeUser } = formData;
		const formValidation = formValidations();
		if (formValidation) {
			// toast.success('Se envio la invitacion correctamente');
			dispatch(createNewUserByInvitation({ email, typeUser }))
				.then((result) => {
					if (result.status === 201) {
						toast.success(result.message);
						setOpen(false);
						setFormData({
							email: '',
							typeUser: ''
						});
					}
					if (result.status === 409) {
						toast.error(result.message);
					}
					setLoading(false);
				});
		}



	}



	return (
		<Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
			<div className="bg-white px-4 py-4">
				<div className="sm:flex sm:items-center">

					<div>
						<Dialog.Title as="h3" className="text-center text-lg font-semibold leading-6 text-gray-950">
							Crear invitacion para nuevo usuario
						</Dialog.Title>
						<div className="mt-6">
							<p className="text-sm text-center text-gray-600">
								Ingresa correo electronico y tipo de usuario que deseas invitar a la plataforma.
							</p>

						</div>
						<div className='flex items-center mt-4'>
							<div className='w-11/12 mx-auto grid grid-cols-1 gap-6'>
								<div>
									<InputText
										id={'email'}
										name={'email'}
										type={'email'}
										label={'Correo Electronico'}
										onChange={(e) => onChange(e)}
										value={formData.email}
										placeholder={'Ingresa tu correo electronico'}
										disabled={false}
									/>
								</div>
								<div>
									<InputSelect
										id="typeUser"
										name="typeUser"
										label="Tipo de usuario"
										placeholder="Selecione el tipo de usuario"
										data={typeUserOptions}
										optionDefault="Selecione el tipo de usuario"
										value={formData.typeUser}
										onChange={(e) => onChange(e)}
									/>
								</div>
								<div className='mt-2'>
									<button
										type='button'
										disabled={loading}
										className='disabled:cursor-not-allowed rounded-lg transition py-2.5 font-semibold text-md text-white text-center bg-indigo-600 w-full'
										onClick={handleSendEmail}
									>
										{loading
											? <ButtonLoader />
											: 'Enviar invitacion'
										}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	)
}
