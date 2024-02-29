import React, { useState, useEffect } from 'react';

const hours = [
    { id: 1, time: '8:00' },
    { id: 2, time: '8:30' },
    { id: 3, time: '9:00' },
    { id: 4, time: '9:30' },
    { id: 5, time: '10:00' },
    { id: 6, time: '10:30' },
    { id: 7, time: '11:00' },
    { id: 8, time: '11:30' },
    { id: 9, time: '12:00' },
    { id: 10, time: '12:30' },
    { id: 11, time: '13:00' },
    { id: 12, time: '13:30' },
    { id: 13, time: '14:00' },
    { id: 14, time: '14:30' },
    { id: 15, time: '15:00' },
    { id: 16, time: '15:30' },
    { id: 17, time: '16:00' },
    { id: 18, time: '16:30' },
    { id: 19, time: '17:00' },
    { id: 20, time: '17:30' },
    { id: 21, time: '18:00' },
    { id: 22, time: '18:30' },
    { id: 23, time: '19:00' },
    { id: 24, time: '19:30' },
    { id: 25, time: '20:00' },
    { id: 26, time: '20:30' },
    { id: 27, time: '21:00' },
    { id: 28, time: '21:30' },
    { id: 29, time: '22:00' },
    { id: 30, time: '22:30' },
    { id: 31, time: '23:00' },
    { id: 32, time: '23:30' },
];

export const TimeInput = ({ courseSelected, setCourseSelected }) => {
    const [rangeStart, setRangeStart] = useState(null);

    const handleTimeClick = (hour) => {
        if (rangeStart === null) {
            // Si no hay inicio de rango, comienza uno nuevo
            setRangeStart(hour.id);
            setCourseSelected({
                ...courseSelected,
                hours: [hour],
            });
        } else {
            // Si hay inicio de rango, verifica si la segunda selección es mayor o igual que la primera
            if (hour.id >= rangeStart) {
                // Establece el rango y selecciona los tiempos dentro
                const start = rangeStart;
                const end = hour.id;
                const newSelectedTimes = [];
                for (let i = start; i <= end; i++) {
                    const selectedHour = hours.find((h) => h.id === i);
                    newSelectedTimes.push(selectedHour);
                }
                setCourseSelected({
                    ...courseSelected,
                    hours: newSelectedTimes,
                });
                setRangeStart(null);
            } else {
                // La segunda selección es menor, cambia el inicio del rango y reinicia la selección
                setRangeStart(hour.id);
                setCourseSelected({
                    ...courseSelected,
                    hours: [hour],
                });
            }
        }
    };

    useEffect(() => {
        // Actualizar el estado local si el curso seleccionado cambia externamente
        setCourseSelected({
            ...courseSelected,
            hours: courseSelected.hours,
        });
    }, [courseSelected.hours]);

    return (
        <div className="w-full grid grid-cols-4 gap-x-6 gap-y-8">
            {hours.map((hour) => (
                <button
                    key={hour.id}
                    onClick={() => handleTimeClick(hour)}
                    className={`${courseSelected?.hours?.some(
                        (selectedHour) => selectedHour?.id === hour.id
                    )
                        ? 'ring-2 ring-indigo-600 text-black'
                        : 'bg-gray-100'
                        } p-2 rounded-md cursor-pointer`}
                >
                    {hour.time}
                </button>
            ))}
        </div>
    );
};
