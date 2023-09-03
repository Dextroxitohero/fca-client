import React from 'react';
import { capitalizarPalabras } from '../../common/upperCaseWord';

export const InputSelect = ({
    id,
    name,
    label,
    placeholder,
    disabled,
    formik,
    value,
    data,
    optionDefault,
    error,
}) => {

    return (
        <div>
            <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <select
                    id={id}
                    name={name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`
                        appearance-none                    
                        bg-white
                        block 
                        w-full 
                        rounded
                        border-0 
                        py-2
                        px-3
                        text-gray-900 
                        shadow-sm 
                        ring-1 
                        ring-inset 
                        ring-gray-300 
                        focus:ring-2 
                        focus:ring-inset 
                        focus:ring-indigo-600 
                        sm:text-md 
                        sm:leading-6
                        ${error ? 'ring-rose-500' : 'ring-gray-300'}
                        ${error ? 'focus:ring-rose-500' : 'focus:border-neutral-black'}
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
            {error && <div className="text-red-500">{error}</div>}
        </div>
    )
}
