import React from 'react'
import { ContainerFull } from '../../components/ContainerFull'
import { Heading } from '../../components/Heading'
import { useFormik } from 'formik';
import { validateCreateCurse } from './validate';
import { languages, nivels, colors } from '../../static/data';
import { Input } from '../../components/inputs/Input';
import { InputSelect } from '../../components/inputs/InputSelect';
import { InputMultiDatePicker } from '../../components/inputs/InputMultiDatePicker';
import { Button } from '../../components/buttons/Button';

export const CreateCurse = () => {

	const formikCreteCurse = useFormik({
		initialValues: {
			nameCurse: '',
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

	const handleCreateCurse = () => {
		console.log(formikCreteCurse.values)
		formikCreteCurse.handleSubmit()
	}

	const handleReset = () => {
		formikCreteCurse.resetForm();
	}



	return (
		<ContainerFull>
			<Heading
				title={`Modulo de creacion de cursos`}
				subtitle={`Modulo de creacion de cursos. Aqui podras crear nuevos cursos y con sus propiedas.`}
				center={false}
			/>
			<div className="w-full md:w-2/5 mt-5 md:mt-10">
				<div className="w-full md:w-11/12 mb-4 md:mb-8">
					<Input
						id="nameCurse"
						name="nameCurse"
						type="nameCurse"
						label="Nombre del curso"
						placeholder="Nombre del curso"
						formik={formikCreteCurse}
						value={formikCreteCurse.values.nameCurse}
						error={formikCreteCurse.touched.nameCurse && formikCreteCurse.errors.nameCurse}
					/>
				</div>
				<div className="w-full md:w-11/12 mb-4 md:mb-8">
					<InputSelect
						id="language"
						name="language"
						label="Seleciona el idoma para el curso"
						placeholder="Seleciona el idoma"
						formik={formikCreteCurse}
						data={languages}
						optionDefault="Seleciona el idoma para el curso"
						value={formikCreteCurse.values.language}
						error={formikCreteCurse.touched.language && formikCreteCurse.errors.language}
					/>
				</div>
				<div className="w-full md:w-11/12 mb-4 md:mb-8">
					<InputSelect
						id="nivel"
						name="nivel"
						label="Seleciona el nivel de curso"
						placeholder="Seleciona el nivel de curso"
						formik={formikCreteCurse}
						data={nivels}
						optionDefault="Seleciona el nilvel para el curso"
						value={formikCreteCurse.values.nivel}
						error={formikCreteCurse.touched.nivel && formikCreteCurse.errors.nivel}
					/>
				</div>
				<div className="w-full md:w-11/12 mb-4 md:mb-8">
					<InputSelect
						id="color"
						name="color"
						label="Seleciona el color para identificar el curso"
						placeholder="Seleciona el color para identificar el curso"
						formik={formikCreteCurse}
						data={colors}
						optionDefault="Seleciona el color para identificar el curso"
						value={formikCreteCurse.values.color}
						error={formikCreteCurse.touched.color && formikCreteCurse.errors.color}
					/>
				</div>
				<div className="w-full md:w-11/12 mb-4 md:mb-8">
					<InputMultiDatePicker
						id='durationCurse'
						name='durationCurse'
						label='Duracion del cursos'
						formik={formikCreteCurse}
						value={formikCreteCurse.values.durationCurse}
						error={formikCreteCurse.touched.durationCurse && formikCreteCurse.errors.durationCurse}
					/>
				</div>
				<div className="w-full md:w-11/12 mt-5 md:mb-10 flex justify-end">
					{/* <Button onClick={handleCreateCurse} label={'Crear curso'} /> */}
					<Button onClick={()=>formikCreteCurse.handleSubmit()} label={'Crear curso'} />
				</div>
			</div>


		</ContainerFull>
	)
}
