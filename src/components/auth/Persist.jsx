// Persist.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';
import { el } from 'react-date-range/dist/locale';

export const Persist = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user)


    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                dispatch(refreshToken());
            }else{
                navigate('/login');
            }
        };

        checkTokenValidity();
    }, [dispatch, navigate]);

    return <>{children}</>;
};
