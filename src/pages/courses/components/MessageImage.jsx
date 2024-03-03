export const MessageImage = ({ url, content }) => {

    if (!url) {
        return <p className='text-[.9rem] font-normal my-4 '>No hay imagen para mostrar</p>;
    }

    return (
        <div className="p-4">
            <p className='text-[.9rem] font-normal pl-2 mb-2'>{content}</p>
            <img className="rounded-md pl'2" src={url} alt="image" />
        </div>
    )
}
