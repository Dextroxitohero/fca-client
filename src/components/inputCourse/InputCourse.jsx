import { RadioGroup } from '@headlessui/react';
import { urlFlag } from '../../common/urlBase';
import { capitalizarPalabras } from '../../common/upperCaseWord';
import { formatDate } from '../../common/formatDateText';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const InputCourse = ({ coursesList, courseSelected, setCourseSelected }) => {

    const handleCourse = (value) => {
        const course = coursesList.find(course => course._id === value);
        setCourseSelected(course);
    }

    return (
        <div>
            {coursesList && (
                <RadioGroup value={courseSelected?._id} onChange={(value) => handleCourse(value)}>
                    <RadioGroup.Label className="sr-only">Seleciona un curso</RadioGroup.Label>
                    <div className="grid grid-cols-1 gap-4">
                        {coursesList.map(({ _id, language, level, color, path, fromDate, toDate, limitMembers }) => (
                            <RadioGroup.Option
                                key={_id}
                                value={_id}
                                className={({ active }) =>
                                    classNames(
                                        active ? 'ring-2 ring-indigo-500' : '',
                                        'cursor-pointer bg-white text-gray-900 shadow-md shadow-indigo-950/20 group relative flex items-center justify-center rounded-md border hover:bg-indigo-50 py-4 md:py-2 px-4 text-sm font-medium  focus:outline-none sm:flex-1'
                                    )
                                }
                            >
                                {({ active, checked }) => (
                                    <>
                                        <div className='w-full p-4'>
                                            <div className="flex justify-between mb-4">
                                                <div>
                                                    <p className='text-md text-gray-900 font-bold tracking-wide uppercase'>{language ? `Curso de ${language}` : 'No hay idioma selecionado'}</p>
                                                    <div className="flex items-center">
                                                        <span className={classNames(
                                                            color,
                                                            'inline-block w-[14px] h-[14px] rounded-lg mr-2'
                                                        )}></span>
                                                        <p className='text-[14px] text-indigo-700 font-bold tracking-wide uppercase'>{level}</p>
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
                                            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
                                                <div className='w-full flex flex-col justify-center items-center'>
                                                    <p className="font-normal text-md text-gray-600 leading-6">Fecha de inicio de curso</p>
                                                    <p className="text-slate-800 font-semibold text-lg tracking-wide">{fromDate !== '' ? capitalizarPalabras(formatDate(fromDate)) : '-'}</p>
                                                </div>
                                                <div className='w-full flex flex-col justify-center items-center'>
                                                    <p className="font-normal text-md text-gray-600 leading-6">Fecha de fin de curso</p>
                                                    <p className="text-slate-800 font-semibold text-lg tracking-wide">{toDate !== '' ? capitalizarPalabras(formatDate(toDate)) : '-'}</p>
                                                </div>
                                            </div>
                                            <div className='w-full flex flex-col justify-center items-center mt-6'>
                                                <p className="font-normal text-md text-gray-600 leading-6">Lugares disponibles</p>
                                                <p className="text-slate-800 font-semibold text-lg tracking-wide">{limitMembers}</p>
                                            </div>
                                        </div>



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
            )}
        </div>
    )
}