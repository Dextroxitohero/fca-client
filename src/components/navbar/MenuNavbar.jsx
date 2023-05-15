import { NavLink, useLocation } from 'react-router-dom';

import { navigation } from '../../static/data';


export const MenuNavbar = () => {
  const location = useLocation();

  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        {navigation.map((item) => (
          <NavLink
            to={item.href}
            key={item.name}
            className={`
                rounded-md 
                px-3 
                py-2 
                text-sm 
                font-medium 
                ${location.pathname === item.href 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

