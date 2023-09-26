import { Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


export const ComboBox = ({ filterData, query, setQuery, selected, setSelected }) => {

    return (
        <div className="">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <div>
                        <Combobox.Input
                            className="w-full rounded-md border-none py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 uppercase"
                            displayValue={(item) => item.description}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm">
                            {filterData.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    No se encontro.
                                </div>
                            ) : (
                                filterData.map((item) => (
                                    <Combobox.Option
                                        key={item.value}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 uppercase ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate uppercase  ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {item.description}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0  left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-indigo-600'
                                                            }`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}
