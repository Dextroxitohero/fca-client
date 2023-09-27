import { RadioGroup } from '@headlessui/react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const InputLanguage = ({ languages, selectedLanguage, setSelectedLanguage }) => {

    const handleLanguage = (value) => {
        const language = languages.find(language => language.value === value)
        setSelectedLanguage({ 'id': language.value, 'name': language.description })
    }

    return (
        <div>
            {languages && (
                <RadioGroup value={selectedLanguage?.id} onChange={(value) => handleLanguage(value)}>
                    <RadioGroup.Label className="sr-only">Seleciona el idioma</RadioGroup.Label>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {languages.map(({ value, description }) => (
                            <RadioGroup.Option
                                key={value}
                                value={value}
                                className={({ active }) =>
                                    classNames(
                                        active ? 'ring-2 ring-indigo-500' : '',
                                        'cursor-pointer bg-white text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border py-4 md:py-2 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
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
