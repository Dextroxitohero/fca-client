import React from 'react'

export const InputText = ({ id, name, type, label, onChange, value, placeholder, disabled }) => {
    return (
        <div>
            <label
                htmlFor={name}
                className="block font-medium leading-6 text-gray-500 ml-1"
            >{label}</label>
            <div className='mt-2'>
                <input
                    className='block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    id={id}
                    name={name}
                    type={type}
                    label={'Email'}
                    onChange={onChange}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled} />
            </div>
        </div>
    )
}
