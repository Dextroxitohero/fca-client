export const MessageFile = ({ url, content }) => {
    return (
        <div className="p-4">
            <p className='text-[.9rem] font-normal pl-2 mb-2'>{content}</p>
            <a className='text-[.9rem] my-4 font-semibold ml-2 text-indigo-500' href={url} target="_blank">Descargar archivo</a>
        </div>
    )
}
