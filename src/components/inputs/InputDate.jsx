import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'react-date-range/dist/locale';

export const InputDate = ({ name, label, onChange, value, placeholder }) => {
    
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-medium leading-6 text-gray-600 ml-1"
            >{label}</label>
            <div className='mt-2'>
                <DatePicker
                    name={name}
                    selected={value}
                    onChange={onChange}
                    locale={es}
                    placeholderText={placeholder}
                    peekNextMonth
                    showYearDropdown
                    showMonthDropdown                    
                    withPortal
                    className='w-[100%] rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
            </div>
        </div>
    )
}
