import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { estadosRepublicaMexico } from '../../static/data';

export const PaymentsPage = () => {

	return (
		<div className="flex items-center justify-center">
			<div className="w-full sm:w-w-2xl max-w-3xl h-1/2  mt-[2rem]">
				<form>
					<div className="space-y-12">
						<div className="mx-auto max-w-2xl lg:mx-0">
							<h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl">Registro de pagos</h2>
							<p className="mt-1 text-sm leading-6 text-gray-600">
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit repellat facere obcaecati ab necessitatibus veniam sapiente iure expedita numquam qui.
							</p>
						</div>

						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-3">
								<label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
									Nombre
								</label>
								<div className="mt-2">
									<input
										type="text"
										name="first-name"
										id="first-name"
										autoComplete="given-name"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="sm:col-span-3">
								<label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
									Apellido
								</label>
								<div className="mt-2">
									<input
										type="text"
										name="last-name"
										id="last-name"
										autoComplete="family-name"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="sm:col-span-4">
								<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
									Correo Electronico
								</label>
								<div className="mt-2">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="col-span-full">
								<label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
									Direcion
								</label>
								<div className="mt-2">
									<input
										type="text"
										name="street-address"
										id="street-address"
										autoComplete="street-address"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="sm:col-span-2 sm:col-start-1">
								<label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
									Ciudad
								</label>
								<div className="mt-2">
									<input
										type="text"
										name="city"
										id="city"
										autoComplete="address-level2"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div className="sm:col-span-2">
								<label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
									Estado de la republica
								</label>
								<div className="mt-2">
									<select
										id="country"
										name="country"
										autoComplete="country-name"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
									>
										{
											estadosRepublicaMexico.map(item => (
												<option
													key={item.name}
													value={item.name}
													placeholder='Seleciona tu estado'
												>
													{item.name}
												</option>
											))

										}
									</select>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
									ZIP / Postal code
								</label>
								<div className="mt-2">
									<input
										type="text"
										name="postal-code"
										id="postal-code"
										autoComplete="postal-code"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="col-span-full mt-10">
						<label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
							Comprobante de pago
						</label>
						<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
							<div className="text-center">
								<PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
								<div className="mt-4 flex text-sm leading-6 text-gray-600">
									<label
										htmlFor="file-upload"
										className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
									>
										<span>Comprobante de pago</span>
										<input id="file-upload" name="file-upload" type="file" className="sr-only" />
									</label>
									<p className="pl-1">or drag and drop</p>
								</div>
								<p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
							</div>
						</div>
					</div>


					<div className="mt-6 flex items-center justify-end gap-x-6">
						<button type="button" className="text-sm font-semibold leading-6 text-gray-900">
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
