import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { loadUser } from "./redux/actions/user";
import second from './redux/actions/user'
import { LoginPage } from './pages/login/LoginPage';
import { HomePage } from './pages/HomePage';
import { ActivationPage } from './pages/ActivationPage';
import { ToastContainer } from 'react-toastify';
import Store from "./redux/store";

import "react-toastify/dist/ReactToastify.css";
import { SignupPage } from './pages/signup/SignupPage';

export const App = () => {

	useEffect(() => {
		Store.dispatch(loadUser());
	}, []);
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route
						path="/activation/:activation_token"
						element={<ActivationPage />}
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
