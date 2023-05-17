export const ProfilePage = () => {

    return (
        <div className="flex items-center justify-center">
            <div className="w-full sm:w-w-2xl max-w-3xl h-1/2  mt-[2rem]">
                <div>
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl">Perfil de usuario</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit repellat facere obcaecati ab necessitatibus veniam sapiente iure expedita numquam qui.
                    </p>
                </div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Nombre completo</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Tom Cook</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Fecha de inscripcion</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">1 de Enero del 2023</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Correo Electronico</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">tom@example.com</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Fecha de vencimiento de curso</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">30 de Mayo del 2023</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Acerde de ti</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                                    qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                                    pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Cursos</dt>
                                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                            <div className="flex w-0 flex-1 items-center">
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <span className="truncate font-medium">Ingles</span>
                                                    <span className="flex-shrink-0 text-indigo-600">Nivel 1</span>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                    Terminado
                                                </a>
                                            </div>
                                        </li>
                                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                            <div className="flex w-0 flex-1 items-center">
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <span className="truncate font-medium">Ingles</span>
                                                    <span className="flex-shrink-0 text-indigo-600">Nivel 2</span>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                    En curso
                                                </a>
                                            </div>
                                        </li>
                                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                            <div className="flex w-0 flex-1 items-center">
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <span className="truncate font-medium">Aleman</span>
                                                    <span className="flex-shrink-0 text-indigo-500">Nivel 2</span>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                    Terminado
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}
