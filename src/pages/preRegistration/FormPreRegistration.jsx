import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-hot-toast';

import { validateEmail } from '../../common/validations';
import { Wrapper } from '../../components/Wrapper';
import { InputText } from '../../components/inputs/InputText';

import { emailVerification } from '../../redux/actions/preRegistration';

import logo from '../../static/image/logo.png';

export const FormPreRegistration = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
	});

	const {
		loading,
		emailExist,
		userPreRegister
	} = useSelector((state) => state.preRegistration);

	const onChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	useEffect(() => {
		if (emailExist && userPreRegister === null) {
			navigate(`/validacion-datos`);
		}
		if (emailExist && userPreRegister?.status === 'prospecto') {
			navigate(`/validacion-pago`);
		}
		if (emailExist && userPreRegister?.status === 'validando') {
			navigate(`/validacion-proceso`);
		}
	}, [emailExist, userPreRegister]);



	const handleEmailVarification = () => {
		const { email } = formData;
		const emailValid = validateEmail(email);

		if (!emailValid) {
			toast.error('Ingresa un correo electronico valido');
		}
		if (emailValid) {
			dispatch(emailVerification(email))
		}
	}

	return (
		<div className='flex w-11/12 md:w-5/12 mx-auto items-baseline md:items-center h-screen'>
			<Wrapper>
				<div className='flex justify-center items-center py-10'>
					<div className='w-1/2'>
						<img src={logo} alt="logo" />
					</div>
				</div>
				<div className='flex justify-center items-center mt-2'>
					<div className='w-10/12 mx-auto'>
						<h1 className='text-2xl font-bold text-gray-950  text-center'>
							Bienvenido a CFA
						</h1>
					</div>
				</div>
				<div className='flex justify-center items-center mt-4'>
					<div className='w-10/12 mx-auto'>

						<h2 className='text-sm md:text-md font-normal text-gray-600 text-center'>
							Para continuar con el proceso de registro ingresa tu correo electronico.
						</h2>
					</div>
				</div>
				<div className='flex items-center mt-8'>
					<div className='w-10/12 mx-auto grid grid-cols-1 gap-4'>
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
						<div className='mt-2'>
							<button
								type='button'
								disabled={loading}
								className='disabled:cursor-not-allowed rounded-lg transition py-2.5 font-semibold text-md text-white bg-indigo-600 w-full'
								onClick={handleEmailVarification}
							>Registrar cuenta</button>
						</div>
					</div>
				</div>
				<div className='flex justify-center mt-8 mb-4'>
					<Link to={'/'} className='font-semibold text-indigo-600 text-sm'><span className='text-gray-700'>Ya tienes una cuenta?  </span>Iniciar sesion</Link>
				</div>
			</Wrapper>
		</div>
	);
};
