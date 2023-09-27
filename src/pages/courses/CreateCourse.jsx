import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContainerFull } from '../../components/ContainerFull';
import { Heading } from '../../components/Heading';
import { RadioGroup } from '@headlessui/react';
import { CardCourse } from './components/CardCourse';

import { Dialog, Transition } from '@headlessui/react';
import { Square3Stack3DIcon } from '@heroicons/react/24/outline';

import { optionsColors, optionsLanguages, optionsLevels } from '../../redux/actions/options';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../../redux/actions/course';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}


export const CreateCourse = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setformData] = useState({
		'color': {
			'id': '',
			'value': ''
		},
		'language': {
			'id': '',
			'value': ''
		},
		'level': {
			'id': '',
			'value': ''
		},
		'limit': 1,
	});

	useEffect(() => {
		dispatch(optionsColors())
		dispatch(optionsLanguages())
		dispatch(optionsLevels())
	}, []);

	const { colors, languages, levels } = useSelector((state) => state.options);

	const [open, setOpen] = useState(false);
	const [values, setValues] = useState('')
	const cancelButtonRef = useRef(null);

	const handleCreatedCourse = () => {
		dispatch(createCourse(values))
			.then((response) => {
				// Manejar la respuesta exitosa aquí
				// console.log('Respuesta exitosa:', response);
				navigate(`/cursos`);

			})
			.catch((error) => {
				// Manejar errores aquí
				console.error('Error:', error);
			});
		setOpen(false)
	}

	const handleValidateData = () => {

		setValues({
			name: `Curso de ${formData.language.value}`,
			color: formData.color.id,
			language: formData.language.id,
			level: formData.level.id,
			limit: formData.limit
		})

		// Agregar validacion de los inputs
		setOpen(true)
	}

	const handleColor = (value) => {
		const color = colors.find(color => color.value === value)
		setformData({ ...formData, color: { 'id': color.value, 'value': color.clase } })
	}

	const handleLanguage = (value) => {
		const language = languages.find(language => language.value === value)
		setformData({ ...formData, language: { 'id': language.value, 'value': language.description } })
	}

	const handleLevel = (value) => {
		const level = levels.find(level => level.value === value)
		setformData({ ...formData, level: { 'id': level.value, 'value': level.description } })
	}

	return (
		<ContainerFull>
			<Heading
				title={`Modulo de creacion de nuevo curso`}
				subtitle={`Modulo de creacion de cursos. Aqui podras crear nuevos cursos y con sus propiedas.`}
				center={false}
			/>
			<div className="w-full flex flex-col md:flex-row mt-5 md:mt-10">
				<div className="w-full md:w-2/6 px-10 md:border-r md:border-gray-200">
					{/* Colors */}
					{colors && (
						<div className='w-full pb-2 md:pb-4 border-b border-gray-200'>
							<div className="md:w-11/12 mb-2 md:mb-4">
								<div className="flex items-center justify-between">
									<h3 className="text-lg md:pl-5 font-semibold text-gray-900">Seleciona el color identificador del curso</h3>
								</div>
								<RadioGroup value={formData.color.id} onChange={(value) => handleColor(value)} className="mt-4">
									<RadioGroup.Label className="sr-only">Seleciona el color identificador del curso</RadioGroup.Label>
									<div className="flex items-center px-10 space-x-3">
										{colors.map(({ value, name, clase, selectedClass }) => (
											<RadioGroup.Option
												key={value}
												value={value}
												className={({ active, checked }) =>
													classNames(
														selectedClass,
														active && checked ? 'ring ring-offset-1' : '',
														!active && checked ? 'ring-2' : '',
														'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
													)
												}
											>
												<RadioGroup.Label as="span" className="sr-only">
													{name}
												</RadioGroup.Label>
												<span
													aria-hidden="true"
													className={classNames(
														clase,
														'h-8 w-8 rounded-full border border-black border-opacity-10'
													)}
												/>
											</RadioGroup.Option>
										))}
									</div>
								</RadioGroup>
							</div>
						</div>
					)}


					{/* languages */}
					<div className='w-full mt-2 md:mt-4 pb-5 md:pb-10 border-b border-gray-200'>
						<div className="flex items-center justify-between">
							<h3 className="text-lg md:pl-5 font-semibold text-gray-900">Seleciona el idioma del curso</h3>
						</div>
						<RadioGroup value={formData.language.id} onChange={(value) => handleLanguage(value)} className="mt-6">
							<RadioGroup.Label className="sr-only">Seleciona el idioma del curso</RadioGroup.Label>
							<div className="grid grid-cols-1 px-10 gap-4 lg:grid-cols-2">
								{languages.map(({ value, description }) => (
									<RadioGroup.Option
										key={value}
										value={value}
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
					<div className='w-full mt-2 md:mt-4 pb-5 md:pb-10 border-b border-gray-200'>
						<div className="flex items-center justify-between">
							<h3 className="text-lg md:pl-5 font-semibold text-gray-900">Seleciona el nivel del curso</h3>
						</div>
						<RadioGroup value={formData.level.id} onChange={(value) => handleLevel(value)} className="mt-6">
							<RadioGroup.Label className="sr-only">Seleciona el nivel del curso</RadioGroup.Label>
							<div className="grid grid-cols-1 px-10 gap-4 lg:grid-cols-2">
								{levels.map(({ value, description }) => (
									<RadioGroup.Option
										key={value}
										value={value}
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
					<div className='w-full mt-2 md:mt-4'>
						<div className="flex flex-col justify-between mt-2 md:mt-4 pb-5 md:pb-10">
							<div>
								<h3 className="text-lg md:pl-5 font-semibold flex-1 text-gray-900">Limite de alumnos</h3>
							</div>
							<div className='ml-8 mt-4'>
								<input
									className='bg-white text-center text-gray-900 flex-1 w-11/12 shadow-sm rounded-md border py-1 text-[18px] font-semibold cursor-default'
									type="number"
									max={5}
									min={1}
									value={formData.limit}
									onChange={(e) => setformData({ ...formData, 'limit': e.target.value })}
								/>
							</div>
						</div>

					</div>

					{/* Button */}
					<div className='w-full mt-5 md:mt-0 md:mb-4'>
						<button
							type='button'
							className='disabled:opacity-95 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition py-3 font-semibold text-md text-white bg-indigo-600 bg-cyan w-full'
							onClick={handleValidateData}
						>Agregar Nuevo Curso</button>
						{/* <Button label={"Agregar nuevo curso"} onClick={handleCreateCourse} /> */}
					</div>

				</div>
				<div className="w-full md:w-4/6 py-5 px-10">
					<div className='grid grid-cols-1 md:grid-cols-1 gap-x-6 gap-y-8'>
						<div>
							<CardCourse
								isCreating={true}
								clase={formData.color.value}
								language={formData.language.value}
								nivel={formData.level.value}
								studentLimit={formData.limit}
								flag={formData.language.value === '' ? '' : `${formData.language.value}.png`}
								hours={[]}
								days={[]}
								teacher={[]}
								startDate={''}
								endDate={''}
							/>
						</div>
					</div>
				</div>
			</div>
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 z-10 overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
									<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
										<div className="sm:flex sm:items-start">
											<div className="mx-auto flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-green-500 sm:mx-0 sm:h-10 sm:w-10">
												<Square3Stack3DIcon className="h-6 w-6 text-white" aria-hidden="true" />
											</div>
											<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
												<Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
													Agregar Nuevo Curso
												</Dialog.Title>
												<div className="mt-2">
													<p className="text-sm text-gray-500">
														Estas seguro que quieres agregar este nuevo curso.
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
										<button
											type="button"
											className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
											onClick={handleCreatedCourse}
										>
											Validar
										</button>
										<button
											type="button"
											className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
											onClick={() => setOpen(false)}
											ref={cancelButtonRef}
										>
											Cancelar
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>

		</ContainerFull>
	)
}
