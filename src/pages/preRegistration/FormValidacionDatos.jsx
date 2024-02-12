import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-hot-toast';


import { Wrapper } from '../../components/Wrapper';
import { InputText } from '../../components/inputs/InputText';
import { Button } from '../../components/buttons/Button';
import { ButtonLoader } from '../../components/buttons/ButtonLoader';
import { ComboBox } from '../../components/comboBox/ComboBox';
import { InputDate } from '../../components/inputDate/InputDate';

import { resetEmailVarification } from '../../redux/reducers/preRegistration';
import { registerPreRegitration } from '../../redux/actions/preRegistration';
import { optionsLanguages } from '../../redux/actions/options';

import { levelEducation, locationState } from '../../static/data';
import logo from '../../static/image/logo.png';

export const FormValidacionDatos = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { languages } = useSelector((state) => state.options);
	const [findLevelEducation, setFindLevelEducation] = useState('');
	const [findLanguage, setFindLanguage] = useState('');
	const [findLocation, setFindLocation] = useState('');
	const [selectDate, setSelectDate] = useState(null);

	const {
		email,
		success,
		loading
	} = useSelector((state) => state.preRegistration);

	const [loadingForm, setLoadingForm] = useState(false);

	useEffect(() => {
		dispatch(optionsLanguages());
	}, [dispatch]);

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

	useEffect(() => {
		setFormData((prevData) => ({
			...prevData,
			dateBirth: selectDate,
		}));
	}, [selectDate]);

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
		const updateState = { ...formData };
		updateState.education = formData.education.description;
		updateState.language = formData.language.description;
		updateState.location = formData.location.description;
		const valid = validarCampos(updateState);
		if (valid) {
			dispatch(registerPreRegitration(updateState))
				.then((result) => {
					if (result?.status === 201) {
						toast.success(result.message);
					} else {
						toast.error(result.message);
					}
					setLoadingForm(false);
				});
		} else {
			setLoadingForm(false);
		}
	};


	const validarCampos = (updateState) => {
		if (updateState.firstName.trim() === '') {
			toast.error('El nombre es requerido');
			return false;
		}
		if (updateState.lastName.trim() === '') {
			toast.error('El apellido paterno es requerido');
			return false;
		}
		if (updateState.phone.trim() === '') {
			toast.error('El telefono es requerido');
			return false;
		}
		if (updateState.dateBirth === null) {
			toast.error('La fecha de nacimiento es requerida');
			return false;
		}
		if (updateState.language === undefined) {
			toast.error('El idioma de interes es requerido');
			return false;
		}
		if (updateState.location === undefined) {
			toast.error('Tu ubicacion es requerida');
			return false;
		}
		if (updateState.education === undefined) {
			toast.error('Tu nivel educativo es requerido');
			return false;
		}
		return true;
	};

	const filteredLocations = findLocation === ''
		? locationState
		: locationState.filter((location) =>
			location.description
				.toLowerCase()
				.replace(/\s+/g, '')
				.includes(findLocation.toLowerCase().replace(/\s+/g, ''))
		);

	const filteredLevelEducations = findLevelEducation === ''
		? levelEducation
		: levelEducation.filter((levelEducation) =>
			levelEducation.description
				.toLowerCase()
				.replace(/\s+/g, '')
				.includes(findLevelEducation.toLowerCase().replace(/\s+/g, ''))
		);

	const filteredLanguages = findLanguage === ''
		? languages
		: languages.filter((language) =>
			language.description
				.toLowerCase()
				.replace(/\s+/g, '')
				.includes(findLanguage.toLowerCase().replace(/\s+/g, ''))
		);

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
								<div className='flex flex-col justify-start items-center my-4'>
									<h3 className="text-md font-semibold text-gray-900 mb-4">Fecha de nacimiento</h3>
									<InputDate
										id={'dateBirth'}
										selected={selectDate}
										onChange={setSelectDate}
									/>
								</div>

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
								<h3 className="text-md font-semibold text-gray-900">Lugar de residencia</h3>
								<ComboBox
									filterData={filteredLocations}
									query={findLocation}
									setQuery={setFindLocation}
									selected={formData}
									setSelected={setFormData}
									placeholder='Selecione el estado donde vives'
									property='location'
								/>
								<h3 className="text-md font-semibold text-gray-900">Idioma de interes</h3>
								<ComboBox
									filterData={filteredLanguages}
									query={findLanguage}
									setQuery={setFindLanguage}
									selected={formData}
									setSelected={setFormData}
									placeholder='Selecione tu idioma de interes'
									property='language'
								/>
								<h3 className="text-md font-semibold text-gray-900">Nivel educativo</h3>
								<ComboBox
									filterData={filteredLevelEducations}
									query={findLevelEducation}
									setQuery={setFindLevelEducation}
									selected={formData}
									setSelected={setFormData}
									placeholder='Seleciona tu nivel educativo'
									property='education'
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
