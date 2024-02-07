import { RadioGroup } from '@headlessui/react';

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
                        {coursesList.map(({ _id, language }) => (
                            <RadioGroup.Option
                                key={_id}
                                value={_id}
                                className={({ active }) =>
                                    classNames(
                                        active ? 'ring-2 ring-indigo-500' : '',
                                        'cursor-pointer bg-white text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border py-4 md:py-2 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                    )
                                }
                            >
                                {({ active, checked }) => (
                                    <>
                                        <RadioGroup.Label as="span">{language}</RadioGroup.Label>
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