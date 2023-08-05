import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetEmailVarification } from '../../redux/reducers/preRegistration';

export const FormValidacionProceso = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { email } = useSelector((state) => state.preRegistration);

	const handleContinue = () =>{
		dispatch(resetEmailVarification())
		navigate(`/pre-registro`);
	}

	return (
		<main className="
			grid 
			min-h-full 
			place-items-center 
			bg-white 
			px-6 
			py-24 
			sm:py-32 
			lg:px-8
		">
			<div className="text-center">
				<h1 className="
					mt-4 
					text-3xl 
					font-bold 
					tracking-tight 
					text-gray-900 
					sm:text-5xl
				">
					Estamos validando tu pago
				</h1>
				<p className="
					mt-6 
					text-base 
					leading-7 
					text-gray-600
				">
					{`Cuando la vilidacion de tu pago este completada enviaremos un email a `}<strong>{email}</strong> {`con tus accesos.`}
				</p>
				<div className="
					mt-10 
					flex items-center 
					justify-center 
					gap-x-6
				">
					<div
						className="
						rounded-md 
						bg-indigo-600 
						px-3.5 
						py-2.5 
						text-sm 
						font-semibold 
						text-white 
						shadow-sm 
						hover:bg-indigo-500 
						focus-visible:outline 
						focus-visible:outline-2 
						focus-visible:outline-offset-2 
						focus-visible:outline-indigo-600
						"
						onClick={handleContinue}
					>
						Continuar
						<span
							className='ml-3'
							aria-hidden="true"
						>&rarr;
						</span>
					</div>
				</div>
			</div>
		</main>
	)
}
