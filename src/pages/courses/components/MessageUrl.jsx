export const MessageUrl = ({ content, url }) => {
    return (
        <>
            <p className='text-[.9rem] font-normal pl-2'>{content}</p>
            <a className='text-[.9rem] my-4 font-semibold pl-2 text-indigo-500' href={url} target="_blank">{url}</a>
        </>
    )
}
