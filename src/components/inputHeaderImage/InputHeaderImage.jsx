import { RadioGroup } from '@headlessui/react';
import { baseURLImage } from '../../common/urlBase';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const InputHeaderImage = ({ headersImage, headerImageSelected, setHeaderImageSelected }) => {

    const handleCourse = (value) => {
        const header = headersImage.find(header => header._id === value);
        setHeaderImageSelected(header);
    }

    return (
        <div>
            {headersImage && (
                <RadioGroup value={headerImageSelected?._id} onChange={(value) => handleCourse(value)}>
                    <RadioGroup.Label className="sr-only">Seleciona un imagen de encabezado</RadioGroup.Label>
                    <div className="grid grid-cols-1 gap-4">
                        {headersImage.map(({ _id, name, urlName }) => (
                            <RadioGroup.Option
                                key={_id}
                                value={_id}
                                className={({ active }) =>
                                    classNames(
                                        active ? 'ring-2 ring-indigo-500' : '',
                                        'cursor-pointer bg-white text-gray-900 shadow-sm group relative flex justify-center rounded-md border p-4'
                                    )
                                }
                            >
                                {({ active, checked }) => (
                                    <>
                                        {/* <img src={`${baseURLImage}${fileName}`} alt={name} className="w-full flex-shrink-0 rounded-md" /> */}
                                        <img src={urlName} alt={name} className="w-full flex-shrink-0 rounded-md" />
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