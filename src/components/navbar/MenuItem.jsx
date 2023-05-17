import { Link, NavLink } from 'react-router-dom';
// import {
//     ArrowPathIcon,
//     ChartPieIcon,
//     CursorArrowRaysIcon,
//     FingerPrintIcon,
//     SquaresPlusIcon,
// } from '@heroicons/react/24/outline';
import * as HeroIcons from '@heroicons/react/24/outline';






export const MenuItem = ({ name, description, href, icon }) => {
    const IconComponent = HeroIcons[icon];

    return (
        <NavLink
            to={`/${href}`}
            className="
                group relative 
                flex gap-x-6 
                rounded-lg p-4 
                hover:bg-gray-50
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
                <IconComponent
                    aria-hidden="true"
                    className="
                        h-6 
                        w-6 
                        text-gray-600 
                        group-hover:text-indigo-600
                    "
                />
            </div>
            <div>
                <span
                    href={href}
                    className="
                        font-semibold 
                        text-gray-900
                    "
                >
                    {name}
                    <span className="absolute inset-0"/>
                </span>
                <p className="mt-1 text-gray-600">{description}</p>
            </div>
        </NavLink>
    )
}
