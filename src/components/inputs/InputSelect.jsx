import React from 'react';
import { capitalizarPalabras } from '../../common/upperCaseWord';

export const InputSelect = ({
    id,
    name,
    label,
    placeholder,
    disabled,
    value,
    data,
    optionDefault,
    onChange
}) => {

    return (
        <div>
            <label
                className="block text-sm font-medium leading-6 text-gray-600 ml-1">
                {label}
            </label>
            <div className="mt-2">
                <select
                    id={id}
                    name={name}
                    onChange={onChange}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`
                        appearance-none bg-white block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                        `}
                >
                    <option value="">{optionDefault}</option>
                    {
                        data.map(item => (
                            <option
                                key={item.value}
                                value={item.value}
                                placeholder={placeholder}
                            >
                                {capitalizarPalabras(item.description)}
                            </option>
                        ))

                    }
                </select>
            </div>
        </div>
    )
}
