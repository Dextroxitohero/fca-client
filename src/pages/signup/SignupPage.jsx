import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { FormSignup } from './FormSignup';
import image from '../../static/image/5.png';

export const SignupPage = () => {
	const { loading, isAuthenticated } = useSelector((state) => state.user);
	if (loading === false) {
		if (isAuthenticated) {
			return <Navigate to="/" replace />;
		}
		return (
			<div className='w-full flex'>
				<div className='w-full h-screen md:w-1/3'>
					<FormSignup />
				</div>
				<div
					className='w-0 md:w-2/3 h-screen bg-cover'
					style={{ backgroundImage: `url(${image})` }}
				></div>
			</div>
		)
	}
}
