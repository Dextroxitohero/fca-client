import React, { useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { PrivateLayout } from '../layout/private/PrivateLayout';
import { refreshToken } from '../redux/actions/user';
import { Navbar } from '../components/navbar/Navbar';

export const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isAuthenticated } = useSelector((state) => state.user);
    const lastRouteVisited = localStorage.getItem('lastRoutevisited');

    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = localStorage.getItem('token');

            if (!isAuthenticated) {
                navigate('/login');
            }

            if (token) {
                dispatch(refreshToken())
                    .then((result) => {
                        if (result === 200) {
                            navigate(lastRouteVisited);
                        }
                    })
            }
        };

        checkTokenValidity();
    }, [dispatch]);

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className='pt-[4rem]'>
                    <div className='flex justify-center items-center'>
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (!loading) {

        if (isAuthenticated) {
            return (
                <PrivateLayout>
                    {children}
                </PrivateLayout>
            );
        }

        return <Navigate to="/login" replace />;


    }
};

