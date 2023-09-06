import React, { useState } from 'react'
import { ContainerFull } from '../../components/ContainerFull'
import { Heading } from '../../components/Heading'
import { useFormik } from 'formik';
import { validateCreateCurse } from './validate';
import { languages, nivels, colors } from '../../static/data';
import { Input } from '../../components/inputs/Input';
import { InputSelect } from '../../components/inputs/InputSelect';
import { InputMultiDatePicker } from '../../components/inputs/InputMultiDatePicker';
import { Button } from '../../components/buttons/Button';
import { RadioGroup } from '@headlessui/react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { es } from 'react-date-range/dist/locale';
import { addDays } from 'date-fns';

const nameMapper = {
	es: 'Spanish',
};

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}



export const CreateCourse = () => {
	const [selectedColor, setSelectedColor] = useState()
	const [selectedSize, setSelectedSize] = useState()
	const [selectedLimit, setSelectedLimit] = useState(1)
	const [state, setState] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection'
		}
	]);

	const incrementarLimit = () => {
		setSelectedLimit(selectedLimit + 1);
	  };
	
	  const decrementarLimit = () => {
		if(selectedLimit > 1){
			setSelectedLimit(selectedLimit - 1);
		}
	  };

	console.log(selectedColor)
	console.log(selectedSize)

	const formikCreteCourse = useFormik({
		initialValues: {
			language: '',
			nivel: '',
			color: '',
			durationCurse: ''
		},
		validateCreateCurse,
		onSubmit: values => {
			console.log(values)
			console.log(values.durationCurse[0])
			console.log(values.durationCurse[1])
			// dispatch(loginUser({ email, password }))
		},

	});

	const handleCreateCourse = () => {
		console.log(formikCreteCourse.values)
		formikCreteCourse.handleSubmit()
	}

	const handleReset = () => {
		formikCreteCourse.resetForm();
	}



	return (
		<ContainerFull>
			<Heading
				title={`Modulo de creacion de cursos`}
				subtitle={`Modulo de creacion de cursos. Aqui podras crear nuevos cursos y con sus propiedas.`}
				center={false}
			/>
			<div className="w-full flex flex-col md:flex-row md:w-7/12 mt-5 md:mt-10">
				<div className="w-full md:w-5/12 py-5 flex flex-col">
					<div className="w-full self-start mb-2 md:mb-2">
						<h3 className="text-lg md:pl-5 font-semibold text-gray-900">Duracion de curso</h3>
					</div>
					<div className='w-full px-10 mt-4'>
						<DateRange
							editableDateInputs={true}
							onChange={item => setState([item.selection])}
							moveRangeOnFirstSelection={false}
							ranges={state}
							months={2}
							direction='vertical'
							locale={es}
							date={new Date()}
							rangeColors={['#4f46e5']}
							minDate={addDays(new Date(), 0)}
							scroll={true}
						/>
					</div>

				</div>

				<div className="w-full md:w-7/12 py-5 px-10 border-l border-gray-200">
				{/* Colors */}
					<div className='w-full pb-2 md:pb-4 border-b border-gray-200'>
						<div className="md:w-11/12 mb-4 md:mb-8">
							<div className="flex items-center justify-between">
								<h3 className="text-lg md:pl-5 font-semibold text-gray-900">Color</h3>
							</div>
							<RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
								<RadioGroup.Label className="sr-only">Color</RadioGroup.Label>
								<div className="flex items-center px-10 space-x-3">
									{colors.map((color) => (
										<RadioGroup.Option
											key={color.name}
											value={color}
											className={({ active, checked }) =>
												classNames(
													color.selectedClass,
													active && checked ? 'ring ring-offset-1' : '',
													!active && checked ? 'ring-2' : '',
													'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
												)
											}
										>
											<RadioGroup.Label as="span" className="sr-only">
												{color.name}
											</RadioGroup.Label>
											<span
												aria-hidden="true"
												className={classNames(
													color.class,
													'h-8 w-8 rounded-full border border-black border-opacity-10'
												)}
											/>
										</RadioGroup.Option>
									))}
								</div>
							</RadioGroup>
						</div>
					</div>

					{/* languages */}
					<div className='w-full mt-5 md:mt-10 pb-5 md:pb-10 border-b border-gray-200'>
						<div className="flex items-center justify-between">
							<h3 className="text-lg md:pl-5 font-semibold text-gray-900">Idioma</h3>
						</div>
						<RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-6">
							<RadioGroup.Label className="sr-only">Seleciona idioma</RadioGroup.Label>
							<div className="grid grid-cols-1 px-10 gap-4 lg:grid-cols-2">
								{languages.map(({ value, description }) => (
									<RadioGroup.Option
										key={value}
										value={description}
										className={({ active }) =>
											classNames(
												active ? 'ring-2 ring-indigo-500' : '',
												'cursor-pointer bg-white text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border py-4 md:py-2 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
											)
										}
									>
										{({ active, checked }) => (
											<>
												<RadioGroup.Label as="span">{description}</RadioGroup.Label>
												<span
													className={classNames(
														active ? 'border' : 'border-2',
														checked ? 'border-indigo-500' : 'border-transparent',
														'pointer-events-none absolute -inset-px rounded-md'
													)}
													aria-hidden="true"
												/>
											</>
										)}
									</RadioGroup.Option>
								))}
							</div>
						</RadioGroup>
					</div>

					{/*  levels */}
					<div className='w-full mt-5 md:mt-10 pb-5 md:pb-10 border-b border-gray-200'>
						<div className="flex items-center justify-between">
							<h3 className="text-lg md:pl-5 font-semibold text-gray-900">Nivel</h3>
						</div>
						<RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-6">
							<RadioGroup.Label className="sr-only">Seleciona idioma</RadioGroup.Label>
							<div className="grid grid-cols-1 px-10 gap-4 lg:grid-cols-2">
								{nivels.map(({ value, description }) => (
									<RadioGroup.Option
										key={value}
										value={description}
										className={({ active }) =>
											classNames(
												active ? 'ring-2 ring-indigo-500' : '',
												'cursor-pointer bg-white text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border py-4 md:py-2 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
											)
										}
									>
										{({ active, checked }) => (
											<>
												<RadioGroup.Label as="span">{description}</RadioGroup.Label>
												<span
													className={classNames(
														active ? 'border' : 'border-2',
														checked ? 'border-indigo-500' : 'border-transparent',
														'pointer-events-none absolute -inset-px rounded-md'
													)}
													aria-hidden="true"
												/>
											</>
										)}
									</RadioGroup.Option>
								))}
							</div>
						</RadioGroup>
					</div>
					{/*  student limit */}
					<div className='w-full mt-5 md:mt-10'>
						<div className="flex items-center justify-between">
							<h3 className="text-lg md:pl-5 font-semibold text-gray-900">Nivel</h3>
						</div>
						<div className='flex flex-row justify-center items-center gap-4'>
							<button 
								onClick={decrementarLimit}
								className='cursor-pointer bg-white text-gray-900 shadow-sm rounded-md border py-2 px-6 align-middle text-[18px] font-semibold hover:border-transparent hover:ring-2	 hover:ring-indigo-500 hover:bg-gray-50 focus:outline-none'
							>-</button>
							<span 
								className='cursor-pointer bg-white text-gray-900 shadow-sm rounded-md border py-2 px-6 align-middle text-[18px] font-semibold hover:border-transparent hover:ring-2	 hover:ring-indigo-500 hover:bg-gray-50 focus:outline-none'
							>{selectedLimit}</span>
							<button 
							onClick={incrementarLimit}
								className='cursor-pointer bg-white text-gray-900 shadow-sm rounded-md border py-2 px-6 align-middle text-[18px] font-semibold hover:border-transparent hover:ring-2	 hover:ring-indigo-500 hover:bg-gray-50 focus:outline-none'
							>+</button>
						</div>
					</div>


				</div>

			</div>


		</ContainerFull>
	)
}
