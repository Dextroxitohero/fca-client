// Persist.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';


export const Persist = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user)


    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = localStorage.getItem('token');

            if(!isAuthenticated){
                navigate('/login');
            }
            
            if (token) {
                dispatch(refreshToken());
            }
        };

        checkTokenValidity();
    }, [dispatch, navigate]);

    return <>{children}</>;
};
