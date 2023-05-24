import React from 'react';


export const Input = ({
    id,
    label,
    type="text",
    placeholder,
    disabled,
    required,
    register,
    errors
}) => {
    return (
        <div>
            <label
                className="
                    block 
                    text-sm 
                    font-medium 
                    leading-6 
                    text-gray-900"
            >
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    {...register(id, {
                        required: required && {
                            message: 'Este campo es obligatorio',
                        },
                    })}
                    className="
                        block 
                        w-full 
                        rounded-md 
                        border-0 
                        py-1.5 
                        px-2
                        text-gray-900 
                        shadow-sm 
                        ring-1 
                        ring-inset 
                        ring-gray-300 
                        placeholder:text-gray-400 
                        focus:ring-2 
                        focus:ring-inset 
                        focus:ring-indigo-600 
                        sm:text-sm 
                        sm:leading-6
                    "
                />
                {errors[id] && <span>{errors[id].message}</span>}
            </div>
        </div>
    )
}
