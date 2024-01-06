import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { InputSelect } from '../../components/inputs/InputSelect';
import { Button } from '../../components/buttons/Button';
import { Wrapper } from '../../components/Wrapper';

import { validatePaymentVoucher } from '../../redux/actions/preRegistration';
import { resetEmailVarification } from '../../redux/reducers/preRegistration';
import { optionsAssessors } from '../../redux/actions/options';

import { PhotoIcon } from '@heroicons/react/24/solid';
import logo from '../../static/image/logo.png';
import { accounts } from '../../static/data';
import { ButtonLoader } from '../../components/buttons/ButtonLoader';


export const FormValidacionPago = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { assessors } = useSelector((state) => state.options);

	const [step, setStep] = useState(1);

	const [previewImage, setPreviewImage] = useState(null);
	const [loadingForm, setLoadingForm] = useState(false);

	const {
		loading,
		email,
		success,
		userPreRegister
	} = useSelector((state) => state.preRegistration)


	useEffect(() => {
		if (email === '') {
			navigate(`/pre-registro`);
		}
	});

	useEffect(() => {
		dispatch(optionsAssessors())
	}, []);

	useEffect(() => {
		if (success) {
			setStep(2)
		}
	}, [success]);

	const [formData, setFormData] = useState({
		assessor: '',
		account: '',
		file: null,
		email: email,
		id: userPreRegister?._id
	});

	const handleRemoveImage = () => {
		setFormData((prevData) => ({
			...prevData,
			file: null,
		}));
		setPreviewImage(null)
	}

	const handeleSubmitValidationPayment = () => {
		setLoadingForm(true);

		const isValid = validForm();
		if (isValid) {
			dispatch(validatePaymentVoucher(formData))
				.then((result) => {
					if (result.status === 200) {
						toast.success(result.message);
					}
					setLoadingForm(false);
				});
		} else {
			toast.error('Por favor, completa todos los campos.');
			setLoadingForm(false);
		}
	}

	const validForm = () => {
		const { assessor, account, file, email, id } = formData;
		if (assessor.trim() === '' || account.trim() === '' || file === null || email.trim() === '' || id === null) {
			return false;
		}
		return true;
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	const handleFileChange = (event) => {

		const file = event.target.files[0];

		setFormData((prevData) => ({
			...prevData,
			file: file,
		}));

		const reader = new FileReader();

		reader.onloadend = () => {
			setPreviewImage(reader.result);
		};

		if (file) {
			reader.readAsDataURL(file);
		} else {
			setPreviewImage(null);
		}
	};

	const handleContinue = () => {
		dispatch(resetEmailVarification())
		navigate(`/pre-registro`);
	}

	const renderStep = () => {
		switch (step) {
			case 1:
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
										Comprobante de pago
									</h1>
								</div>
							</div>
							<div className='flex justify-center items-center mt-4'>
								<div className='w-10/12 mx-auto'>
									<h2 className='text-sm md:text-md font-normal text-gray-600 text-center'>
										Por favor agregue tu comprobante de pago para validarlo.
									</h2>
								</div>
							</div>
							{/* Body form */}
							<div className='flex items-center mt-8'>
								<div className='w-full md:w-10/12 mx-auto grid grid-cols-1 gap-y-4'>
									<label
										htmlFor="cover-photo"
										className='block text-sm font-medium leading-6 text-gray-600 ml-1'
									>
										Comprobante de pago
									</label>
									{!previewImage && (
										<div className='flex justify-center rounded-lg border border-dashed px-6 py-10 mt-2'>
											<div className="text-center">
												<PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
												<div className="mt-4 flex text-sm leading-6 text-gray-600">
													<label
														htmlFor="file-upload"
														className="relative cursor-pointer rounded-mdbg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
													>
														<span>Seleciona tu comprobante de pago</span>
														<input
															id="file-upload"
															name="file-upload"
															type="file"
															className="sr-only"
															onChange={handleFileChange}
														/>
													</label>
												</div>
												<p className="text-xs leading-5 text-gray-600">Tipos de imagen permitidos PNG y JPG.</p>
											</div>
										</div>
									)}
									{previewImage && (
										<div className=''>
											<img
												src={previewImage}
												alt="Comprobante de pago"
												className="mt-4 mx-auto  w-1/3"
											/>
											<div className="mt-6 flex items-center justify-around gap-x-6">
												<Button
													label='Selecionar otra imagen'
													disabled={loading}
													onClick={handleRemoveImage}
												/>
											</div>
										</div>
									)}
									<InputSelect
										id="assessor"
										name="assessor"
										label="Assesor"
										placeholder="Selecione a tu assesor"
										data={assessors}
										optionDefault="Selecione a tu assesor"
										value={formData.assessor}
										onChange={(e) => onChange(e)}
									/>
									<InputSelect
										id="account"
										name="account"
										label="Numero de cuenta bancaria"
										placeholder="Selecione a tu numero de cuenta"
										data={accounts}
										optionDefault="Selecione el numero de cuenta"
										value={formData.account}
										onChange={(e) => onChange(e)}
									/>
								</div>
							</div>
							<div className="flex w-full md:w-11/12 justify-end mt-8">
								<Button
									disabled={loadingForm}
									label={loadingForm
										?
										<ButtonLoader />
										: 'Siguiente'
									}
									onClick={handeleSubmitValidationPayment}
								/>
							</div>

						</div>
					</>
				)
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
									Tu comprobante se ha subido con exito.
								</h1>
							</div>
						</div>
						<div className='flex justify-center items-center mt-4'>
							<div className='w-10/12 mx-auto'>
								<h2 className='text-sm md:text-md font-normal text-gray-600 text-center'>
									Vamos validar tu pago y te enviaremos un correo electronico de confirmacion. Por favor siguelas instruciones del correo electronico.
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
				);

			default:
				return null;
		}
	}

	return (
		<div className='flex w-11/12 md:w-6/12 mx-auto items-baseline h-screen'>
			<Wrapper>
				{renderStep()}
			</Wrapper>
		</div>
	)
}
