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
import { CandidatesPage } from '../pages/candidates/CandidatesPage';
import { TeamsPage } from '../pages/teams/TeamsPage';
import { UsersPage } from '../pages/users/UsersPage';
import { PaymentsPage } from '../pages/payments/PaymentsPage';
import { SettingPage } from '../pages/setting/SettingPage';
import { NotificationsPage } from '../pages/notifications/NotificationsPage';
import { ProfilePage } from '../pages/profile/ProfilePage';
import { CursesPage } from '../pages/curses/CursesPage';


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
                        element={<SignupPage />}
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
                        path="/candidatos"
                        element={
                            <PrivateRoute>
                                <CandidatesPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/cursos"
                        element={
                            <PrivateRoute>
                                <CursesPage />
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
                        path="/pagos"
                        element={
                            <PrivateRoute>
                                <PaymentsPage />
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
                        path="/perfil"
                        element={
                            <PrivateRoute>
                                <ProfilePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/notificaciones"
                        element={
                            <PrivateRoute>
                                <NotificationsPage />
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
            <ToasterProvider />
        </>

    );
};