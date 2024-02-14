import { RadioGroup } from '@headlessui/react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const InputAccountBank = ({ accountsBank, accountSelected, setAccountSelected  }) => {

    const handleAccount = (value) => {
        const accout = accountsBank.find(account => account.value === value)
        setAccountSelected({...accountSelected, account: { '_id': accout.value, 'name': accout.description } });
        // setSelectedLevels({ 'id': level.value, 'name': level.description })
    }

    return (
        <div>
            {accountsBank && (
                <RadioGroup value={accountSelected?.level?._id} onChange={(value) => handleAccount(value)}>
                    <RadioGroup.Label className="sr-only">Seleciona el nivel del curso</RadioGroup.Label>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-2">
                        {accountsBank.map(({ value, description }) => (
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
