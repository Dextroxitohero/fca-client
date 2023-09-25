import { Button } from "../../../components/buttons/Button";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const urlFlag = `http://localhost:8000/uploads/flags/`;

export const CardCourse = ({ isCreating, clase, language, flag, nivel, studentLimit, status }) => {
    return (
        <>
            <div className='border border-gray-200 border-l rounded-md p-4'>
                <div className='w-full flex flex-col px-2 md:px-4'>
                    <div className="flex justify-between">
                        <div>
                            <p className='text-[22px] text-gray-900 font-bold tracking-wide uppercase'>{`Curso de ${language}`}</p>
                            <div className="flex items-center">
                                <span className={classNames(
                                    clase,
                                    'inline-block w-[14px] h-[14px] rounded-lg mr-2'
                                )}></span>
                                <p className='text-[14px] text-indigo-700 font-bold tracking-wide uppercase'>{nivel}</p>
                            </div>
                        </div>
                        <div>
                            {flag &&(
                                <img className="w-[32px]" src={`${urlFlag}${flag}`} alt="flag" />
                            )}
                        </div>
                    </div>
                    <div className="w-full flex flex-1 mt-10 justify-between">
                        <div>
                            <ul>
                                <li className="mb-2 uppercase">
                                    <span className="font-normal text-[0.7rem] text-gray-600 leading-6">Profesor del curso</span>
                                    <span className="block text-slate-800 font-bold text-[0.9rem] tracking-wide"> Jorge Alberto Hernandez</span>
                                </li>
                                <li className="mb-2 uppercase">
                                    <span className="font-normal text-[0.7rem] text-gray-600 leading-6">Fecha de inicio de curso</span>
                                    <span className="block text-slate-800 font-bold text-[0.9rem] tracking-wide"> 20 de octubre del 2022</span>
                                </li>
                                <li className="mb-2 uppercase">
                                    <span className="font-normal text-[0.7rem] text-gray-600 leading-6">Fecha de fin de curso</span>
                                    <span className="block text-slate-800 font-bold text-[0.9rem] tracking-wide"> 20 de diciembre del 2022</span>
                                </li>
                                <li className="mb-2 uppercase">
                                    <span className="font-normal text-[0.7rem] text-gray-600 leading-6">Dias de clase</span>
                                    <span className="block text-slate-800 font-bold text-[0.9rem] tracking-wide"> (Lunes, Miercoles, Viernes)</span>
                                </li>
                                <li className="mb-2 uppercase">
                                    <span className="font-normal text-[0.7rem] text-gray-600 leading-6">Horario</span>
                                    <span className="block text-slate-800 font-bold text-[0.9rem] tracking-wide">7:00 PM - 8:30 PM</span>
                                </li>
                                <li className="mb-2 uppercase">
                                    <span className="font-normal text-[0.7rem] text-gray-600 leading-6">Maximo de alumnos para el curso</span>
                                    <span className="block text-slate-800 font-bold text-[0.9rem] tracking-wide">{studentLimit}</span>
                                </li>
                            </ul>
                        </div>
                        {!isCreating && (
                            <div>
                                <div
                                    className={classNames(
                                        status === 'activo'
                                            ? 'text-lime-600 ring-lime-600 shadow-lime-600'
                                            : 'text-red-600 ring-red-600 shadow-red-600',
                                        'border-none ring-2  shadow-md py-0 px-1 rounded-sm  uppercase font-bold'
                                    )}>
                                    <p className="text-[.8rem]">{status}</p>
                                </div>
                            </div>
                        )}

                    </div>

                </div>
                {
                    !isCreating && (
                        <div className="w-full flex mt-8 mb-4 gap-x-4 px-4">
                            <button className="bg-indigo-600  flex-1 py-2 text-white font-semibold rounded-md focus:bg-indigo-700">Editar</button>
                            {/* <button className="bg-indigo-600  flex-1 py-2 text-white font-semibold rounded-md focus:bg-indigo-700">Agragar nuevo curso</button> */}

                        </div>
                    )
                }
            </div>
        </>
    )
}
