import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormLogin } from './FormLogin'

export const LoginPage = () => {
	const {isAuthenticated } = useSelector((state) => state.user);
	const navigate = useNavigate();

	if (!isAuthenticated) {
		navigate('/')
	}

	return (
		<div>
			<FormLogin />
		</div >
	)
}
