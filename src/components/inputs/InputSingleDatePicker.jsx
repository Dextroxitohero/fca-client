import React from 'react';
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";

export const InputSingleDatePicker = ({
    id,
    name,
    value,
    label,
    formik,
    error
}) => {
    return (
        <div>
            <label
                className="
                    block 
                    text-sm 
                    font-medium 
                    leading-10
                    text-gray-900
                "
            >
                {label}
            </label>
            <DatePicker
                id={id}
                name={name}
                value={value}
                onChange={(value) => formik.setFieldValue('dateBirth', value)}
                placeholder='Ingresa tu fecha de nacimiento'
                containerClassName="custom-container"
                render={<InputIcon />}
            />
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}
