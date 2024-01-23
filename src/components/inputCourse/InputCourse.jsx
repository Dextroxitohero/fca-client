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


    //     "_id": "6516658bb6360d5f4a8b32e6",
    //     "language": "aleman",
    //     "level": "nivel 2",
    //     "teacher": "",
    //     "limitMembers": 50,
    //     "startDate": "2023-10-09T06:00:00.000Z",
    //     "endDate": "2023-10-13T06:00:00.000Z",
    //     "hours": [
    //         {
    //             "id": 17,
    //             "time": "16:00"
    //         },
    //         {
    //             "id": 18,
    //             "time": "16:30"
    //         },
    //         {
    //             "id": 19,
    //             "time": "17:00"
    //         },
    //         {
    //             "id": 20,
    //             "time": "17:30"
    //         }
    //     ],
    //     "days": [
    //         {
    //             "id": 1,
    //             "day": "lunes",
    //             "simbolo": "L"
    //         },
    //         {
    //             "id": 3,
    //             "day": "miércoles",
    //             "simbolo": "M"
    //         },
    //         {
    //             "id": 5,
    //             "day": "viernes",
    //             "simbolo": "V"
    //         }
    //     ],
    //     "status": "inactivo"
    // }
