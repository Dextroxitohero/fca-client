import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { validate } from './validationEmail';
import { useDispatch, useSelector } from "react-redux";

import { Input } from '../../components/inputs/Input';
import { Button } from '../../components/buttons/Button';

import { emailVerification } from '../../redux/actions/preRegistration';

export const FormPreRegistration = () => {
    
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isAuthenticated } = useSelector((state) => state.user);

	if (isAuthenticated) {
		navigate(`/`);
	}

	const {
		loading,
		emailExist,
		userPreRegister
	} = useSelector((state) => state.preRegistration)

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
	}, [emailExist, userPreRegister])


	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validate,
		onSubmit: values => {
			handleEmailVarification(values.email)
		},
	});

	const handleEmailVarification = (email) => {
		dispatch(emailVerification(email))
	}

	return (
		<div
			className="
			min-h-screen 
			bg-gray-50 
			flex flex-col 
			justify-center 
			py-12 
			sm:px-6
			"
		>
			<div className="
			sm:mx-auto 
			sm:w-full 
			sm:max-w-screen-md
			bg-white 
			sm:py-24
			sm:px-24 
			sm:rounded-md
			shadow-md
			"
			>
				<div>
					{/* Header form */}
					<div className="mx-auto max-w-2xl sm:text-start mb-12">
						<h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">Bienvenido CFA</h2>
						<p className="mt-2 text-lg leading-8 text-gray-500">
							Crear una cuenta
						</p>
					</div>
					{/* Body form */}
					<div
						className="
							grid 
							grid-cols-1 
							gap-y-4 
							sm:grid-cols-6 
							mb-16
							"
					>
						<div className="sm:col-span-6">
							<Input
								id="email"
								name="email"
								type="email"
								label="Ingresa tu correo electronico"
								placeholder="Correo electronico"
								formik={formik}
								value={formik.values.email}
								error={formik.touched.email && formik.errors.email}
							/>
						</div>
					</div>
					{/* Footer form */}
					<div
						className="mt-6 flex items-center justify-around gap-x-6"
					>
						<Button
							label='Siguiente'
							disabled={loading}
							onClick={formik.handleSubmit}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
