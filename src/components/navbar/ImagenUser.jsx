import React from 'react';
import { user } from '../../static/data';


export const ImagenUser = () => {
    return (
        <div className="flex-shrink-0">
            <img className="h-14 w-14 rounded-full" src={user.imageUrl} alt="Imagen de usuario" />
        </div>
    )
}
