

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LocationStateSelect } from '../../components/inputs/LocationStateSelect';
import { Heading } from '../../components/Heading';

const Step = ({ text, isActive }) => {
	return (
		<div className={`p-4 ${isActive ? 'bg-gray-900 text-white' : 'text-gray-500'}`}>
			{text}
		</div>
	);
};

export const CandidatesPage = () => {
	return(
	<><h1>Candidatos</h1></>

	// const [currentStep, setCurrentStep] = useState(1);

	// const [selectedOption, setSelectedOption] = useState(null);

	// const handleSelectChange = (option) => {
	// 	setSelectedOption(option);
	// };

	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: {
	// 		errors,
	// 		isValid
	// 	},
	// 	getValues
	// } = useForm({
	// 	mode: 'onChange' // Habilita la validación en tiempo real
	// });

	// const handleStepClick = (step) => {
	// 	setCurrentStep(step);
	// };

	// const handlePrevStep = () => {
	// 	setCurrentStep((prevStep) => prevStep - 1);
	// };

	// const handleNextStep = handleSubmit((data) => {
	// 	setCurrentStep((prevStep) => prevStep + 1);
	// });

	// const handlePrintData = () => {
	// 	const formData = getValues();
	// 	console.log(formData);
	// };

	// let bodyContent = (
	// 	<div className="flex flex-col gap-8">
	// 		<Heading
	// 			title="Where do you wanna go?"
	// 			subtitle="Find the perfect location!"
	// 		/>
	// 		<LocationStateSelect onChange={handleSelectChange} />
	// 	</div>
	// )

	// if (currentStep === 1) {

	// }


	// return (
	// 	<div>
	// 		<div className="
	// 				min-h-screen 
	// 				bg-slate-
	// 				flex flex-col 
	// 				justify-center 
	// 				py-12 sm:px-6 
	// 				lg:px-8
	// 			"
	// 		>
	// 			<div className="
	// 				bg-white
	// 				sm:mx-auto 
	// 				sm:w-full 
	// 				max-h-96
	// 				md:max-w-3xl
	// 				"
	// 			>
	// 				<div className="
	// 					bg-white
	// 					min-h-1/2
	// 					py-8 px-4 
	// 					shadow 
	// 					sm:rounded-lg 
	// 					sm:px-10
	// 					"
	// 				>
	// 					<h2 className="sr-only">Steps</h2>
	// 					<div className="flex justify-between bg-gray-100">
	// 						<Step text="Step 1" isActive={currentStep === 1} onClick={() => handleStepClick(1)} />
	// 						<Step text="Step 2" isActive={currentStep === 2} onClick={() => handleStepClick(2)} />
	// 						<Step text="Step 3" isActive={currentStep === 3} onClick={() => handleStepClick(3)} />
	// 					</div>
	// 					<div className="mt-4">
	// 						{currentStep === 1 && (
	// 							<>
	// 								<div className="flex flex-col gap-8">
	// 									<Heading
	// 										title="Where do you wanna go?"
	// 										subtitle="Find the perfect location!"
	// 									/>
	// 								</div>
	// 								<form id="preRegistrationForm" onSubmit={handleNextStep}>
	// 									<LocationStateSelect onChange={handleSelectChange} />
	// 									<input
	// 										type="text" placeholder="Nombre" {...register('nombre', { required: true })} />
	// 									{errors.nombre && <span>El nombre es requerido</span>}
	// 									<button type="submit" disabled={!isValid}>Siguiente</button>
	// 								</form>
	// 							</>
	// 						)}
	// 						{currentStep === 2 && (
	// 							<form id="preRegistrationForm" onSubmit={handleNextStep}>
	// 								<input type="email" placeholder="Correo Electrónico" {...register('correo', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
	// 								{errors.correo && <span>Ingrese un correo electrónico válido</span>}
	// 								<button type="submit" disabled={!isValid}>Siguiente</button>
	// 							</form>
	// 						)}
	// 						{currentStep === 3 && (
	// 							<form id="preRegistrationForm">
	// 								<input type="number" placeholder="Edad" {...register('edad', { required: true, min: 18 })} />
	// 								{errors.edad && <span>Debe ser mayor de 18 años</span>}
	// 								{isValid ? (
	// 									<button type="button" onClick={handlePrintData}>Imprimir datos</button>
	// 								) : (
	// 									<span>Complete el formulario correctamente</span>
	// 								)}
	// 							</form>
	// 						)}
	// 						{currentStep > 1 && (
	// 							<button onClick={handlePrevStep}>Anterior</button>
	// 						)}
	// 					</div>

	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	)
};

