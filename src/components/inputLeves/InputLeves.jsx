import { RadioGroup } from '@headlessui/react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const InputLeves = ({ levels, courseSelected, setCourseSelected  }) => {

    const handleLevel = (value) => {
        const level = levels.find(level => level.value === value)
        setCourseSelected({...courseSelected, level: { '_id': level.value, 'name': level.description } });
        // setSelectedLevels({ 'id': level.value, 'name': level.description })
    }

    return (
        <div>
            {levels && (
                <RadioGroup value={courseSelected?.level?._id} onChange={(value) => handleLevel(value)}>
                    <RadioGroup.Label className="sr-only">Seleciona el nivel del curso</RadioGroup.Label>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-2">
                        {levels.map(({ value, description }) => (
                            <RadioGroup.Option
                                key={value}
                                value={value}
                                className={({ active }) =>
                                    classNames(
                                        active ? 'ring-2 ring-indigo-500' : '',
                                        'cursor-pointer bg-white text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border py-2 md:py-2 px-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                    )
                                }
                            >
                                {({ active, checked }) => (
                                    <>
                                        <RadioGroup.Label as="span">{description}</RadioGroup.Label>
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
