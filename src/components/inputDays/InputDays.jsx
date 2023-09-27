import React, { useState } from 'react';

const days = [
    {
        id: 1,
        day: 'lunes',
        simbolo: 'L'
    },
    {
        id: 2,
        day: 'martes',
        simbolo: 'M'
    },
    {
        id: 3,
        day: 'miércoles',
        simbolo: 'M'
    },
    {
        id: 4,
        day: 'jueves',
        simbolo: 'J'
    },
    {
        id: 5,
        day: 'viernes',
        simbolo: 'V'
    },
    {
        id: 6,
        day: 'sábado',
        simbolo: 'S'
    },
];

export const InputDays = ({ selectedDays, setSelectedDays }) => {

    const handleDayClick = (day) => {
        // Verificar si el día ya está seleccionado
        if (selectedDays.includes(day)) {
            // Si ya está seleccionado, quitarlo de la lista de seleccionados
            setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
        } else {
            // Si no está seleccionado, agregarlo a la lista de seleccionados y ordenar por id
            setSelectedDays([...selectedDays, day].sort((a, b) => a.id - b.id));
        }
    };

    return (
        <div className='w-full flex justify-between gap-x-4'>
            {days.map(day => (
                <button
                    key={day.id}
                    onClick={() => handleDayClick(day)}
                    className={`${selectedDays.includes(day) ? 'ring-2 ring-indigo-600 text-black' : 'bg-gray-100'
                        } py-2 flex-1  rounded-md cursor-pointer`}
                >
                    {day.simbolo}
                </button>
            ))}
        </div>
    );
};
