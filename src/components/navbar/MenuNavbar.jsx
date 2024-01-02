import { NavLink, useLocation } from 'react-router-dom';

import { navigation } from '../../static/data';


export const MenuNavbar = () => {
  const location = useLocation();

  return (
    <div className="hidden md:block">
      <div className="flex items-center h-20 justify-center space-x-6">
        {navigation.map((item) => (
          <NavLink
            to={item.href}
            key={item.name}
            className={`
                text-md
                px-6 py-4
                rounded-md
                font-medium
                ${location.pathname === item.href 
                    ? 'bg-indigo-600 text-white shadow-inner shadow-gray-950/40' 
                    : 'text-gray-950 hover:bg-gray-100 hover:text-indigo-600'
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

