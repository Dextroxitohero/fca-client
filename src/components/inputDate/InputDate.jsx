import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';

import 'react-day-picker/dist/style.css';

const css = `
    .my-selected{ 
        background-color: #4F45E4;
        color: white;
    }
    .my-today { 
        font-weight: bold;
        font-size: 110%; 
        color: #424242;
    }
`;

export const InputDate = ({ id, selected, onChange }) => {

    return (

        <div className='flex bg-white w-[320px] h-[350px] shadow-md border-2 border-indigo-600/10 rounded-md'>
            <style>{css}</style>
            <DayPicker
                id={id}
                mode="single"
                selected={selected}
                onSelect={onChange}
                locale={es}
                fixedWeeks
                captionLayout="dropdown-buttons"
                styles={{
                    container: { width: '100%', height: '100%' },
                    caption_dropdowns: { display: 'flex', justifyContent: 'space-between', color: '#5F57E7', textTransform: 'capitalize' },
                    dropdown: { textTransform: 'capitalize', padding: '0.5rem' },
                }}
                modifiersClassNames={{
                    selected: 'my-selected',
                    today: 'my-today'
                }}
                fromYear={1950}
                toYear={2025}
            />
        </div>
    );
}