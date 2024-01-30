import React, { useState } from 'react';

import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

import 'react-day-picker/dist/style.css';



export const InputDateRange = ({}) => {
    const [selectedDay, setSelectedDay] = useState();

    const footer = selectedDay ? (
        <p>You selected {format(selectedDay, 'PPP')}.</p>
    ) : (
        <p>Please pick a day.</p>
    );

    return (

        <div className=' flex w-[320px] h-[320px] rounded-md'>            
            <DayPicker
                mode="single"
                selected={selectedDay}
                onSelect={setSelectedDay}
                footer={footer}
                locale={es}
                fixedWeeks 
                captionLayout="dropdown-buttons"
                styles={{
                    caption: { color: '#4F46E5' }
                  }}
                fromYear={1980}
                toYear={2025}
            />
        </div>
    );
}