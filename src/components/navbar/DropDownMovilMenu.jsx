import React from 'react';
import { Disclosure } from '@headlessui/react';
import {
    BellIcon,
} from '@heroicons/react/24/outline';

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
]


export const DropDownMovilMenu = () => {

    return (

        <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                    <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={
                            classNames(
                                item.current
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium'
                            )}
                        aria-current={item.current ? 'page' : undefined}
                    >
                        {item.name}
                    </Disclosure.Button>
                ))}
            </div>
            <div className=" border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">

                    <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>

                    <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                            {user.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                            {user.email}
                        </div>
                    </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                        <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="
                                block 
                                rounded-md 
                                px-3 
                                py-2 
                                text-base 
                                font-medium 
                                text-gray-400 
                                hover:bg-gray-700 
                                hover:text-white
                            ">
                            {item.name}
                        </Disclosure.Button>
                    ))}
                </div>
            </div>
        </Disclosure.Panel>
    )
}
