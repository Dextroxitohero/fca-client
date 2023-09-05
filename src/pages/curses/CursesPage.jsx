import { CheckIcon } from '@heroicons/react/20/solid'
import { ContainerFull } from '../../components/ContainerFull'
import { Heading } from '../../components/Heading'
import { Button } from '../../components/buttons/Button'
import { useNavigate } from 'react-router-dom'

const includedFeatures = [
    'Aceesos a las clases en vivo',
    'Videos de las clases',
    'Material de la clases',
    'Certificado',
]
export const CursesPage = () => {

    const navigate = useNavigate();
    const handleCreateNewCurse = ()=>{
        navigate('/nuevo-curso');
    }

    return (
        <ContainerFull>
            <Heading
                title={`Lista de cursos`}
                subtitle={`Examina y verifica la información proporcionada por el candidato. Si la información es correcta y confiable, procede a la validación.`}
                center={false}
            />

            
            <div className='w-full flex justify-end mt-10'>
                <Button label={"Agregar nuevo curso"} onClick={handleCreateNewCurse}/>
            </div>


            <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                <div className="p-8 sm:p-10 lg:flex-auto">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">Cursos de ingles</h3>
                    <p className="text-1x font-bold tracking-tight text-indigo-800">Nivel 1</p>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis
                        repellendus etur quidem assumenda.
                    </p>
                    <div className="mt-10 flex items-center gap-x-4">
                        <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">Que incluye</h4>
                        <div className="h-px flex-auto bg-gray-100" />
                    </div>
                    <ul
                        role="list"
                        className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                    >
                        {includedFeatures.map((feature) => (
                            <li key={feature} className="flex gap-x-3">
                                <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                <div className="p-8 sm:p-10 lg:flex-auto">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">Cursos de Aleman</h3>
                    <p className="text-1x font-bold tracking-tight text-indigo-800">Nivel 2</p>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis
                        repellendus etur quidem assumenda.
                    </p>
                    <div className="mt-10 flex items-center gap-x-4">
                        <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">Que incluye</h4>
                        <div className="h-px flex-auto bg-gray-100" />
                    </div>
                    <ul
                        role="list"
                        className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                    >
                        {includedFeatures.map((feature) => (
                            <li key={feature} className="flex gap-x-3">
                                <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                    <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                        <div className="mx-auto max-w-xs px-8">
                            <p className="text-base font-semibold text-gray-600">Acceso a clases en linea </p>
                            <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                <span className="text-5xl font-bold tracking-tight text-gray-900">$350</span>
                                <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">MXN</span>
                            </p>
                            <a
                                href="#"
                                className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Conseguir accesso
                            </a>
                            <p className="mt-6 text-xs leading-5 text-gray-600">
                                Si ya realizaste tu pago ponte en contacto con tu acesor
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </ContainerFull>
    )
}
