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

export const InputDays = ({ courseSelected, setCourseSelected }) => {

    const handleDayClick = (day) => {
      setCourseSelected(prev => {
        const selectedDays = prev.days || [];
        let updatedDays;
  
        if (selectedDays.some(selectedDay => selectedDay.id === day.id)) {
          // Si ya está seleccionado, quitarlo de la lista de seleccionados
          updatedDays = selectedDays.filter(selectedDay => selectedDay.id !== day.id);
        } else {
          // Si no está seleccionado, agregarlo a la lista de seleccionados y ordenar por id
          updatedDays = [...selectedDays, day].sort((a, b) => a.id - b.id);
        }
  
        return {
          ...prev,
          days: updatedDays,
        };
      });
    };
  
    return (
      <div className='w-full flex justify-between gap-x-4'>
        {days.map(day => (
          <button
            key={day.id}
            onClick={() => handleDayClick(day)}
            className={`${courseSelected.days && courseSelected.days.some(selectedDay => selectedDay.id === day.id) ? 'ring-2 ring-indigo-600 text-black' : 'bg-gray-100'
              } py-2 flex-1  rounded-md cursor-pointer`}
          >
            {day.simbolo}
          </button>
        ))}
      </div>
    );
  };