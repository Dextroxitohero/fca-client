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
            bg-gray-800 
            text-sm 
            focus:outline-none 
            focus:ring-2 
            focus:ring-white 
            focus:ring-offset-2 
            focus:ring-offset-gray-800
        ">
            <span className="sr-only">Open user menu</span>
            <ImagenUser />
        </Menu.Button>

    )
}
