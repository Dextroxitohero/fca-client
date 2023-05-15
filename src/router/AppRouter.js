import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loadUser } from '../redux/actions/user';

import { PrivateRoute } from './PrivateRoute';

import { HomePage } from '../pages/home/HomePage';

import { LoginPage } from '../pages/login/LoginPage';
import { SignupPage } from '../pages/signup/SignupPage';
import { ActivationPage } from '../pages/activation/ActivationPage';

import { NotFoundPage } from '../pages/notFound/NotFoundPage';

import { ToasterProvider } from '../providers/ToasterProvider';
import { PreRegistrationPage } from '../pages/preRegistration/PreRegistrationPage';
import { ListPreRegistrationPage } from '../pages/listPreRegistro/ListPreRegistrationPage';
import { TeamsPage } from '../pages/teams/TeamsPage';
import { UsersPage } from '../pages/users/UsersPage';
import { PaymentsPage } from '../pages/payments/PaymentsPage';
import { SettingPage } from '../pages/setting/SettingPage';



export const AppRouter = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/signup"
                        element={ <SignupPage />}
                    />
                    <Route
                        path="/activation/:activation_token"
                        element={<ActivationPage />}
                    />
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />
                    <Route
                        path="/pre-registro"
                        element={<PreRegistrationPage />}
                    />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <HomePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/lista-pre-registro"
                        element={
                            <PrivateRoute>
                                <ListPreRegistrationPage />
                            </PrivateRoute>
                        }
                    />                    
                    <Route
                        path="/grupos"
                        element={
                            <PrivateRoute>
                                <TeamsPage />
                            </PrivateRoute>
                        }
                    />                    
                    <Route
                        path="/usuarios"
                        element={
                            <PrivateRoute>
                                <UsersPage />
                            </PrivateRoute>
                        }
                    />                    
                    <Route
                        path="/ajustes"
                        element={
                            <PrivateRoute>
                                <SettingPage />
                            </PrivateRoute>
                        }
                    />                    
                    <Route
                        path="/pagos"
                        element={
                            <PrivateRoute>
                                <PaymentsPage />
                            </PrivateRoute>
                        }
                    />                    
                    <Route
                        path="*"
                        element={
                            <NotFoundPage />
                        }
                    />
                </Routes>
            </BrowserRouter>
            <ToasterProvider/>
        </>

    );
};