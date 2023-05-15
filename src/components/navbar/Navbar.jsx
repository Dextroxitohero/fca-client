import React from 'react';
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
