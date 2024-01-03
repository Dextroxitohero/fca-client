import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Wrapper } from '../../components/Wrapper';

import { resetEmailVarification } from '../../redux/reducers/preRegistration';

import logo from '../../static/image/logo.png';

export const FormValidacionProceso = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { email } = useSelector((state) => state.preRegistration);

	useEffect(() => {
		if (!email) {
			navigate(`/pre-registro`)
		}
	});

	const handleContinue = () => {
		dispatch(resetEmailVarification())
		navigate(`/pre-registro`);
	}

	return (
		<div className='flex w-11/12 md:w-6/12 mx-auto items-baseline md:items-center h-screen'>
			<Wrapper>
				<div>
					{/* Header form */}
					<div className='flex justify-center items-center py-4'>
						<div className='w-1/3'>
							<img src={logo} alt="logo" />
						</div>
					</div>
					<div className='flex justify-center items-center mt-2'>
						<div className='w-10/12 mx-auto'>
							<h1 className='text-2xl font-bold text-gray-950  text-center'>
								Estamos validando tu pago
							</h1>
						</div>
					</div>
					<div className='flex justify-center items-center mt-4'>
						<div className='w-10/12 mx-auto'>
							<h2 className='text-sm md:text-md font-normal text-gray-600 text-center'>
								Cuando la vilidacion de tu pago este completada enviaremos un email a <strong>{email}</strong> con tus accesos.
							</h2>
						</div>
					</div>
					{/* Body form */}

					{/* Footer form */}
					<div className="flex w-full md:w-10/12 mx-auto justify-center mt-8">
						<div
							onClick={handleContinue}
							className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							Continuar
							<span
								className='ml-3'
								aria-hidden="true"
							>&rarr;
							</span>
						</div>
					</div>
				</div>
			</Wrapper>
		</div>	
	)
}
