import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { Button } from '../../components/buttons/Button';
import { Wrapper } from '../../components/Wrapper';

import { validatePaymentVoucher } from '../../redux/actions/preRegistration';
import { resetEmailVarification } from '../../redux/reducers/preRegistration';
import { optionsAllAccountsBank, optionsCoordinadors } from '../../redux/actions/options';

import { PhotoIcon } from '@heroicons/react/24/solid';
import logo from '../../static/image/logo.png';
import { ButtonLoader } from '../../components/buttons/ButtonLoader';
import { ComboBox } from '../../components/comboBox/ComboBox';
import { InputAccountBank } from '../../components/inputAccountBank/InputAccountBank';


export const FormValidacionPago = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [findCoordinador, setFindCoordinador] = useState('');
	const { coordinadors, accountsBank } = useSelector((state) => state.options);

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
		dispatch(optionsCoordinadors());
		dispatch(optionsAllAccountsBank());
	}, []);

	useEffect(() => {
		if (success) {
			setStep(2)
		}
	}, [success]);

	const [formData, setFormData] = useState({
		coordinador: '',
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
		const updateState = { ...formData }
		updateState.coordinador = formData.coordinador.value || '';
		updateState.account = formData.account._id || '';
		const isValid = validForm(updateState);
		if (isValid) {
			dispatch(validatePaymentVoucher(updateState))
				.then((result) => {
					if (result.status === 200) {
						toast.success(result.message);
					}
					setLoadingForm(false);
				});
		} else {
			setLoadingForm(false);
		}
	}

	const validForm = (updateState) => {
		if (updateState.coordinador.trim() === '') {
			toast.error('Seleccione a su coordinador.');
			return false;
		}
		if (updateState.account.trim() === '') {
			toast.error('Seleccione la cuenta de pago.');
			return false;
		}
		if (updateState.file === null) {
			toast.error('Seleccione su comprobante de pago.');
			return false;
		}
		return true;
	};

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

	const filteredCoordinadors = findCoordinador === ''
		? coordinadors
		: coordinadors.filter((coordinador) =>
			coordinador.description
				.toLowerCase()
				.replace(/\s+/g, '')
				.includes(findCoordinador.toLowerCase().replace(/\s+/g, ''))
		);


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
									<h3 className="text-md font-semibold text-gray-900">Comprobante de pago</h3>
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

									<h3 className="text-md font-semibold text-gray-900 mt-4">Seleciona a tu coordinador</h3>
									<ComboBox
										filterData={filteredCoordinadors}
										query={findCoordinador}
										setQuery={setFindCoordinador}
										selected={formData}
										setSelected={setFormData}
										placeholder='Selecione a tu coordinador'
										property='coordinador'
									/>
									<h3 className="text-md font-semibold text-gray-900 mt-4">Seleciona la cuenta de pago</h3>
									<InputAccountBank
										accountsBank={accountsBank}
										accountSelected={formData}
										setAccountSelected={setFormData}
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
