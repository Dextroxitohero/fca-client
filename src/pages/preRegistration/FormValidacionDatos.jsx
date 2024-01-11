import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-hot-toast';


import { Wrapper } from '../../components/Wrapper';
import { InputText } from '../../components/inputs/InputText';
import { Button } from '../../components/buttons/Button';
import { InputSelect } from '../../components/inputs/InputSelect';
import { InputDate } from '../../components/inputs/InputDate';

import { resetEmailVarification } from '../../redux/reducers/preRegistration';
import { registerPreRegitration } from '../../redux/actions/preRegistration';

import { levelEducation, locationState, languages } from '../../static/data';
import logo from '../../static/image/logo.png';
import { ButtonLoader } from '../../components/buttons/ButtonLoader';

export const FormValidacionDatos = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		email,
		success,
		loading
	} = useSelector((state) => state.preRegistration);
	const [loadingForm, setLoadingForm] = useState(false)

	useEffect(() => {
		if (!email) {
			navigate(`/pre-registro`)
		}
	})

	useEffect(() => {
		if (success) {
			setStep(3)
		}
	}, [success])

	const [step, setStep] = useState(1);
	const totalSteps = 3;

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: email,
		phone: '',
		dateBirth: '',
		location: '',
		language: '',
		education: ''
	});


	const handleContinue = () => {
		dispatch(resetEmailVarification())
		navigate(`/`);
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

	const onChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	const handleFinish = () => {
		setLoadingForm(true);
		const valid = validarCampos();
		if (valid) {
			dispatch(registerPreRegitration(formData));
		} else {
			toast.error('Todos los campos son requeridos');
			setLoadingForm(false);
		}
	};

	const validarCampos = () => {
		for (const key in formData) {
			if (formData.hasOwnProperty(key)) {
				if (formData[key] === '') {
					return false;
				}
			}
		}
		return true;
	};

	const handleDate = (date) => {
		setFormData((prevData) => ({
			...prevData,
			dateBirth: date,
		}));
	}

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
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
									Bienvenido a CFA
								</h1>
							</div>
						</div>
						<div className='flex justify-center items-center mt-4'>
							<div className='w-10/12 mx-auto'>
								<h2 className='text-sm md:text-md font-normal text-gray-600 text-center'>
									Para continuar con el proceso de registro ingresa tu correo electronico y sigue las instrucciones del correo electronico.
								</h2>
							</div>
						</div>
						{/* Body form */}
						<div className='flex items-center mt-8'>
							<div className='w-full md:w-10/12 mx-auto grid grid-cols-1 gap-y-4'>
								<InputText
									id={'firstName'}
									name={'firstName'}
									type={'firstName'}
									label={'Nombre'}
									onChange={(e) => onChange(e)}
									value={formData.firstName}
									placeholder={'Ingresa tu nombre'}
									disabled={false}
								/>
								<InputText
									id={'lastName'}
									name={'lastName'}
									type={'lastName'}
									label={'Apellido Paterno'}
									onChange={(e) => onChange(e)}
									value={formData.lastName}
									placeholder={'Ingresa tu apellido paterno'}
									disabled={false}
								/>
								<InputText
									id={'phone'}
									name={'phone'}
									type={'phone'}
									label={'Telefono'}
									onChange={(e) => onChange(e)}
									value={formData.phone}
									placeholder={'Ingresa tu telefono'}
									disabled={false}
								/>
								<InputDate
									name={'dateBirth'}
									label={'Fecha de nacimiento'}
									onChange={(date) => handleDate(date)}
									value={formData.dateBirth}
									placeholder={'Ingresa tu fecha de nacimiento'}
									disabled={false}
								/>
							</div>
						</div>
						<div className="flex w-full md:w-11/12 justify-end mt-8">
							<Button
								label='Siguiente'
								onClick={handleNext}
							/>
						</div>

					</div>
				);
			case 2:
				return (
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
									Informacion de interes
								</h1>
							</div>
						</div>
						<div className='flex justify-center items-center mt-4'>
							<div className='w-10/12 mx-auto'>
								<h2 className='text-sm md:text-md font-normal text-gray-600 text-center'>
									Ingresa la siguiente informacion para completar tu registro.
								</h2>
							</div>
						</div>
						{/* Body form */}
						<div className='flex items-center mt-8'>
							<div className='w-full md:w-10/12 mx-auto grid grid-cols-1 gap-y-4'>
								<InputSelect
									id="location"
									name="location"
									label="Lugar de residencia"
									placeholder="Selecione el estado donde vives"
									data={locationState}
									optionDefault="Selecione su estado"
									value={formData.location}
									onChange={(e) => onChange(e)}
								/>
								<InputSelect
									id="language"
									name="language"
									label="Idioma de interes"
									placeholder="Selecione tu idioma de interes"
									data={languages}
									optionDefault="Selecione un idioma"
									value={formData.language}
									onChange={(e) => onChange(e)}
								/>
								<InputSelect
									id="education"
									name="education"
									label="Nivel Educativo"
									placeholder="Selecione un genero"
									data={levelEducation}
									optionDefault="Selecione su nievel educativo"
									value={formData.education}
									onChange={(e) => onChange(e)}
								/>
							</div>
						</div>
						{/* Footer form */}
						<div className="flex w-full md:w-10/12 mx-auto justify-between mt-8">
							<Button
								label='Regresar'
								disabled={loading}
								onClick={handlePrev}
							/>
							<Button
								label={loadingForm
									? <ButtonLoader />
									: 'Siguiente'
								}
								disabled={loading}
								onClick={handleFinish}
							/>
						</div>
					</div>
				);
			case 3:
				return (
					<>
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
										Registro completado con exito
									</h1>
								</div>
							</div>
							<div className='flex justify-center items-center mt-4'>
								<div className='w-10/12 mx-auto'>
									<h2 className='text-sm md:text-md font-normal text-gray-600 text-center'>
										Vas a recibir un correo electronico con las instruciones para realizar tu pago.
									</h2>
								</div>
							</div>
							{/* Body form */}

							{/* Footer form */}
							<div className="flex w-full md:w-10/12 mx-auto justify-center mt-8">
								<div
									onClick={handleContinue}
									className="rounded-lg bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
									Continuar
									<span
										className='ml-3'
										aria-hidden="true"
									>&rarr;
									</span>
								</div>
							</div>
						</div>
					</>
				);

			default:
				return null;
		}
	};



	return (
		<div className='flex w-11/12 md:w-6/12 mx-auto items-baseline md:items-center h-screen'>
			<Wrapper>
				{renderStep()}
			</Wrapper>
		</div>
	);
};
