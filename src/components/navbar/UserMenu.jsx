import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import {
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { userMenu } from '../../static/data';
import { MenuItem } from './MenuItem';
import { useDispatch } from "react-redux";
import { logoutUser } from '../../redux/actions/user';

// const solutions = [
//     { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
//     { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
//     { name: 'Security', description: "Your customers' data will be safe and secure", href: '#', icon: FingerPrintIcon },
//     { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
//     { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
// ]


export const UserMenu = () => {

	const dispatch = useDispatch();
    
    const handleLogOut = ()=>{
        dispatch(logoutUser())
    }
    
    return (
        <div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div
                    className="
                    absolute 
                    rounded-3xl
                    shadow-md
                    bg-white
                    overflow-hidden 
                    right-0
                    top-12 
                    text-sm
                ">
                    <div className="
                        w-screen 
                        max-w-md 
                        flex-auto 
                        overflow-hidden 
                        rounded-3xl 
                        bg-whitetext-sm 
                        leading-6 
                        shadow-lg 
                        ring-1 
                        ring-gray-900/5
                    ">
                        <div className="p-4">
                            {userMenu.map((item) => (
                                <MenuItem
                                    key={item.name}
                                    name={item.name}
                                    description={item.description}
                                    href={item.href}
                                    icon={item.icon}
                                />
                            ))}
                            <hr />

                            <div
                                onClick={handleLogOut}
                                className="
                                group relative 
                                flex gap-x-6 
                                rounded-lg p-4 
                                hover:bg-gray-50
                                mt-5
                                "

                            >
                                <div
                                    className="
                                    mt-1 
                                    flex 
                                    h-11 
                                    w-11 
                                    flex-none 
                                    items-center 
                                    justify-center 
                                    rounded-lg 
                                    bg-gray-50 
                                    group-hover:bg-white
                                    "
                                >
                                    <ArrowRightOnRectangleIcon
                                        aria-hidden="true"
                                        className="
                                        h-6 
                                        w-6 
                                        text-gray-600 
                                        group-hover:text-indigo-600
                                    "
                                    />
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold text">
                                        Cerrar Sesión
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Transition>

        </div>
    )
}
