
export const InputLimit = ({ selected, setSelected }) => {

    const handleChange = (value)=>{
        setSelected({...selected, limitMembers: value});
    }

    return (
        <div className="flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-semibold flex-1 text-gray-900">Limite de alumnos</h3>
            </div>
            <div className='mt-4'>
                <input
                    className='bg-white text-center text-gray-900 flex-1 w-full shadow-sm rounded-md border py-1 text-[18px] font-semibold cursor-default'
                    type="number"
                    min={1}
                    value={selected?.limitMembers}
                    onChange={(e) => handleChange( e.target.value )}
                />
            </div>
        </div>
    )
}