export const Input = ({
    id,
    name,
    label,
    type = "text",
    placeholder,
    disabled,
    formik,
    value,
    error
}) => {

    return (
        <div>
            <label
                htmlFor={name}
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
                    name={name}
                    type={type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`
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
                        ${error ? 'ring-rose-500' : 'ring-gray-300'}
                        ${error ? 'focus:ring-rose-500' : 'focus:border-neutral-black'}
                    `}
                />
                {error && <small className="text-red-500">{error}</small>}
            </div>
        </div>
    )
}
