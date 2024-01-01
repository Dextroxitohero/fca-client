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
            <Disclosure as="nav" className="bg-white fixed w-full z-10 shadow-md shadow-indigo-50">
                {({ open }) => (
                    <>
                        <div className="mx-auto  max-w-[90%] px-4 sm:px-6 lg:px-0">
                            <div
                                className="flex h-20 items-center justify-between"
                            >
                                
                                <div className="flex w-1/4">
                                    <Logo/>
                                </div>
                                <div className='w-2/4'>
                                    <MenuNavbar/>
                                </div>
                                <div className="hidden md:block w-1/4">
                                        {/* PROFILE DROPDOWN */}
                                        <Menu as="div" className="flex justify-end relative">
                                            {/* BUTTON USER MENU */}
                                            <ButtonUserMenu/>
                                            {/* USER MENU */}
                                            <UserMenu/>
                                        </Menu>
                                </div>
                                {/* MOBILE MENU BUTTOM */}
                                <div className="flex md:hidden">
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
