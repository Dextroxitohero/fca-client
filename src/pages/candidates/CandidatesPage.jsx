import { useForm, SubmitHandler } from 'react-hook-form';
import { PhotoIcon } from '@heroicons/react/24/solid'
import { estadosRepublicaMexico } from '../../static/data';
import { Input } from '../../components/inputs/Input';

export const CandidatesPage = () => {


	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: {
			errors,
		},
		reset,
	} = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		}
	});

	const onSubmit = (data) => {
		console.log(register)
		console.log(data);
	};


	return (
		<div className="flex items-center justify-center">
			<div className="w-full sm:w-w-2xl max-w-3xl h-1/2  mt-[2rem]">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-12">
						<div className="mx-auto max-w-2xl lg:mx-0">
							<h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl">Registro de pagos</h2>
							<p className="mt-1 text-sm leading-6 text-gray-600">
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit repellat facere obcaecati ab necessitatibus veniam sapiente iure expedita numquam qui.
							</p>
						</div>

						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-3">
								<Input
									id="name"
									label="Nombre"
									type="text"
									required
									register={register}
									errors={errors}
								/>
							</div>
							<div className="sm:col-span-3">
								<Input
									id="email"
									label="Email"
									type="text"
									required
									register={register}
									errors={errors}
								/>
							</div>
							<div className="sm:col-span-3">
								<Input
									id="password"
									label="Password"
									type="password"
									required
									register={register}
									errors={errors}
								/>
							</div>												
						</div>
					</div>


					<div className="mt-6 flex items-center justify-end gap-x-6">
						<button 
							type="button" 
							className="text-sm font-semibold leading-6 text-gray-900"
						>
							Cancelar
						</button>
						<button
							type="submit"
							className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Guadar
						</button>
					</div>
				</form>
			</div >
		</div >
	)
}


