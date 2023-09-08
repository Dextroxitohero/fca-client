
function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export const CardCourse = ({isCreating, clase, lenguaje, nivel, studentLimit }) => {
    return (
        <>
            <div
                className={classNames(
                    clase,
                    'rounded-lg border-transparent ring-4 p-6 shadow-lg bg-transparent'
                )}
            >
                <div className='w-full flex flex-col justify-center items-center px-2 md:px-4'>
                    <p className='text-[24px] text-gray-900 font-bold tracking-wide uppercase'>{`${lenguaje} - ${nivel}`}</p>
                    <p className='text-[14px] text-gray-800 font-semibold tracking-wide uppercase mt-3 md:mt-6'>{`Limite de alumnos ${studentLimit}`}</p>
                </div>
                {
                    !isCreating && (
                        <>Editando</>
                    )
                }
            </div>
        </>
    )
}
