import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { FormForgetPasswordEmail } from './FormForgetPasswordEmail';
import image from '../../static/image/5.png';

export const ForgetPasswordPage = () => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    if (loading === false) {
        if (isAuthenticated) {
            return <Navigate to="/" replace />;
        }
        return (
            <div className='w-full flex'>
                <div className='w-full h-screen'>
                    <FormForgetPasswordEmail />
                </div>
                {/* <div
                    className='w-0 md:w-2/3 h-screen bg-cover'
                    style={{ backgroundImage: `url(${image})` }}
                ></div> */}
            </div>
        )
    }
}
