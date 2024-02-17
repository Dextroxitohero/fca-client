import { useDispatch, useSelector } from "react-redux";
import { Disclosure } from '@headlessui/react';
import { ImagenUser } from './ImagenUser';

import { logoutUser } from '../../redux/actions/user';

import { userData, navigation, userNavigation } from '../../static/data';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const DropDownMovilMenu = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    const handleLogOut = () => {
        dispatch(logoutUser())
    }

    return (
        <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                    item.access.includes(user.typeUser) && (
                        <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={
                                classNames(
                                    item.current
                                        ? 'bg-gray-950 text-white'
                                        : 'text-gray-950 hover:bg-gray-50 hover:text-indigo-600',
                                    'block rounded-md px-3 py-2 text-base font-medium'
                                )}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </Disclosure.Button>
                    )
                ))}
            </div>
            <div className=" border-t border-gray-950/5 pb-3 pt-4">
                <div className="flex items-center px-5">
                    {/* IMAGE USER */}
                    <ImagenUser />
                    <div className="ml-3">
                        <div className="text-base font-medium leading-none text-gray-950">
                            {userData.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-indigo-600">
                            {userData.email}
                        </div>
                    </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                    <>
                        {userNavigation.map((item) => (

                            (user.roles === 'user' && item.name === 'Configuracion')
                                ? null
                                : (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-950 hover:bg-gray-50 hover:text-indigo-600">
                                        {item.name}
                                    </Disclosure.Button>
                                )
                        ))}
                        <Disclosure.Button
                            // key={item.name}
                            onClick={handleLogOut}
                            as="a"
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-950 hover:bg-gray-50 hover:text-indigo-600">
                            Cerrar Sesión
                        </Disclosure.Button>
                    </>
                </div>
            </div>
        </Disclosure.Panel>
    )
}
