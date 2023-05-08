import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormLogin } from './FormLogin'

export const LoginPage = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useSelector((state) => state.user);
	
	useEffect(() => {
		if (isAuthenticated === true) {
			navigate("/");
		}
	}, [])

	return (
		<div>
			<FormLogin />
		</div>
	)
}
