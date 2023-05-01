import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from './components/Container'
import { LoginPage } from './pages/login/LoginPage';
import { ActivationPage } from './pages/ActivationPage';

export const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/sign-up" element={<LoginPage />} />
					<Route
						path="/activation/:activation_token"
						element={<ActivationPage />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	)
}
