
export const InputLimit = ({ selected, setSelected }) => {

    const handleChange = (value)=>{
        setSelected({...selected, limitMembers: value});
    }

    return (
        <div className="flex flex-col justify-between">
            <div className='mt-2'>
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
