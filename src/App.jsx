import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { ProtectedRoute } from './routes/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/login/LoginPage';
import { ActivationPage } from './pages/ActivationPage';
import { SignupPage } from './pages/signup/SignupPage';

import { loadUser } from "./redux/actions/user";
import { ToastContainer } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";

export const App = () => {
	
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route
						path="/activation/:activation_token"
						element={<ActivationPage />}
					/>
					<Route 
						path="/" element={
							<ProtectedRoute>
								<HomePage />
							</ProtectedRoute>
						} 
					/>
				</Routes>
				<ToastContainer
					position="bottom-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
				/>
			</BrowserRouter>
		</>
	)
}
