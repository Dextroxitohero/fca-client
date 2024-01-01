import { NavLink } from 'react-router-dom';
import logo from '../../static/image/logo.png';

export const Logo = () => {
    return (
        <div className="flex-shrink-0">
            <NavLink
                to={'/'}
            >
                <img
                    className="with-12 h-14"
                    src={logo}
                    alt="Your Company"
                />
            </NavLink>
        </div>
    )
}
