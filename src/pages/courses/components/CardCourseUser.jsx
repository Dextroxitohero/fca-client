import { useNavigate } from "react-router-dom";

import { formatDate } from "../../../common/formatDateText";
import { capitalizarPalabras } from "../../../common/upperCaseWord";

import { useSelector } from 'react-redux';

import { urlFlag } from '../../../common/urlBase';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const CardCourseUser = ({
    idCourse,
    color,
    language,
    path,
    nivel,
    status,
    hours,
    days,
    teacher,
    fromDate,
    toDate,
}) => {
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);

    console.log(user.user)

    const handleEdit = () => {
        navigate(`/curso/${idCourse}`);
    }

    return (
        <>
            <div className='border-[1px] border-gray-900/10 shadow-md shadow-indigo-950/10 rounded-md p-6 md:p-6'>
                <div className='w-full flex flex-col'>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className='text-[1rem] md:text-[1.8rem] text-gray-900 font-bold tracking-wide uppercase'>{language ? `Curso de ${language}` : '-'}</p>
                            <div className="flex items-center">
                                <span className={classNames(
                                    color,
                                    'inline-block w-[12px] h-[12px] md:w-[14px] md:h-[14px] rounded-lg mr-2'
                                )}></span>
                                <p className='text-[1rem] md:text-[1.1rem] text-indigo-700 font-bold tracking-wide uppercase'>{nivel}</p>
                            </div>
                        </div>
                        <div>
                            {path
                                ? (
                                    <img className="w-[2rem] md:w-[3.4rem]" src={`${urlFlag}${path}`} alt="flag" />
                                )
                                : null}
                        </div>
                    </div>


                    <div className='w-full flex justify-center items-center md:invisible'>
                        <div
                            className={classNames(
                                status === 'abierto'
                                    ? 'text-sky-700 ring-sky-700 shadow-sky-700'
                                    : status === 'en curso' ? 'text-lime-600 ring-lime-600 shadow-lime-600'
                                        : status === 'completado' ? 'text-indigo-600 ring-indigo-600 shadow-indigo-600'
                                            : status === 'cancelado' ? 'text-gray-600 ring-gray-600 shadow-gray-600'
                                                : status === 'finalizado' ? 'text-red-500 ring-red-500 shadow-red-500' : null,
                                'border-none ring-2  shadow-sm py-0 px-1 rounded-sm uppercase font-bold'
                            )}>
                            <p className="text-[.6rem] md:text-[1rem]">{status}</p>
                        </div>
                    </div>


                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className='w-full flex flex-col md:flex-row justify-center items-center md:justify-start'>
                            <p className="font-normal text-[1rem] text-gray-600 leading-6">Profesor del curso: </p>
                            <p className="text-slate-800 font-semibold text-[1.1rem] md:text-[1.2rem] tracking-wide mt-2 md:mt-0 md:ml-2">{teacher !== '' ? capitalizarPalabras(teacher) : '-'}</p>
                        </div>
                        <div className='hidden md:w-full md:flex md:flex-col md:justify-start md:items-end'>
                            <div
                                className={classNames(
                                    status === 'abierto'
                                        ? 'text-sky-700 ring-sky-700 shadow-sky-700'
                                        : status === 'en curso' ? 'text-lime-600 ring-lime-600 shadow-lime-600'
                                            : status === 'completado' ? 'text-indigo-600 ring-indigo-600 shadow-indigo-600'
                                                : status === 'cancelado' ? 'text-gray-600 ring-gray-600 shadow-gray-600'
                                                    : status === 'finalizado' ? 'text-red-500 ring-red-500 shadow-red-500' : null,
                                    'border-none ring-2  shadow-sm py-0 px-1 rounded-sm uppercase font-bold'
                                )}>
                                <p className="text-[.6rem] md:text-[1rem]">{status}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-wrap mt-4">
                    <div className="w-full md:w-[60%] md:border-gray-900/10 md:border-r-[1px] p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className='w-full flex flex-col justify-center items-center md:justify-center md:items-center'>
                                <p className="font-normal text-[1rem] text-gray-600 leading-6">Fecha de inicio de curso</p>
                                <p className="text-slate-800 font-semibold text-[1.2rem] tracking-wide mt-2">{fromDate !== '' ? capitalizarPalabras(formatDate(fromDate)) : '-'}</p>
                            </div>

                            <div className='w-full flex flex-col justify-center items-center md:justify-center md:items-center'>
                                <p className="font-normal text-[1rem] text-gray-600 leading-6">Fecha de fin de curso</p>
                                <p className="text-slate-800 font-semibold text-[1.2rem] tracking-wide mt-2">{toDate !== '' ? capitalizarPalabras(formatDate(toDate)) : '-'}</p>
                            </div>

                            <div className="w-full flex flex-col justify-center items-center md:justify-start md:items-center h-[130px] mt-4">
                                <p className="font-normal text-[1rem] text-gray-600 leading-6">Dias de clase</p>
                                <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                    {days !== '' ? days?.map(day => <div key={day.id} className="bg-slate-100 text-slate-800 font-semibold text-[1.1rem]  text-center px-2 tracking-wide rounded-md">{capitalizarPalabras(day.day)}</div>) : '-'}
                                </div>
                            </div>

                            <div className="w-full flex flex-col justify-center items-center md:justify-start md:items-center mt-4">
                                <p className="font-normal text-[1rem] text-gray-600 leading-6">Horario</p>
                                <p className="text-slate-800 font-semibold text-[1.1rem] tracking-wide mt-4">{
                                    hours !== undefined
                                        ? `${hours.length > 0 ? hours[0]?.time : ''} - ${hours.length > 0 ? hours[hours?.length - 1]?.time : ''}`
                                        : '-'
                                }</p>
                            </div>

                        </div>
                    </div>
                    <div className="w-full md:w-[40%] p-5 md:p-5">
                        <div className="w-full flex justify-center">
                            <div className='w-full md:w-[70%] flex flex-col justify-center items-center md:justify-center md:items-center bg-gradient-to-t from-pink-600 to-rose-500 hover:shadow-md px-4 py-6  rounded-md'>
                                <p className="text-white font-bold text-[1rem] md:text-[1.2rem] tracking-wide mt-2">Suscripción vencida</p>
                            </div>

                            <div className='w-full md:w-[60%] flex flex-col justify-center items-center md:justify-center md:items-center bg-green-500 px-4 py-6  rounded-md'>
                                <p className="font-semibold text-[.8rem] md:text-[1rem] text-white leading-6">Proxima fecha de pago</p>
                                <p className="text-white font-bold text-[1rem] md:text-[1.2rem] tracking-wide mt-2">24 de Octubre 2023</p>
                            </div>
                        </div>
                        <div className="w-full flex flex-wrap justify-center mt-8">
                            <div className="w-[60%]">
                                <button
                                    onClick={handleEdit}
                                    className="w-full py-2 text-white font-semibold rounded-md bg-indigo-600 focus:bg-indigo-700"
                                >Ingresar a curso</button>
                            </div>
                            <div className="w-[80%] mt-4">
                                <p className="text-red-500 font-normal text-[.8rem] text-center mt-2">Se te ha privado el acceso al curso por falta de pago o tu pago no ha sido valido. Contacta a tu coordinador para tener mas informacion.</p>
                            </div>
                        </div>

                    </div>
                </div>
                {/* {
                    (!isCreating && user.user.roles === 'admin') && (
                        <div className="w-full flex mt-8 mb-4 gap-x-4 px-4">
                            <button
                                onClick={handleEdit}
                                className="bg-indigo-600  flex-1 py-2 text-white font-semibold rounded-md focus:bg-indigo-700"
                            >Editar</button>
                        </div>
                    )
                }
                {
                    user.user.roles === 'user' && (
                        <div className="w-full flex mt-8 mb-4 gap-x-4 px-4">
                            <button
                                disabled={true}
                                className="bg-indigo-600  flex-1 py-2 text-white font-semibold rounded-md focus:bg-indigo-700"
                            >Entrar</button>
                        </div>
                    )
                } */}
            </div>
        </>
    )
}
