import React from 'react';
import { Disclosure, Menu } from '@headlessui/react';
import { DropDownMovilMenu } from './DropDownMovilMenu';
import { ButtonMenuMovil } from './ButtonMenuMovil';
import { Logo } from './Logo';
import { MenuNavbar } from './MenuNavbar';
import { UserMenu } from './UserMenu';
import { ButtonUserMenu } from './ButtonUserMenu';


export const Navbar = () => {

    return (
        <>
            <Disclosure as="nav" className="bg-gray-800 fixed w-full z-10 shadow-sm">
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
                                        {/* <ButtonNotification/> */}
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
