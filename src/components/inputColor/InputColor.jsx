import { RadioGroup } from '@headlessui/react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const InputColor = ({ colors, courseSelected, setCourseSelected }) => {

    const handleColor = (value) => {
        const color = colors.find(color => color.value === value);
        setCourseSelected({...courseSelected, color: { '_id': color.value, 'clase': color.clase } });
    }

    return (
        <div>
            {colors && (

                <RadioGroup value={courseSelected?.color?._id} onChange={(value) => handleColor(value)}>
                    <RadioGroup.Label className="sr-only">Seleciona el etiqueta</RadioGroup.Label>
                    <div className="flex px-1 space-x-3">
                        {colors.map(({ value, name, clase, selectedClass }) => (
                            <RadioGroup.Option
                                key={value}
                                value={value}
                                className={({ active, checked }) =>
                                    classNames(
                                        selectedClass,
                                        active && checked ? 'ring ring-offset-1' : '',
                                        !active && checked ? 'ring-2' : '',
                                        'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                    )
                                }
                            >
                                <RadioGroup.Label as="span" className="sr-only">
                                    {name}
                                </RadioGroup.Label>
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        clase,
                                        'h-6 w-6 rounded-full border border-black border-opacity-10'
                                    )}
                                />
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>

            )}
        </div>
    )
}
