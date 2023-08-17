import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { FormLogin } from './FormLogin'

export const LoginPage = () => {

	const { loading, isAuthenticated } = useSelector((state) => state.user);
	console.log('Login')
	if (loading === false) {
		if (isAuthenticated) {
			return <Navigate to="/" replace />;
		}
		return (
			<>
				<FormLogin />
			</>
		);
	}
}
