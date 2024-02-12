
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { PublicLayout } from '../layout/public/PublicLayout';
import { refreshToken } from '../redux/actions/user';

export const PublicRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isAuthenticated } = useSelector((state) => state.user);
    const lastRouteVisited = localStorage.getItem('lastRoutevisited');

    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = localStorage.getItem('token');
            if (!isAuthenticated) {
                navigate({ lastRouteVisited, replace: true });
            }

            if (token) {
                dispatch(refreshToken())
                    .then((result) => {
                        if (result === 200) {
                            navigate('/');
                        }
                    })
            }

        };

        checkTokenValidity();
    }, [dispatch]);

    if (loading) {
        return (
            <>
                <div className="flex justify-center items-center h-screen bg-white/25">
                    <div className="relative inline-flex">
                        <div className="w-16 h-16 bg-indigo-500 rounded-full"></div>
                        <div className="w-16 h-16 bg-indigo-600 rounded-full absolute top-0 left-0 animate-ping"></div>
                        <div className="w-16 h-16 bg-indigo-600 rounded-full absolute top-0 left-0 animate-pulse"></div>
                    </div>
                </div>
            </>
        )
    }

    if (!loading) {
        if (isAuthenticated) {
            return <Navigate to='/' />;
        }
        return (
            <PublicLayout>
                {children}
            </PublicLayout>
        );
    }
};

