import React, { useState } from 'react';

import { es } from 'date-fns/locale';
import { addDays, format,  } from 'date-fns';
import { DayPicker } from 'react-day-picker';

import 'react-day-picker/dist/style.css';


export const InputDateRange = () => {
    const defaultSelected = {
        from: new Date(),
        to: new Date(),
    };
    
    const [range, setRange] = useState(defaultSelected);

    console.log(defaultSelected)

    let footer = <p>Please pick the first day.</p>;
    if (range?.from) {
        if (!range.to) {
            footer = <p>{format(range.from, 'PPP')}</p>;
        } else if (range.to) {
            footer = (
                <p>
                    {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
                </p>
            );
        }
    }

    return (
        <div className=' flex w-[320px] h-[350px] rounded-md'>


            <DayPicker
                id="test"
                mode="range"
                locale={es}
                fixedWeeks
                captionLayout="dropdown-buttons"
                selected={range}
                footer={footer}
                onSelect={setRange}
                styles={{
                    caption: { color: '#5F57E7', textTransform: 'capitalize' },
                    dropdown: { textTransform: 'capitalize', padding: '0.5rem' },
                }}
                fromYear={1980}
                toYear={2025}
            />
        </div>
    );
}