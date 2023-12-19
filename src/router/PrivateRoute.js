import React, { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { PrivateLayout } from '../layout/private/PrivateLayout';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../redux/actions/user';


export const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isAuthenticated } = useSelector((state) => state.user);
    const lastRouteVisited = localStorage.getItem('lastRoutevisited');

    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = localStorage.getItem('token');

            if(!isAuthenticated){
                navigate('/login');
            }
            
            if (token) {
                dispatch(refreshToken())
                .then((result) => {
                    if (result ===  200) {
                       navigate(lastRouteVisited);
                    }
                })
            }

        };

        checkTokenValidity();
    }, [dispatch, navigate]);    

    if (!loading) {
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

