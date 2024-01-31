import React, { useState } from 'react';

import { es } from 'date-fns/locale';
// import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

import 'react-day-picker/dist/style.css';
import { formatDate } from '../../common/formatDateText';
import { capitalizarPalabras } from '../../common/upperCaseWord';

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

export const InputDateRange = ({ id, label, selected, onChange }) => {


    let footer = (
        <div className='flex w-full bg-white p-2 rounded-md shadow-sm mt-6'>
            <p className='text-gray-600 text-center'>
                {label}
            </p>
        </div>
    );

    if (selected?.from) {
        if (!selected.to) {
            footer = (
                <div className='flex w-full bg-white p-2 rounded-md shadow-sm mt-6'>
                    <p className='text-center'>
                        {capitalizarPalabras(formatDate(selected.from))}
                    </p>
                </div>
            );
        } else if (selected.to) {
            footer = (
                <div className='flex w-full bg-white p-2 rounded-md shadow-sm mt-6'>
                    <p className='text-center'>
                        {capitalizarPalabras(formatDate(selected.from))} – {capitalizarPalabras(formatDate(selected.to))}
                    </p>
                </div>
            );
        }
    }

    return (
        <div className='flex bg-white w-[320px] h-[350px] shadow-sm rounded-md'>
            <style>{css}</style>
            <DayPicker
                id={id}
                mode="range"
                locale={es}
                fixedWeeks
                captionLayout="dropdown-buttons"
                selected={selected}
                footer={footer}
                onSelect={onChange}
                styles={{
                    container: { width: '100%', height: '100%'},
                    caption_dropdowns: { display: 'flex', justifyContent: 'space-between', color: '#5F57E7', textTransform: 'capitalize' },
                    dropdown: { textTransform: 'capitalize', padding: '0.5rem' },
                }}
                modifiersClassNames={{
                    selected: 'my-selected',
                    today: 'my-today'
                }}
                fromYear={1980}
                toYear={2025}
            />
        </div>
    );
}