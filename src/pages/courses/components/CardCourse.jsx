import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../common/formatDateText";
import { capitalizarPalabras } from "../../../common/upperCaseWord";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// const urlFlag = `http://localhost:8000/uploads/flags/`;
const baseURLImage = 'https://fca-server-production.up.railway.app/uploads/images/';
const urlFlag = `https://fca-server-production.up.railway.app/uploads/flags/`;
// const baseURLImage = 'http://localhost:8000/uploads/images/';


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
    fromDate,
    toDate,
    headerImage
}) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit-curso/${idCourse}`);
    }

    return (
        <>
            <div className='shadow-md shadow-indigo-950/20 rounded-md'>
                <div>
                    <img className="w-full shrink-0 rounded-t-md object-cover" src={`${baseURLImage}${headerImage}`} alt="header" />
                </div>
                <div className='w-full flex flex-col p-6'>
                    <div className="flex justify-between mb-4">
                        <div>
                            <p className='text-md text-gray-900 font-bold tracking-wide uppercase'>{language ? `Curso de ${language}` : 'No hay idioma selecionado'}</p>
                            <div className="flex items-center">
                                <span className={classNames(
                                    color,
                                    'inline-block w-[14px] h-[14px] rounded-lg mr-2'
                                )}></span>
                                <p className='text-[14px] text-indigo-700 font-bold tracking-wide uppercase'>{nivel}</p>
                            </div>
                        </div>
                        <div>
                            {path
                                ? (
                                    <img className="w-[32px]" src={`${urlFlag}${path}`} alt="flag" />
                                )
                                : null}
                        </div>
                    </div>

                    {!isCreating && (
                        <div className="flex justify-end">
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

                    <div className="w-full grid grid-cols-1 gap-4 mt-6">
                        <div className='w-full'>
                            <p className="font-normal text-sm text-gray-600 leading-6">Profesor del curso</p>
                            <p className="text-slate-800 font-semibold text-md tracking-wide">{teacher !== '' ? capitalizarPalabras(teacher) : '-'}</p>
                        </div>
                        <div className='w-full'>
                            <p className="font-normal text-sm text-gray-600 leading-6">Fecha de inicio de curso</p>
                            <p className="text-slate-800 font-semibold text-md tracking-wide">{fromDate !== '' ? formatDate(fromDate) : '-'}</p>
                        </div>
                        <div className='w-full'>
                            <p className="font-normal text-sm text-gray-600 leading-6">Fecha de fin de curso</p>
                            <p className="text-slate-800 font-semibold text-md tracking-wide">{toDate !== '' ? formatDate(toDate) : '-'}</p>
                        </div>
                        <div className="w-full min-h-[130px]">
                            <p className="font-normal text-sm text-gray-600 leading-6 mb-4">Dias de clase</p>
                            <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {days !== '' ? days?.map(day => <div key={day.id} className="bg-slate-100 text-slate-800 font-semibold text-md text-center px-2 tracking-wide rounded-md">{capitalizarPalabras(day.day)}</div>) : 'Hay dias selecionados'}
                            </div>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4">
                        <div className="w-full flex flex-col justify-center items-center">
                            <p className="font-normal text-sm text-gray-600 leading-6 mb-2">Horario</p>
                            <p className="text-slate-800 font-semibold text-md tracking-wide">{
                                hours !== undefined
                                    ? `${hours.length > 0 ? hours[0]?.time : ''} - ${hours.length > 0 ? hours[hours?.length - 1]?.time : ''}`
                                    : 'No hay tiempo selecionado'
                            }</p>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center">
                            <p className="font-normal text-sm text-gray-600 leading-6 mb-2">Maximo de alumnos</p>
                            <p className="text-slate-800 font-semibold text-md tracking-wide">{studentLimit}</p>
                        </div>
                    </div>

                </div>
                {
                    !isCreating && (
                        <div className="w-full flex mt-8 mb-4 gap-x-4 px-4">
                            <button
                                onClick={handleEdit}
                                className="bg-indigo-600  flex-1 py-2 text-white font-semibold rounded-md focus:bg-indigo-700"
                            >Editar</button>
                        </div>
                    )
                }
            </div>
        </>
    )
}
