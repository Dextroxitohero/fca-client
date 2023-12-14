import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

export const RequireAuth = ({ allowedRoles }) => {
    const { accessToken, roles } = useSelector((state) => state.user)
    const location = useLocation();


    return (
        roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : accessToken //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}