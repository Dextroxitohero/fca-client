import React from 'react';
import { Disclosure } from '@headlessui/react';
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';


export const ButtonMenuMovil = ({ open }) => {
    return (
        <Disclosure.Button
            className="
            inline-flex 
            items-center 
            justify-center 
            rounded-md
            bg-gray-100
            p-2
            text-indigo-600 
            hover:bg-gray-50
            hover:text-indigo-900
            focus:shadow-inner 
            focus:shadow-indigo-100
            focus:bg-gray-50
        ">
            <span className="sr-only">Open main menu</span>
            {open ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            )}
        </Disclosure.Button>
    )
}
