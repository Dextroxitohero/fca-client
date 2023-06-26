import React, { useState } from 'react';
import { useFormik } from 'formik';
import { validate } from './validation';
import { levelEducation, locationState } from '../../static/data';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';


import { Input } from '../../components/inputs/Input';
import { Button } from '../../components/buttons/Button';
import { InputSelect } from '../../components/inputs/InputSelect';
import { InputSingleDatePicker } from '../../components/inputs/InputSingleDatePicker'


export const FormPreRegistration = () => {
	const [step, setStep] = useState(1);
	const totalSteps = 3;

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			dateBirth: '',
			location: '',
			education: ''
		},
		validate,
		onSubmit: values => {
			console.log(new Date(values.dateBirth))
			const date = new Date(values.dateBirth);
			const formattedDate = format(date, 'yyyy-MM-dd');
			// const formattedDate = format(date, 'eeee, d MMMM yyyy', { locale: es });
			console.log(formattedDate)
			alert(JSON.stringify(values, null, 2));
		},

	});

	const handleReset = () => {
		formik.resetForm();
	}

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
	const handleFinish = () => {
		if (Object.entries(formik.errors).length === 0) {
			formik.handleSubmit()
		} else {
			toast.error("Completa todos los campos");
		}
	};

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
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
									id="email"
									name="email"
									type="email"
									label="Correo electronico"
									placeholder="Ingresa tu correo electronico"
									formik={formik}
									value={formik.values.email}
									error={formik.touched.email && formik.errors.email}
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
						<div className="mx-auto max-w-2xl sm:text-start mb-12">
							<h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">Informacion de interes</h2>
							<p className="mt-2 text-lg leading-8 text-gray-500">
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
								label='Regresar'
								onClick={handlePrev}
							/>
							<Button
								label='Siguiente'
								onClick={handleFinish}
							/>
						</div>
					</>
				);
			case 3:
				return (
					<>
						{/* Header form */}
						<div className="mx-auto max-w-2xl sm:text-center mb-12">
							<h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">El registro se acompletado</h2>
							<p className="mt-6 text-lg leading-8 text-gray-500">
								Vas recibir un correo electronico con las instruciones para realizar tu pago.
							</p>
						</div>
						{/* Body form */}
						<div
							className="mt-6 flex items-center justify-around gap-x-6"
						>
							<Button
								label='Continua'
								onClick={handleNext}
							/>
						</div>
					</>
				);;
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
				{renderStep()}
			</div>
		</div>
	);
};
