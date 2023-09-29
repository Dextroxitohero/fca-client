import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../common/formatDateText";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const urlFlag = `http://localhost:8000/uploads/flags/`;

export const CardCourse = ({
    idCourse,
    isCreating,
    color,
    language,
    path,
    nivel,
    studentLimit,
    status,
    hours,
    days,
    teacher,
    startDate,
    endDate
}) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit-curso/${idCourse}`);
    }

    return (
        <>
            <div className='border border-gray-200 border-l rounded-md p-4'>
                <div className='w-full flex flex-col px-2 md:px-4'>
                    <div className="flex justify-between">
                        <div>
                            <p className='text-[22px] text-gray-900 font-bold tracking-wide uppercase'>{language ? `Curso de ${language}` : 'No hay idioma selecionado' }</p>
                            <div className="flex items-center">
                                <span className={classNames(
                                    color,
                                    'inline-block w-[14px] h-[14px] rounded-lg mr-2'
                                )}></span>
                                <p className='text-[14px] text-indigo-700 font-bold tracking-wide uppercase'>{nivel}</p>
                            </div>
                        </div>
                        <div>
                            {path && (
                                <img className="w-[32px]" src={`${urlFlag}${path}`} alt="flag" />
                            )}
                        </div>
                    </div>
                    <div className="w-full flex flex-1 mt-10 justify-between">
                        <div>
                            <ul>
                                <li className="mb-2 uppercase">
                                    <span className="font-normal text-[0.7rem] text-gray-600 leading-6">Profesor del curso</span>
                                    <span className="block text-slate-800 font-semibold text-[0.9rem] tracking-wide">{teacher !== '' ? teacher : '-'}</span>
                                </li>
                                <li className="mb-2 uppercase">
                                    <span className="font-normal text-[0.7rem] text-gray-600 leading-6">Fecha de inicio de curso</span>
                                    <span className="block text-slate-800 font-semibold text-[0.9rem] tracking-wide">{startDate !== '' ? formatDate(startDate) : '-'}</span>
                                </li>
                                <li className="mb-2 uppercase">
                                    <span className="font-normal text-[0.7rem] text-gray-600 leading-6">Fecha de fin de curso</span>
                                    <span className="block text-slate-800 font-semibold text-[0.9rem] tracking-wide">{endDate !== '' ? formatDate(endDate) : '-'}</span>
                                </li>
                                <li className="mb-2 uppercase">
                                    <span className="font-normal text-[0.7rem] text-gray-600 leading-6">Dias de clase</span>
                                    <span className="block text-slate-800 font-semibold text-[0.9rem] tracking-wide">{days !== '' ? days?.map(day => <span key={day.id} className="bg-slate-100 px-2 rounded-sm ml-2">{day.day}</span>) : 'Hay dias selecionados'}</span>
                                </li>
                                <li className="mb-2 uppercase">
                                    <span className="font-normal text-[0.7rem] text-gray-600 leading-6">Horario</span>
                                    <span className="block text-slate-800 font-semibold text-[0.9rem] tracking-wide">{
                                        hours !== undefined
                                            ? `${hours.length > 0 ? hours[0]?.time : ''} - ${hours.length > 0 ? hours[hours?.length - 1]?.time : ''}`
                                            : 'No hay tiempo selecionado'
                                    }</span>
                                </li>
                                <li className="mb-2 uppercase">
                                    <span className="font-normal text-[0.7rem] text-gray-600 leading-6">Maximo de alumnos</span>
                                    <span className="block text-slate-800 font-semibold text-[0.9rem] tracking-wide">{studentLimit}</span>
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
                            <button
                                onClick={handleEdit}
                                className="bg-indigo-600  flex-1 py-2 text-white font-semibold rounded-md focus:bg-indigo-700"
                            >Editar</button>
                            {/* <button className="bg-indigo-600  flex-1 py-2 text-white font-semibold rounded-md focus:bg-indigo-700">Agragar nuevo curso</button> */}

                        </div>
                    )
                }
            </div>
        </>
    )
}
