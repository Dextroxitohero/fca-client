import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { Modal } from '../../components/modal/Modal';
import { toast } from 'react-hot-toast';

import { validateEmail } from '../../common/validations';

import { InputText } from '../../components/inputs/InputText';
import { ButtonLoader } from '../../components/buttons/ButtonLoader';
import { typeUserOptions } from '../../static/data';
import { createNewUserByInvitation } from '../../redux/actions/users';
import { ComboBox } from '../../components/comboBox/ComboBox';

export const AddNewUserModal = ({ open, setOpen }) => {
	const dispatch = useDispatch();
	const cancelButtonRef = useRef(null);
	const [findUserType, setFindUserType] = useState('');
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		typeUser: '',
	});

	useEffect(() => {
		setFormData({
			email: '',
			typeUser: ''
		});	
	},[open]);


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

	const filteredUserType = findUserType === ''
		? typeUserOptions
		: typeUserOptions.filter((userType) =>
			userType.description
				.toLowerCase()
				.replace(/\s+/g, '')
				.includes(findUserType.toLowerCase().replace(/\s+/g, ''))
		);

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
						<div className='flex items-start mt-4 min-h-[300px]'>
							<div className='w-11/12 mx-auto grid grid-cols-1 gap-6 m-10'>
								<div>
									<h3 className="text-md font-semibold text-gray-900 mb-2">Seleciona a tu coordinador</h3>
									<ComboBox
										filterData={filteredUserType}
										query={findUserType}
										setQuery={setFindUserType}
										selected={formData}
										setSelected={setFormData}
										placeholder='Seleciona un tipo de usuario'
										property='typeUser'
									/>
								</div>
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
								<div className='mt-[20px]'>
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
