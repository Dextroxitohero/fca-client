import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { validate } from './validationDatos';
import { levelEducation, locationState, language } from '../../static/data';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { useDispatch, useSelector } from "react-redux";


import { Input } from '../../components/inputs/Input';
import { Button } from '../../components/buttons/Button';
import { InputSelect } from '../../components/inputs/InputSelect';
import { InputSingleDatePicker } from '../../components/inputs/InputSingleDatePicker';

import { resetEmailVarification } from '../../redux/reducers/preRegistration';
import { registerPreRegitration } from '../../redux/actions/preRegistration';


export const FormValidacionDatos = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [step, setStep] = useState(1);
	const totalSteps = 3;

	const {
		email,
		success,
		loading
	} = useSelector((state) => state.preRegistration);

	const handleContinue = () => {
		dispatch(resetEmailVarification())
		navigate(`/pre-registro`);
	}

	useEffect(() => {
		if (!email) {
			navigate(`/pre-registro`)
		}
	}, [])

	useEffect(() => {
		if (success) {
			setStep(3)
		}
	}, [success])

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: email,
			phone: '',
			dateBirth: '',
			location: '',
			education: '',
			language: ''
		},
		validate,
		onSubmit: values => {
			// alert(JSON.stringify(values, null, 2));
			const date = new Date(values.dateBirth);
			const formattedDate = format(date, 'yyyy-MM-dd');
			values.dateBirth = formattedDate;
			handleFinish(values)
		},
	});

	// const handleReset = () => {
	// 	formik.resetForm();
	// }

	const handleFinish = (values) => {
		dispatch(registerPreRegitration(values))
	};

	const handleNext = () => {
		if (step < totalSteps) {
			setStep(step + 1);
		}
	};

	const handlePrev = () => {
		if (step > 1) {
			setStep(step - 1);
		}
	};



	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<div>
						{/* Header form */}
						<div className="
							mx-auto 
							max-w-2xl 
							sm:text-start 
							mb-12
						">
							<h2 className="
								text-3xl 
								font-semibold 
								tracking-tight 
								text-gray-900 
								sm:text-4xl
							">
								Bienvenido CFA
							</h2>
							<p className="
								mt-2 
								text-lg 
								leading-8 
								text-gray-500
							">
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
						">
							<div className="sm:col-span-6">
								<Input
									id="firstName"
									name="firstName"
									type="text"
									label="Nombre"
									placeholder="Ingresa tu nombre"
									formik={formik}
									value={formik.values.firstName}
									error={formik.touched.firstName && formik.errors.firstName}
								/>
							</div>
							<div className="sm:col-span-6">
								<Input
									id="lastName"
									name="lastName"
									type="text"
									label="Apellido Paterno"
									placeholder="Ingresa tu nombre"
									formik={formik}
									value={formik.values.lastName}
									error={formik.touched.lastName && formik.errors.lastName}
								/>
							</div>
							<div className="sm:col-span-6">
								<Input
									id="phone"
									name="phone"
									type="text"
									label="Telefono"
									placeholder="Ingresa tu numero de telefono"
									formik={formik}
									value={formik.values.phone}
									error={formik.touched.phone && formik.errors.phone}
								/>
							</div>
							<div className="sm:col-span-6">
								<InputSingleDatePicker
									id='dateBirth'
									name='dateBirth'
									label='Fecha de nacimiento'
									formik={formik}
									value={formik.values.dateBirth}
									error={formik.touched.dateBirth && formik.errors.dateBirth}
								/>
							</div>

						</div>
						{/* Footer form */}
						<div
							className="mt-6 flex items-center justify-around gap-x-6"
						>
							<Button
								label='Siguiente'
								onClick={handleNext}
							/>
						</div>

					</div>
				);
			case 2:
				return (
					<>
						{/* Header form */}
						<div className="
							mx-auto 
							max-w-2xl 
							sm:text-start 
							mb-12
						">
							<h2 className="
								text-3xl 
								font-semibold 
								tracking-tight 
								text-gray-900 
								sm:text-4xl
							">
								Informacion de interes
							</h2>
							<p className="
								mt-2 
								text-lg 
								leading-8 
								text-gray-500
							">
								Ingresa la siguiente informacion para completar tu registro.
							</p>
						</div>
						{/* Body form */}
						<div
							className="
							grid 
							grid-cols-1 
							gap-y-4 
							sm:grid-cols-6 
							mb-24
							"
						>
							<div className="sm:col-span-6">
								<InputSelect
									id="location"
									name="location"
									label="Estado"
									placeholder="Selecione el estado donde vives"
									formik={formik}
									data={locationState}
									optionDefault="Selecione su estado"
									value={formik.values.location}
									error={formik.touched.location && formik.errors.location}
								/>
							</div>
							<div className="sm:col-span-6">
								<InputSelect
									id="education"
									name="education"
									label="Nivel Educativo"
									placeholder="Selecione un genero"
									formik={formik}
									data={levelEducation}
									optionDefault="Selecione su nievel educativo"
									value={formik.values.education}
									error={formik.touched.education && formik.errors.education}
								/>
							</div>
							<div className="sm:col-span-6">
								<InputSelect
									id="language"
									name="language"
									label="Idioma de interes"
									placeholder="Selecione un idioma"
									formik={formik}
									data={language}
									optionDefault="Selecione un idioma"
									value={formik.values.language}
									error={formik.touched.language && formik.errors.language}
								/>
							</div>
						</div>
						{/* Footer form */}
						<div
							className="mt-6 flex items-center justify-around gap-x-6"
						>
							<Button
								label='Regresar'
								disabled={loading}
								onClick={handlePrev}
							/>
							<Button
								label='Siguiente'
								disabled={loading}
								onClick={formik.handleSubmit}
							/>
						</div>
					</>
				);
			case 3:
				return (
					<>
						{/* Header form */}
						<div className="
							mx-auto 
							max-w-2xl 
							sm:text-center 
							mb-12
						">
							<h2 className="
								text-3xl 
								font-semibold 
								tracking-tight 
								text-gray-900 
								sm:text-4xl
							">
								El registro se acompletado
							</h2>
							<p className="mt-6 text-lg leading-8 text-gray-500">
								Vas recibir un correo electronico con las instruciones para realizar tu pago.
							</p>
						</div>
						{/* Body form */}
						<div className="
							mt-10 
							flex items-center 
							justify-center 
							gap-x-6
						">
							<div
								onClick={handleContinue}
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
							">
								Continuar
								<span
									className='ml-3'
									aria-hidden="true"
								>&rarr;
								</span>
							</div>

						</div>
					</>
				);

			default:
				return null;
		}
	};



	return (
		<div
			className="
			min-h-screen 
			bg-gray-50 
			flex flex-col 
			justify-center 
			py-12 
			sm:px-6
		">
			<div className="
				sm:mx-auto 
				sm:w-full 
				sm:max-w-screen-md
				bg-white 
				sm:py-24
				sm:px-24 
				sm:rounded-md
				shadow-md
			">
				{renderStep()}
			</div>
		</div>
	);
};
