import React, { useEffect, useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { InputSelect } from '../../components/inputs/InputSelect';
import { useFormik } from 'formik';
import { Button } from '../../components/buttons/Button';
import { validate } from './validationPago';
import { validatePaymentVoucher } from '../../redux/actions/preRegistration';


import { accounts, assessor } from '../../static/data';
import { resetEmailVarification } from '../../redux/reducers/preRegistration';
import { optionsAssessors } from '../../redux/actions/options';


export const FormValidacionPago = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [step, setStep] = useState(1);

	const [previewImage, setPreviewImage] = useState(null);

	const {
		loading,
		email,
		success,
		userPreRegister
	} = useSelector((state) => state.preRegistration)

	const { assessors } = useSelector((state) => state.options);

	useEffect(() => {
		if(success){
			setStep(2)
		}
	}, [success])
	

	useEffect(() => {
		if (email === '') {
			navigate(`/pre-registro`);
		}
	}, [email])

	useEffect(() => {
		dispatch(optionsAssessors())
	}, [])

	const formik = useFormik({
		initialValues: {
			account: '',
			assessor: '',
			file: null,
			email: email,
			id: userPreRegister?._id
		},
		validate,
		onSubmit: values => {
			dispatch(validatePaymentVoucher(values))
		},
	});

	const handleRemoveImage = () => {
		formik.values.file = null;
		setPreviewImage(null)
	}

	// Función para manejar el cambio de archivo y actualizar el campo "file" de Formik
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		formik.setFieldValue('file', file);

		// Previsualizar la imagen seleccionada
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
						{/* Header form */}
						<div className="mx-auto max-w-2xl sm:text-start mb-8">
							<h2 className="
								text-3xl 
								font-semibold 
								tracking-tight 
								text-gray-900 sm:text-4xl"
							>
								Comprobante de pago
							</h2>
							<p className="mt-2 text-lg leading-8 text-gray-500">
								Por favor agregue tu comprobante de pago para validarlo.
							</p>
						</div>
						{/* Body form */}
						<div
							className="
								grid 
								grid-cols-1 
								gap-y-4 
								sm:grid-cols-6 
								mb-24"
							>
							<div className="col-span-full mt-10">
								<label
									htmlFor="cover-photo"
									className={`
										block 
										text-sm 
										font-medium 
										leading-6 
										text-gray-900`}
									>
									Comprobante de pago
								</label>
								{!previewImage && (
									<div className={`
										mt-2 
										flex 
										justify-center 
										rounded-lg border 
										border-dashed 
										px-6 py-10
										${formik.errors.file ? 'border-rose-500 ' : 'border-gray-900/25'}
									`}>
										<div className="text-center">
											<PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
											<div className="mt-4 flex text-sm leading-6 text-gray-600">
												<label
													htmlFor="file-upload"
													className="
														relative 
														cursor-pointer 
														rounded-md 
														bg-white 
														font-semibold 
														text-indigo-600 
														focus-within:outline-none 
														focus-within:ring-2 
														focus-within:ring-indigo-600 
														focus-within:ring-offset-2 
														hover:text-indigo-500"
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
											{formik.touched.file && formik.errors.file && (
												<small className="text-red-500">{formik.errors.file}</small>
											)}
										</div>
									</div>
								)}

								{previewImage && (
									<>
										<img
											src={previewImage}
											alt="Comprobante de pago"
											className="mt-4 mx-auto  w-1/2"
										/>
										<div className="mt-6 flex items-center justify-around gap-x-6">
											<Button
												label='Selecionar otra imagen'
												disabled={loading}
												onClick={handleRemoveImage}
											/>
										</div>
									</>
								)}
							</div>

							<div className="sm:col-span-12">
								<InputSelect
									id="assessor"
									name="assessor"
									label="Seleciona a tu assesor"
									placeholder="Seleciona a tu assesor"
									formik={formik}
									data={assessors}
									optionDefault="Selecione un assessor"
									value={formik.values.assessor}
									error={formik.touched.assessor && formik.errors.assessor}
								/>
							</div>
							<div className="sm:col-span-12">
								<InputSelect
									id="account"
									name="account"
									label="Seleciona el numero de cuenta a la que pagaste"
									placeholder="Selecione un numero de cuenta"
									formik={formik}
									data={accounts}
									optionDefault="Selecione un numero de cuenta"
									value={formik.values.account}
									error={formik.touched.account && formik.errors.account}
								/>
							</div>
						</div>
						{/* Footer form */}
						<div
							className="mt-6 flex items-center justify-around gap-x-6"
						>
							<Button
								label='Continuar'
								disabled={loading}
								onClick={formik.handleSubmit}
							/>
						</div>
					</>
				)
			case 2:
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
								Tu comprobante se ha subido con exito.
							</h2>
							<p className="mt-6 text-lg leading-8 text-gray-500">
								Vamos validar tu pago y te enviaremos un correo electronico de confirmacion.
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
									focus-visible:outline-indigo-600"
							>
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
	}

	return (
		<div
			className="
			min-h-screen 
			bg-gray-50 
			flex flex-col 
			justify-center 
			py-12 
			sm:px-6"
		>
			<div className="
				sm:mx-auto 
				sm:w-full 
				sm:max-w-screen-md
				bg-white 
				sm:py-24
				sm:px-24 
				sm:rounded-md
				shadow-md"
			>
				{renderStep()}
			</div>
		</div>



	)
}
