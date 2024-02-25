import React from 'react';
import { Menu } from '@headlessui/react';
import { ImagenUser } from './ImagenUser'

export const ButtonUserMenu = () => {
    return (
        <Menu.Button
            className="
            flex 
            max-w-xs 
            items-center 
            rounded-full 
            text-sm
            ring-4
            ring-gray-200
            focus:shadow-lg
            focus:shadow-indigo-950/20
            focus:ring-indigo-100
 
            ">
            <span className="sr-only">Open user menu</span>
            <ImagenUser />
        </Menu.Button>

    )
}
