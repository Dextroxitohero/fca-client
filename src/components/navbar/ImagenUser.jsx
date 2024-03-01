export const ImagenUser = ({url='https://res.cloudinary.com/dax0v05jz/image/upload/v1708645791/uploads/hbzdzch5ldxw6pszwmej.png'}) => {
    return (
        <div className="flex-shrink-0">
            <img className="h-14 w-14 rounded-full" src={url} alt="Imagen de usuario" />
        </div>
    )
}
