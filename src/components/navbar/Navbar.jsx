import React, { Fragment } from 'react';
import { useDispatch } from "react-redux";
import { Disclosure, Menu } from '@headlessui/react';


import { logoutUser } from '../../redux/actions/user';



import { DropDownMovilMenu } from './DropDownMovilMenu';
import { ButtonMenuMovil } from './ButtonMenuMovil';
import { Logo } from './Logo';
import { MenuNavbar } from './MenuNavbar';
import { UserMenu } from './UserMenu';
import { ButtonUserMenu } from './ButtonUserMenu';
import { ButtonNotification } from './ButtonNotification';


// const user = {
//     name: 'Tom Cook',
//     email: 'tom@example.com',
//     imageUrl:
//         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// }
// const navigation = [
//     { name: 'Dashboard', href: '#', current: true },
//     { name: 'Team', href: '#', current: false },
//     { name: 'Projects', href: '#', current: false },
//     { name: 'Calendar', href: '#', current: false },
//     { name: 'Reports', href: '#', current: false },
// ]
// const userNavigation = [
//     { name: 'Your Profile', href: '#' },
//     { name: 'Settings', href: '#' },
//     { name: 'Sign out', href: '#' },
// ]

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }


// const solutions = [
//     { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
//     { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
//     { name: 'Security', description: "Your customers' data will be safe and secure", href: '#', icon: FingerPrintIcon },
//     { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
//     { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
// ]

export const Navbar = () => {

    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logoutUser())
    }

    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div
                                className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    {/* LOGO */}
                                    <Logo/>
                                    {/* MENU NAVIGATION */}
                                    <MenuNavbar/>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <ButtonNotification/>
                                        {/* PROFILE DROPDOWN */}
                                        <Menu as="div" className="relative ml-3">
                                            {/* BUTTON USER MENU */}
                                            <ButtonUserMenu/>
                                            {/* USER MENU */}
                                            <UserMenu/>
                                        </Menu>
                                    </div>
                                </div>
                                {/* MOBILE MENU BUTTOM */}
                                <div className="-mr-2 flex md:hidden">
                                    <ButtonMenuMovil open={open} />
                                </div>
                            </div>
                        </div>
                        {/* DROP DOWN MOBILE MENU */}
                        <DropDownMovilMenu />
                    </>
                )}
            </Disclosure >

        </>
    )
}
