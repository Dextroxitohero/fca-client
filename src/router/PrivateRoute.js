import React from 'react';
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { PrivateLayout } from '../layout/private/PrivateLayout';


export const PrivateRoute = ({ children }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);

    if (loading === false) {
        if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
        }
        return (
            <PrivateLayout>
                {children}
            </PrivateLayout>
        );
    }
};

